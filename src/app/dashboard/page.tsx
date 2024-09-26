import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export default async function Page() {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-bold text-center mt-5">Play Ludo and Earn Money</h1>
      <div className="flex justify-center items-center px-3 mt-5">
        <Input placeholder="Enter Your Room Code to List Your Game" className="h-14" />
        <ResponsiveModal>
          <ResponsiveModalTrigger asChild>
            <Button className="ml-3 h-14" variant={"outline"} >
              <Plus />
            </Button>
          </ResponsiveModalTrigger>
          <ResponsiveModalContent className="bg-black">
            <ResponsiveModalHeader>
              <ResponsiveModalTitle>Create a new game</ResponsiveModalTitle>
            </ResponsiveModalHeader>
            <div>
              <h2 className="text-lg font-semibold mt-4">Select Bet Amount</h2>
              <div className="flex flex-col mt-2">
                <div className="flex space-x-2">
                  <div className="flex flex-wrap gap-2">
                    {["100", "200", "300", "500", "1000", "2000", "5000", "10000", "20000", "50000", "100000", "200000"].map((amount) => (
                      <Button key={amount} className="h-10" variant="outline">
                        {amount} Rs
                      </Button>
                    ))}
                  </div>
                </div>
                <Input placeholder="Enter custom amount" className="h-10 mt-2" />
              </div>
              <p className="text-sm text-gray-500 mt-2 mb-3">
                This amount will be deducted from your wallet and you&apos;ll receive your winnings after your win gets verified.
              </p>
            </div>
            <ResponsiveModalFooter>
              <Button>Create Game</Button>
            </ResponsiveModalFooter>
          </ResponsiveModalContent>
        </ResponsiveModal>
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
