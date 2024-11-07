import prisma from "@/helpers/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Game } from "@prisma/client";
import { SubmitProofModal } from "./submit-proof-modal";
import { IndianRupee, Users, Clock, Code } from "lucide-react";

const YourGames = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  const games = await prisma.game.findMany({
    where: {
      OR: [
        {
          creatorId: user?.id,
        },
        {
          joinerId: user?.id,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {games.length == 0 ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-xl font-semibold text-green-600">
            No games found
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} userId={user?.id || ""} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourGames;

const GameCard = async ({ game, userId }: { game: Game; userId: string }) => {
  const isGameFull = game.joinerId !== null;
  const isGameActive = game.status === "ACTIVE";
  const isGameYours = game.creatorId === userId || game.joinerId === userId;

  const userProof = await prisma.proof.findFirst({
    where: {
      gameId: game.id,
      userId: userId,
    },
  });

  const isProofSubmitted = userProof !== null;

  return (
    <div
      key={game.id}
      className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg p-6 shadow-lg"
    >
      <div className="flex justify-between items-center w-full mb-4">
        <h3 className="text-xl md:text-2xl font-bold">
          Game #{game.id.split("-")[0]}
        </h3>
        {isGameActive && isGameYours && !isProofSubmitted && <SubmitProofModal game={game} />}
        {!isProofSubmitted && game.status == "WAITING_FOR_VERIFICATION" && (
          <div className="flex items-center gap-2 bg-gradient-to-br text-xs from-green-500 to-blue-300 rounded-lg p-3 px-5">
            <span className="text-white">Waiting for verification</span>
          </div>
        )}
        {isProofSubmitted && (
          <div className="flex items-center gap-2 bg-gradient-to-br text-xs from-green-500 to-blue-300 rounded-lg p-3 px-5">
            <span className="text-white">Proof Submitted</span>
          </div>
        )}
      </div>


      <Separator className="my-4 bg-gray-700" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
          <div className="flex items-center">
            <IndianRupee className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-base text-gray-300">Bet Amount:</span>
          </div>
          <span className="ml-2 font-semibold text-green-400 text-lg">
            ₹{game.betAmount}
          </span>
        </div>
        <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-base text-gray-300">Players:</span>
          </div>
          <span className="ml-2 font-semibold text-blue-400 text-lg">
            {isGameFull ? "2" : "1"} / 2
          </span>
        </div>
        <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-base text-gray-300">Expires At:</span>
          </div>
          <span className="ml-2 font-semibold text-yellow-400 text-lg">
            {new Date(game.expiresAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {isGameYours && (
        <>
          <Separator className="my-4 bg-gray-700" />
          <div className="flex items-center justify-center bg-gray-700 rounded-lg p-4">
            <Code className="w-6 h-6 text-purple-400 mr-3" />
            <span className="text-base text-gray-300 mr-3">Game Code:</span>
            <span className="font-bold text-purple-400 text-xl">
              {game.code}
            </span>
          </div>
          <p className="text-base text-center text-gray-400 mt-3">
            Please open the app and join the game using this code.
          </p>
        </>
      )}

      {!isGameFull && (
        <p className="text-base text-center text-gray-400 mt-3">
          Waiting for another player to join...
        </p>
      )}
    </div>
  );
};
