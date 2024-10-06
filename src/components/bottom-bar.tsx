import CreateGameModal from "@/app/dashboard/components/create-game-modal";
import { Dices, History, IndianRupee, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BottomBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <BottomBarItem href="/dashboard" icon={Dices} label="Home" />
                    <BottomBarItem href="/dashboard/wallet" icon={IndianRupee} label="Wallet" />
                    <div className="relative">
                        <CreateGameModal className="absolute bottom-0 sm:bottom-4 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transition-all duration-300 ease-in-out" />
                    </div>
                    <BottomBarItem href="/dashboard/history" icon={History} label="History" />
                    <BottomBarItem href="/dashboard/profile" icon={User} label="Profile" />
                </div>
            </div>
        </div>
    );
}

interface BottomBarItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
}

const BottomBarItem = ({ href, icon: Icon, label }: BottomBarItemProps) => {
    return (
        <Link href={href} className="flex flex-col items-center justify-center w-16 sm:w-20 h-full group">
            <div className={cn(
                "flex flex-col items-center justify-center rounded-lg p-2",
                "transition-all duration-300 ease-in-out",
                "group-hover:bg-gray-700 group-hover:text-green-400"
            )}>
                <Icon size={24} className="mb-1" />
                <span className="text-xs font-medium hidden sm:block">{label}</span>
            </div>
        </Link>
    );
}

export default BottomBar;