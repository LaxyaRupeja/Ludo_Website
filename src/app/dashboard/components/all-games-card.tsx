import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Game } from "@prisma/client";
import { JoinButton } from "./join-button-game";

export const GameCard = (
    {
        game,
        userId
    }: {
        game: Game,
        userId: string
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
                {
                    game.joinerId == userId ? (
                        <Button disabled>Joined</Button>
                    ) :
                        game.creatorId == userId ? (
                            <Button disabled>You created this game</Button>
                        ) : (

                            <JoinButton game={game} />
                        )
                }
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
            <Separator className="my-4" />
            <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-500">
                    {
                        (game.joinerId && game.status == "ACTIVE") ? <><span className="font-semibold bg-green-600 text-white px-2 py-1 rounded-md">{game.code}</span> is the code. Please open the app and join the game.</> : "Waiting for joiner"
                    }
                </p>
            </div>
        </div>
    )
}