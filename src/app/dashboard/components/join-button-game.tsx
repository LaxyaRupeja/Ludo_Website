"use client";

import { useState } from "react";
import { joinGame } from "@/actions/game";
import { toast } from "sonner";
import { Game } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const JoinButton = (
    {
        game
    }: {
        game: Game
    }
) => {

    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        try {
            setLoading(true);
            const res = await joinGame(game.id);
            if (res.success) {
                toast.success("Joined game successfully");
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button onClick={handleJoin} disabled={loading}>
            {loading ? "Joining..." : "Join"}
        </Button>
    )

}