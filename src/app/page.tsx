import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Dices, Users, Trophy, Zap } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white  bg-gray-900">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Welcome to LudoVerse
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-300">
              Play Ludo, Win Real Cash, and Dominate the Universe!
            </p>
            <Link href="/sign-in">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
                Start Your Journey Now
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="/ludo-board-game-1000x1000.webp" 
              alt="LudoVerse Game Board" 
              width={450} 
              height={450} 
              className="rounded-2xl shadow-2xl border-4 border-purple-500 transform rotate-3 hover:rotate-0 transition duration-300"
            />
          </div>
        </div>

        <section className="py-16">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            How LudoVerse Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[ 
              { icon: Dices, title: "Sign Up", description: "Create your account and get a welcome bonus" },
              { icon: Users, title: "Join a Game", description: "Choose from various game rooms with different stakes" },
              { icon: Zap, title: "Play & Win", description: "Show off your Ludo skills and win real cash" },
              { icon: Trophy, title: "Cash Out", description: "Withdraw your winnings instantly to your account" }
            ].map((step, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:bg-gray-700">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  <step.icon size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 border-t border-gray-800 rounded-t-2xl">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">&copy; 2024 LudoVerse. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-green-400 transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
