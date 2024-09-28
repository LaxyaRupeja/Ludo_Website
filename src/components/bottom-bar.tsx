import { Dices, History, IndianRupee, User } from "lucide-react";
import Link from "next/link";

const BottomBar = () => {
    return <div className="fixed bottom-0 left-0 w-full h-20 border-t backdrop-blur-2xl">
        <div className="flex items-center gap-2 justify-between w-full px-10 h-full py-4">
            <Link href="/dashboard"><div className="flex flex-col items-center gap-1 hover:text-green-300">
                <Dices size={26} />
                <span className="text-sm font-medium">Home</span>
            </div>
            </Link>
            <Link href="/dashboard/wallet"><div className="flex flex-col items-center gap-1 hover:text-green-300">
                <IndianRupee size={26} />
                <span className="text-sm font-medium">Wallet</span>
            </div>
            </Link>
            <div className="flex flex-col items-center gap-1 hover:text-green-300">

                <History size={26} />
                <span className="text-sm font-medium">History</span>
            </div>
            <div className="flex flex-col items-center gap-1 hover:text-green-300">
                <User size={26} />
                <span className="text-sm font-medium">Profile</span>
            </div>
        </div>
    </div>
}

export default BottomBar;