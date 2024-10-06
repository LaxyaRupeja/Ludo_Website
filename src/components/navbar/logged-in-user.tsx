"use client"

import { UserButton } from "@clerk/nextjs";
import { IndianRupee, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const LoggedInUser = ({
    walletAmount = 0
}: {
    walletAmount: number;
}) => {

    const pathName = usePathname();

    return (
        <div className="flex items-center gap-4">
            <UserButton 
                appearance={{
                    elements: {
                        avatarBox: "w-10 h-10 border-2 border-green-400 hover:border-green-500 transition-colors duration-300"
                    }
                }}
            />
            {!pathName.includes("/dashboard") && (
                <Link href="/dashboard">
                    <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-gray-600 hover:border-gray-500 transition-all duration-300"
                    >
                        <LayoutDashboard size={16} className="mr-2" />
                        Dashboard
                    </Button>
                </Link>
            )}
            <Link href="/dashboard/wallet">
                <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                        "flex items-center gap-2",
                        "bg-gradient-to-r from-green-500 to-emerald-500",
                        "hover:from-green-600 hover:to-emerald-600",
                        "text-white font-semibold",
                        "transition-all duration-300 ease-in-out"
                    )}
                >
                    <IndianRupee size={16} />
                    <span>{walletAmount}</span>
                </Button>
            </Link>
        </div>
    );
};