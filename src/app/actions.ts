"use server";

import prisma from "@/helpers/db";
import { revalidatePath } from "next/cache";


export async function markAsDone(id: string) {
    const todo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            done: true
        }
    })
    revalidatePath("/");
    return todo;
}
