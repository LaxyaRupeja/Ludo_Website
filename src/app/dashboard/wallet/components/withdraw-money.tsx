"use client";

import { SubmitHandler, useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Wallet } from "@prisma/client";
import { withdrawMoney } from "@/actions/wallet"; // Import the withdrawMoney function
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, IndianRupee } from "lucide-react";

const WithdrawMoney = ({ wallet }: { wallet: Wallet | null }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<{ amount: string }>();
    const [open, setOpen] = useState(false);

    const onSubmit: SubmitHandler<{ amount: string }> = async (data) => {
        const response = await withdrawMoney(Number(data.amount));
        if (response.success) {
            toast.success(response.message);
            // reset form
            reset();
        } else {
            toast.error(response.message);
        }
        setOpen(false);
    };

    return <ResponsiveModal open={open} onOpenChange={setOpen}>
        <ResponsiveModalTrigger asChild>
            <Button size={"lg"} className="w-full sm:w-1/2 bg-gradient-to-r from-green-600 to-green-400 hover:from--700 hover:to-green-700 text-white font-semibold">
                Withdraw Money
            </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="bg-gradient-to-br from-gray-900 to-black text-white">
            <ResponsiveModalHeader>
                <ResponsiveModalTitle className="text-2xl font-bold">Withdraw Money</ResponsiveModalTitle>
                <ResponsiveModalDescription className="text-gray-300">
                    Enter the amount you want to withdraw from your wallet
                </ResponsiveModalDescription>
            </ResponsiveModalHeader>
            <Separator className="my-5 bg-gray-700" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">
                            Minimum withdrawal:
                        </p>
                        <p className="text-sm font-semibold text-green-400">₹100</p>
                    </div>
                    <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            className="h-14 pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            {...register("amount", { required: true, min: 100 })} // Register input with validation
                        />
                    </div>
                    {errors.amount && <p className="text-red-400 text-sm">Amount is required and must be at least ₹100</p>} {/* Error message */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">Current balance:</p>
                        <p className="text-sm font-semibold text-green-400">₹{wallet?.balance}</p>
                    </div>
                </div>
                <Separator className="my-5 bg-gray-700" />
                <ResponsiveModalFooter className="flex flex-col gap-3">
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold">
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                        {isSubmitting ? "Processing..." : "Withdraw"}
                    </Button>
                    <ResponsiveModalClose asChild>
                        <Button variant={"outline"} className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">Cancel</Button>
                    </ResponsiveModalClose>
                </ResponsiveModalFooter>
            </form>
        </ResponsiveModalContent>
    </ResponsiveModal>
}

export default WithdrawMoney;