"use client";

import { trpc } from "@/trpc/client"

export const TRPCTesting = () => {
    const [data] = trpc.hello.useSuspenseQuery();
    return (
        <div>
            {
                data.greeting
            }
        </div>
    )
}