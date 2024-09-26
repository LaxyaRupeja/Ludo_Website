import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { initTRPC } from '@trpc/server';
const t = initTRPC.create();

export const createContext = async (opts: CreateNextContextOptions) => {
    return {
        req: opts.req,
        res: opts.res
    }
}




export const publicProcedure = t.procedure;
export const {
    router,
    createCallerFactory
} = t;

;