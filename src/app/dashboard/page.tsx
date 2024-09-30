import { Separator } from "@/components/ui/separator";
import GameFilter from "./components/game-filter";
import AllGames from "./components/all-games";
import YourGames from "./components/your-game";

export default function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {

  console.log(searchParams);


  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-bold text-center mt-5">Play Ludo and Earn Money</h1>
      <Separator className="my-5" />
      <div>
        <GameFilter />
        <Separator className="my-5 mt-0" />
        {
          searchParams.filter == "all" ? (
            <AllGames />
          ) : (
            <YourGames />
          )
        }
      </div>
    </div>
  )
}

