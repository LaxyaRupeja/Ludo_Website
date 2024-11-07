import prisma from "@/helpers/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GameCard } from "./all-games-card";

const AllGames = async () => {

    const {
        userId
    } = await auth();

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId
        }
    });

    const games = await prisma.game.findMany(
        {
            orderBy: {
                createdAt: "desc"
            }
        }
    )



    return (
        <div>
            {
                games.length == 0 ? (
                    <div>
                        <h1>No games found</h1>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {
                            games.map((game) => (
                                <GameCard userId={user?.id ?? ""} key={game.id} game={
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

export default AllGames;




