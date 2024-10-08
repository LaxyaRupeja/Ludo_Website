import { Separator } from "@/components/ui/separator";
import GameFilter from "./components/game-filter";
import AllGames from "./components/all-games";
import YourGames from "./components/your-game";
import { Card, CardContent } from "@/components/ui/card";
import { Dices } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {

  console.log(searchParams);

  return (
    <Suspense fallback={<Loading />}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  )
}

const Dashboard = ({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {
  return     <div className="mx-auto">
  <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg mb-8">
    <CardContent className="p-6">
      <div className="flex items-center justify-center space-x-4">
        <Dices size={40} className="text-green-400" />
        <h1 className="text-2xl sm:text-3xl font-bold">Play Ludo and Earn Money</h1>
      </div>
    </CardContent>
  </Card>

  <div className="">
    <GameFilter />
    <Separator className="my-6 bg-gray-700" />
    <div className="mt-6">
      {searchParams.filter == "all" ? (
        <AllGames />
      ) : (
        <YourGames />
      )}
    </div>
  </div>
</div>
}