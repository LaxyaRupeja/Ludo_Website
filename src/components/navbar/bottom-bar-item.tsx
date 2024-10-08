"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface BottomBarItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}


export const BottomBarItem = ({ href, icon: Icon, label }: BottomBarItemProps) => {
    const pathname = usePathname();

    return (
        <Link  href={href} className="flex flex-col items-center justify-center w-16 sm:w-20 h-full group">
            <div className={cn(
                "flex flex-col items-center justify-center rounded-lg p-2",
                "transition-all duration-300 ease-in-out",
                pathname === href
                    ? "bg-gray-700 text-green-400"
                    : "group-hover:bg-gray-700 group-hover:text-green-400"
            )}>
                {Icon}
                <span className="text-xs font-medium hidden sm:block">{label}</span>
            </div>
        </Link>
    );
}