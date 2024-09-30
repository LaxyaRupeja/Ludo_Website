"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Plus } from "lucide-react";
import { createGame } from '@/actions/game';


const CreateGameModal = () => {
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            code: '',
            betAmount: ''
        }
    });

    const onSubmit = async (data: {
        code: string;
        betAmount: string;
    }) => {
        try {
            await createGame({
                code: data.code,
                betAmount: Number(data.betAmount)
            });
            // Handle successful game creation (e.g., show a success message, close the modal)
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Failed to create game:', error);
        }
    };

    const predefinedAmounts = ["100", "200", "300", "500", "1000", "2000", "5000", "10000", "20000", "50000", "100000", "200000"];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-2">
                <Controller
                    name="code"
                    control={control}
                    rules={{ required: "Game Code is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="flex-grow">
                            <Input
                                {...field}
                                placeholder="Enter Your Room Code to List Your Game"
                                className="h-14"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                        </div>
                    )}
                />
                <ResponsiveModal>
                    <ResponsiveModalTrigger asChild>
                        <Button className="h-14" variant="outline">
                            <Plus />
                        </Button>
                    </ResponsiveModalTrigger>
                    <ResponsiveModalContent className="bg-black">
                        <ResponsiveModalHeader>
                            <ResponsiveModalTitle>Create a new game</ResponsiveModalTitle>
                        </ResponsiveModalHeader>
                        <div className="space-y-4">
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
                                This amount will be deducted from your wallet and you'll receive your winnings after your win gets verified.
                            </p>
                        </div>
                        <ResponsiveModalFooter>
                            <Button type="submit">Create Game</Button>
                        </ResponsiveModalFooter>
                    </ResponsiveModalContent>
                </ResponsiveModal>
            </div>
        </form>
    );
};

export default CreateGameModal;