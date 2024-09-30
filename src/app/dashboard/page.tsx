import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateGameModal from "./create-game-modal";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-bold text-center mt-5">Play Ludo and Earn Money</h1>
      <div className="flex justify-center items-center px-3 mt-5">
        <CreateGameModal />
      </div>
      <Separator className="my-5" />
      <div>
        <h2 className="text-xl font-semibold">
          Running Games
        </h2>
        <div className="flex flex-col gap-3 mt-3">
          {
            [1, 2, 3, 4, 5, 6].map((game) => (
              <div key={game} className="border p-4 rounded-md">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h3 className="text-lg font-semibold">Game #{game}</h3>
                    <p className="text-sm mt-2 text-gray-500">Bet Amount: <span className="font-semibold bg-green-500 text-white px-2 py-1 rounded-md">{
                      Math.floor(Math.random() * 1000)
                    } Rs</span></p>
                  </div>
                  <div>
                    <Button>
                      Play
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p className="text-sm text-gray-500">Players: <span className="font-semibold bg-white rounded-full p-1">{
                      Math.floor(Math.random() * 2) + 1
                    } / 2</span></p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Expires in 12:30:23
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

