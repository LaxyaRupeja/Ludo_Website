import CreateGameModal from "@/app/dashboard/components/create-game-modal";
import { Dices, History, IndianRupee, User } from "lucide-react";
import { BottomBarItem } from "./navbar/bottom-bar-item";

const BottomBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <BottomBarItem href="/dashboard" icon={
                        <Dices size={24}  className="mb-1"/>
                    } label="Home" />
                    <BottomBarItem href="/dashboard/wallet" icon={
                        <IndianRupee size={24} className="mb-1" />
                    } label="Wallet" />
                    <div className="relative">
                        <CreateGameModal className="absolute bottom-0 sm:bottom-4 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transition-all duration-300 ease-in-out" />
                    </div>
                    <BottomBarItem href="/dashboard/history" icon={
                        <History size={24} className="mb-1" />
                    } label="History" />
                    <BottomBarItem href="/dashboard/profile" icon={
                        <User size={24} className="mb-1" />
                    } label="Profile" />
                </div>
            </div>
        </div>
    );
}




export default BottomBar;