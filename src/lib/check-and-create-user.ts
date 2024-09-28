import prisma from "@/helpers/db";
import { currentUser } from "@clerk/nextjs/server";


export const checkAndCreateUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const maybeUser = await prisma.user.findUnique({
        where: {
            clerkId: user.id
        }
    })

    if (maybeUser) {
        const walletAmount = await prisma.wallet.findUnique({
            where: {
                userId: maybeUser.id
            }
        })

        if (!walletAmount) {
            await prisma.wallet.create({
                data: {
                    userId: maybeUser.id,
                    balance: 0
                }
            })
            return {
                walletAmount: 0,
            };
        }
        else {
            return {
                walletAmount: walletAmount.balance,
            };
        }
    }
    else {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0]?.emailAddress ?? null,
                phone: user.phoneNumbers[0].phoneNumber,
            }
        })

        await prisma.wallet.create({
            data: {
                userId: newUser.id,
                balance: 0
            }
        })

        return {
            walletAmount: 0,
        };
    }
};