"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../helpers/db";
import { createGameSchema, TCreateGame } from "@/validators/game";
import { revalidatePath } from "next/cache";

// Create a Game
export const createGame = async (data: TCreateGame) => {
  console.log("Creating Game", data);

  const gameData = createGameSchema.safeParse(data);

  if (!gameData.success) {
    const errors = gameData.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    return {
      success: false,
      error: "Validation failed",
      errors: errors,
    };
  }

  const { betAmount, code } = gameData.data;

  const user = auth();

  if (!user.userId) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.userId,
    },
  });

  if (!dbUser) {
    return {
      success: false,
      error: "User not found",
    };
  }

  let wallet = await prisma.wallet.findUnique({
    where: {
      userId: dbUser.id,
    },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        userId: dbUser.id,
        balance: 0,
      },
    });
  }

  if ((wallet?.balance ?? 0) < betAmount) {
    return {
      success: false,
      error: "Insufficient balance",
    };
  }

  const deductAmount = wallet.balance - betAmount;

  await prisma.wallet.update({
    where: {
      id: wallet.id,
    },
    data: {
      balance: deductAmount,
    },
  });

  const game = await prisma.game.create({
    data: {
      creatorId: dbUser.id,
      betAmount: betAmount,
      code: code,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    game: game,
  };
};

// Join a Game

export const joinGame = async (gameId: string) => {
  const user = auth();

  if (!user.userId) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.userId,
    },
  });

  if (!dbUser) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return {
      success: false,
      error: "Game not found",
    };
  }

  if (game.joinerId) {
    return {
      success: false,
      error: "Game already joined",
    };
  }

  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: dbUser.id,
    },
  });

  if (!wallet) {
    return {
      success: false,
      error: "Wallet not found",
    };
  }

  if ((wallet?.balance ?? 0) < game.betAmount) {
    return {
      success: false,
      error: "Insufficient balance",
    };
  }

  const deductAmount = wallet.balance - game.betAmount;

  await prisma.$transaction([
    prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balance: deductAmount,
      },
    }),
    prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        joinerId: dbUser.id,
        status: "ACTIVE",
      },
    }),
  ]);

  revalidatePath("/dashboard");

  return {
    success: true,
    game: game,
  };
};

export const submitProof = async (gameId: string, proof: string) => {
  console.log("testing submit proof", gameId, proof);
  try {
    const user = auth();

    if (!user.userId) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.userId,
      },
    });

    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return {
        success: false,
        error: "Game not found",
      };
    }

    if (game.creatorId !== dbUser.id && game.joinerId !== dbUser.id) {
      return {
        success: false,
        error: "You are not part of this game",
      };
    }

    // Check if the user has already submitted a proof
    const existingProof = await prisma.proof.findFirst({
      where: {
        gameId: game.id,
        userId: dbUser.id,
      },
    });

    if (existingProof) {
      return {
        success: false,
        error: "You have already submitted a proof for this game",
      };
    }

    if(!game.joinerId || !game.creatorId){
      return {
        success: false,
        error: "Game not found",
      };
    }

    const isOtherUserProofSubmitted = await prisma.proof.findFirst({
      where: {
        gameId: game.id,
        userId: game.creatorId === dbUser.id ? game.joinerId : game.creatorId,
      },
    });

    

    // Create a new proof
    const newProof = await prisma.proof.create({
      data: {
        gameId: game.id,
        userId: dbUser.id,
        proof: proof,
      },
    });

    // Update the game status to DISPUTED
    if(isOtherUserProofSubmitted){
    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        status: "WAITING_FOR_VERIFICATION",
      },
      });
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Proof submitted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message ?? "Failed to submit proof",
    };
  }
};
