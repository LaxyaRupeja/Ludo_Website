"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../helpers/db";
import { createGameSchema, TCreateGame } from "@/validators/game";


// Create a Game
export const createGame = async (data: TCreateGame) => {

    const gameData = createGameSchema.safeParse(data);

    if (!gameData.success) {
        const errors = gameData.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
        }));
        throw new Error(JSON.stringify(errors));
    }

    const { betAmount, code } = gameData.data;





    const user = auth();

    if (!user.userId) {
        throw new Error("User not found");
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: user.userId
        }
    })

    if (!dbUser) {
        throw new Error("User not found");
    }

    const wallet = await prisma.wallet.findUnique({
        where: {
            userId: dbUser.id
        }
    })

    if (!wallet) {
        await prisma.wallet.create({
            data: {
                userId: dbUser.id,
                balance: 0
            }
        })
    }

    const game = await prisma.game.create({
        data: {
            creatorId: dbUser.id,
            betAmount: betAmount,
            code: code,
        }
    })

    return game;

};
