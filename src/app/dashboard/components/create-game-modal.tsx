"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Plus } from "lucide-react";
import { createGame } from '@/actions/game';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CreateGameModal = ({
    className
}: {
    className?: string;
}) => {
    const { control, handleSubmit, setValue, watch, formState: {
        isSubmitting
    } } = useForm({
        defaultValues: {
            code: '',
            betAmount: ''
        }
    });

    const [open, setOpen] = useState(false);

    const onSubmit = async (data: {
        code: string;
        betAmount: string;
    }) => {
        console.log("Creating Client Game", data);
        try {
            const response = await createGame({
                code: data.code,
                betAmount: Number(data.betAmount)
            });
            // Handle successful game creation (e.g., show a success message, close the modal)

            if (response.success) {
                console.log("Game created successfully");
                toast.success("Game created successfully");
                setOpen(false);
            } else {
                console.log("Failed to create game:", response.error);
                toast.error(response.error);
            }

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Failed to create game:', error);
        }
    };

    const predefinedAmounts = ["100", "200", "300", "500", "1000", "2000", "5000", "10000", "20000", "50000", "100000", "200000"];

    return (
        <ResponsiveModal onOpenChange={
            (open) => {
                setOpen(open);
            }
        } open={open}>
            <ResponsiveModalTrigger asChild>
                <Button className={cn("h-14", className)} variant="outline" >
                    <Plus />
                </Button>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent className="bg-black">
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Create a new game</ResponsiveModalTitle>
                </ResponsiveModalHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
                    <div className="space-y-4">
                        <Controller
                            name="code"
                            control={control}
                            rules={{ required: "Game Code is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <Input
                                        {...field}
                                        placeholder="Enter Your Room Code to List Your Game"
                                        className="h-14 w-full"
                                    />
                                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                </div>
                            )}
                        />
                        <div>
                            <h2 className="text-lg font-semibold">Select Bet Amount</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {predefinedAmounts.map((amount) => (
                                    <Button
                                        key={amount}
                                        type="button"
                                        className="h-10"
                                        variant={watch('betAmount') === amount ? "default" : "outline"}
                                        onClick={() => setValue('betAmount', amount, { shouldValidate: true })}
                                    >
                                        {amount} Rs
                                    </Button>
                                ))}
                            </div>
                            <Controller
                                name="betAmount"
                                control={control}
                                rules={{ required: "Bet Amount is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter custom amount"
                                            className="h-10 mt-2"
                                        />
                                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                    </>
                                )}
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            This amount will be deducted from your wallet and you&apos;ll receive your winnings after your win gets verified.
                        </p>
                    </div>
                    <ResponsiveModalFooter>
                        <Button type="submit" disabled={isSubmitting || !watch('betAmount') || !watch('code')}>
                            {isSubmitting ? "Creating Game..." : "Create Game"}
                        </Button>
                    </ResponsiveModalFooter>
                </form>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
};

export default CreateGameModal;