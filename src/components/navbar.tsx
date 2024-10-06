import { Dices, LogIn } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { checkAndCreateUser } from "@/lib/check-and-create-user"
import { LoggedInUser } from "./navbar/logged-in-user"

export const Navbar = async () => {
    const user = await currentUser();
    const userWallet = await checkAndCreateUser();

    return (
        <nav className="fixed top-0 w-full z-50 bg-gradient-to-br from-gray-800 to-gray-900 text-white border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <Dices size={32} className="text-green-400 mr-2" />
                        <span className="text-xl font-bold">LudoVerse</span>
                    </Link>
                    {user ? (
                        <LoggedInUser walletAmount={userWallet?.walletAmount ?? 0} />
                    ) : (
                        <LoggedOutUser />
                    )}
                </div>
            </div>
        </nav>
    )
}

const LoggedOutUser = () => {
    return (
        <Link href="/sign-in">
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">
                Login <LogIn size={16} className="ml-2" />
            </Button>
        </Link>
    )
}