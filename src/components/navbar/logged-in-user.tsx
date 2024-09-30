"use client"

import { UserButton } from "@clerk/nextjs";
import { IndianRupee } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const LoggedInUser = ({
    walletAmount = 0
}: {
    walletAmount: number;
}) => {

    const pathName = usePathname();

    console.log(pathName.includes("/dashboard"));

    return <div className="flex items-center gap-2">
        <UserButton />
        {
            !pathName.includes("/dashboard") &&
            <Link href="/dashboard"><Button size={"sm"}>Dashboard</Button></Link>

        }
        <Link href="/dashboard/wallet"><span className="text-sm font-medium flex items-center gap-1 border p-2 rounded-lg border-green-300 text-green-300">
            <IndianRupee size={16} />
            {walletAmount}</span></Link>

    </div>
}