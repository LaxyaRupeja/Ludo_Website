import { publicProcedure, router } from "../init";
import { z } from "zod";
import prisma from "@/helpers/db";

export const appRouter = router({
    hello: publicProcedure.query(() => {
        return { greeting: 'Hello, World!' }
    }),
    createTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
        const todo = await prisma.todo.create({
            data: {
                title: input
            }
        })
        return todo;
    }),
    markAsDone: publicProcedure.input(z.string()).mutation(async ({ input }) => {
        const todo = await prisma.todo.update({
            where: {
                id: input
            },
            data: {
                done: true
            }
        })
        return todo;
    })
})


export type AppRouter = typeof appRouter;