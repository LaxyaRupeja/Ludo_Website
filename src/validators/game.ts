import { z } from "zod";

export const createGameSchema = z.object({
    betAmount: z.number().min(1),
    code: z.string().min(4)
})

export type TCreateGame = z.infer<typeof createGameSchema>;
