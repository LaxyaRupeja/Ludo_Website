import prisma from "@/helpers/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Game } from "@prisma/client";

const YourGames = async () => {

    const {
        userId
    } = auth();

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId
        }
    });

    const games = await prisma.game.findMany({
        where: {
            OR: [
                {
                    creatorId: user?.id
                },
                {
                    joinerId: user?.id
                }
            ]
        }
    })

    return (
        <div>
            {
                games.length == 0 ? (
                    <div>
                        <h1>No games found</h1>
                    </div>
                ) : (
                    <div>
                        {
                            games.map((game) => (
                                <GameCard key={game.id} game={
                                    game
                                } />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default YourGames;





const GameCard = (
    {
        game
    }: {
        game: Game
    }
) => {
    return (
        <div key={game.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h3 className="text-lg font-semibold">Game #{game.id}</h3>
                    <p className="text-sm mt-2 text-gray-500">Bet Amount: <span className="font-semibold bg-green-500 text-white px-2 py-1 rounded-md">Rs.{
                        game.betAmount
                    }</span></p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm text-gray-500">Players: <span className="font-semibold bg-white rounded-full p-1">{
                        game.joinerId ? 2 : 1
                    } / 2</span></p>
                </div>
                <p className="text-sm text-gray-500">
                    Expires in {
                        new Date(game.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    }
                </p>
            </div>
        </div>
    )
}