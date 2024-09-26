import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className=" flex flex-col">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-2xl sm:text-5xl font-bold mb-4">Play Ludo, Win Real Cash!</h1>
            <p className="text-base sm:text-xl mb-8 text-balance">Join thousands of players in exciting Ludo matches and compete for cash prizes. Sign up now and get a welcome bonus!</p>
            <Link href="/sign-in"><Button size={"lg"}>
              Start Playing Now
            </Button></Link>
          </div>
          <div className="">
            <Image src="/ludo-board-game-1000x1000.webp" alt="Ludo Board" width={400} height={500} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </main>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className=" text-white border w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p>Create your account and get a welcome bonus to start playing.</p>
            </div>
            <div className="text-center">
              <div className=" text-white border w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Join a Game</h3>
              <p>Choose from various game rooms with different entry fees and prize pools.</p>
            </div>
            <div className="text-center">
              <div className=" text-white border w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Win & Withdraw</h3>
              <p>Play Ludo, win matches, and withdraw your cash prizes instantly!</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 LudoCash. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-yellow-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
