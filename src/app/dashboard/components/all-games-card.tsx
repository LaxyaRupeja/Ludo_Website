import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Game } from "@prisma/client";
import { JoinButton } from "./join-button-game";
import { IndianRupee, Users, Clock, Code } from "lucide-react";

export const GameCard = (
    {
        game,
        userId
    }: {
        game: Game,
        userId: string
    }
) => {
    const isCreator = game.creatorId === userId;
    const isJoiner = game.joinerId === userId;
    const isGameFull = game.joinerId !== null;
    const isGameActive = game.status === "ACTIVE";

    return (
        <div key={game.id} className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center w-full mb-4">
                <h3 className="text-xl md:text-2xl font-bold">Game #{game.id.split("-")[0]}</h3>
                {isCreator ? (
                    <Button disabled className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-3 py-1 rounded-full transition duration-300">You created this</Button>
                ) : isJoiner ? (
                    <Button disabled className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base px-3 py-1 rounded-full transition duration-300">Joined</Button>
                ) : (
                    <JoinButton game={game} />
                )}
            </div>

            <Separator className="my-4 bg-gray-700" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center">
                        <IndianRupee className="w-6 h-6 text-green-400 mr-2" />
                        <span className="text-base text-gray-300">Bet Amount:</span>
                    </div>
                    <span className="ml-2 font-semibold text-green-400 text-lg">₹{game.betAmount}</span>
                </div>
                <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center">
                        <Users className="w-6 h-6 text-blue-400 mr-2" />
                        <span className="text-base text-gray-300">Players:</span>
                    </div>
                    <span className="ml-2 font-semibold text-blue-400 text-lg">{isGameFull ? '2' : '1'} / 2</span>
                </div>
                <div className="flex items-center justify-between md:justify-start bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center">
                        <Clock className="w-6 h-6 text-yellow-400 mr-2" />
                        <span className="text-base text-gray-300">Expires At:</span>
                    </div>
                    <span className="ml-2 font-semibold text-yellow-400 text-lg">
                        {new Date(game.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            {isGameActive && isGameFull && (
                <>
                    <Separator className="my-4 bg-gray-700" />
                    <div className="flex items-center justify-center bg-gray-700 rounded-lg p-4">
                        <Code className="w-6 h-6 text-purple-400 mr-3" />
                        <span className="text-base text-gray-300 mr-3">Game Code:</span>
                        <span className="font-bold text-purple-400 text-xl">{game.code}</span>
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
    )
}