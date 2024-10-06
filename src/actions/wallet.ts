"use server";


import prisma from "@/helpers/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";

export const verifyPayment = async (paymentId: string) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const user = auth();

    if (!user.userId) {
        return {
            success: false,
            message: "User not found"
        }
    }

    const response = await instance.payments.fetch(paymentId);

    if (!response) {
        return {
            success: false,
            message: "Payment Failed"
        }
    }

    if (response.status != "authorized") {
        return {
            success: false,
            message: "Payment Failed"
        }
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: user.userId
        }
    })

    if (!dbUser) {
        return {
            success: false,
            message: "User not found"
        }
    }

    await prisma.$transaction([
        prisma.wallet.update({
            where: {
                userId: dbUser.id
            },
            data: {
                balance: {
                    increment: Number(response.amount) / 100
                }
            }
        }),
        prisma.transaction.create({
            data: {
                amount: Number(response.amount) / 100,
                type: "CREDIT",
                userId: dbUser.id
            }
        })
    ])

    revalidatePath("/dashboard/wallet");

    return {
        success: true,
        message: "Payment Successful"
    }


}


export const withdrawMoney = async (amount: number) => {
    const user = auth();

    console.log({ amount });

    if (!user.userId) {
        return {
            success: false,
            message: "User not found"
        }
    }

    // minimum withdrawal amount is 100
    if (amount < 100) {
        return {
            success: false,
            message: "Minimum withdrawal amount is 100"
        }
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: user.userId
        }
    })

    if (!dbUser) {
        return {
            success: false,
            message: "User not found"
        }
    }

    const wallet = await prisma.wallet.findUnique({
        where: {
            userId: dbUser.id
        }
    })

    if (!wallet) {
        return {
            success: false,
            message: "Wallet not found"
        }
    }

    if (wallet.balance < amount) {
        return {
            success: false,
            message: "Insufficient balance"
        }
    }

    await prisma.withdrawalRequest.create({
        data: {
            userId: dbUser.id,
            amount: amount
        }
    })

    revalidatePath("/dashboard/wallet");

    return {
        success: true,
        message: "Withdrawal request submitted"
    }
}
