"use client";

import { markAsDone } from "./actions";
import { Button } from "@/components/ui/button";

export async function MarkAsDoneButton({ id }: { id: string }) {

    const handleMarkAsDone = async () => {
        await markAsDone(id);
    }

    return (
        <Button onClick={handleMarkAsDone}>Mark as done</Button>
    )
}