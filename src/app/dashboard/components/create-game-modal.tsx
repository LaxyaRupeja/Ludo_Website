"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
  ResponsiveModalDescription,
  ResponsiveModalClose,
} from "@/components/ui/responsive-model";
import { Plus, IndianRupee, Loader2, Gamepad2 } from "lucide-react";
import { createGame } from "@/actions/game";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const CreateGameModal = ({ className }: { className?: string }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      betAmount: "",
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: { code: string; betAmount: string }) => {
    try {
      const response = await createGame({
        code: data.code,
        betAmount: Number(data.betAmount),
      });

      if (response.success) {
        toast.success("Game created successfully");
        setOpen(false);
      } else {
        if (response.errors) {
          toast.error(response.errors[0].message);
        } else {
          toast.error(response.error);
        }
      }
    } catch (error) {
      console.error("Failed to create game:", error);
      toast.error("Failed to create game");
    }
  };

  const predefinedAmounts = [
    "100",
    "200",
    "300",
    "500",
    "1000",
    "2000",
    "5000",
    "10000",
    "20000",
    "50000",
    "100000",
    "200000",
  ];

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalTrigger asChild>
        <Button className={cn("h-14", className)} variant="outline">
          <Plus />
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="bg-gradient-to-br from-gray-900 to-black">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="text-2xl font-bold">
            Create a new game
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="text-muted">
            Enter the game details and select the bet amount
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Separator className="my-5" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Gamepad2
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Controller
                name="code"
                control={control}
                rules={{ required: "Game Code is required" }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Input
                      {...field}
                      placeholder="Enter Your Room Code"
                      className="h-14 pl-10 placeholder-muted-foreground"
                    />
                    {error && (
                      <p className="text-red-400 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primary-foreground">
                Select Bet Amount
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    className="h-10"
                    variant={
                      watch("betAmount") === amount ? "default" : "outline"
                    }
                    onClick={() =>
                      setValue("betAmount", amount, { shouldValidate: true })
                    }
                  >
                    {amount} Rs
                  </Button>
                ))}
              </div>
              <div className="relative mt-2">
                <IndianRupee
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Controller
                  name="betAmount"
                  control={control}
                  rules={{ required: "Bet Amount is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter custom amount"
                        className="h-14 pl-10"
                      />
                      {error && (
                        <p className="text-red-400 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <p className="text-sm text-gray-400">
              This amount will be deducted from your wallet and you&apos;ll
              receive your winnings after your win gets verified.
            </p>
          </div>
          <Separator className="my-5 bg-gray-700" />
          <ResponsiveModalFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !watch("betAmount") || !watch("code")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
              {isSubmitting ? "Creating Game..." : "Create Game"}
            </Button>
            <ResponsiveModalClose asChild>
              <Button
                variant={"outline"}
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </ResponsiveModalClose>
          </ResponsiveModalFooter>
        </form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default CreateGameModal;
