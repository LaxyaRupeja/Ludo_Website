"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GameFilter() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const setFilter = (filter: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("filter", filter);
        router.push(`/dashboard?${params.toString()}`);
    }


    const filter = searchParams.get("filter") || "your";

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("filter", filter);
        router.push(`/dashboard?${params.toString()}`);
    }, [])


    return (
        <div className="flex">
            <div onClick={() => setFilter("your")} className={
                `border-b-[4px] cursor-pointer p-3 hover:border-gray-400 w-1/2 text-center border-gray-300 ${filter === "your" ? "border-b-[4px] border-green-500" : ""}`
            }>
                Your Games
            </div>
            <div onClick={() => setFilter("all")} className={
                `border-b-[4px] cursor-pointer p-3 hover:hover:border-gray-400 w-1/2 text-center  border-gray-300 ${filter === "all" ? "border-b-[4px] border-green-500" : ""}`
            }>
                All Games
            </div>
        </div>
    )
}