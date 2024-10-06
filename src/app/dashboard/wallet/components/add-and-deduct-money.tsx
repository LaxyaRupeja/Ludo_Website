"use client";

import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { verifyPayment } from "@/actions/wallet";
import { toast } from "sonner";
import { IndianRupee, Loader2 } from "lucide-react";
import WithdrawMoney from "./withdraw-money";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const AddAndDeductMoney = ({ wallet }: { wallet: Wallet | null }) => {
  const { user } = useUser();

  const [amount, setAmount] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializePayment = (amount: number) => {
    setAddMoney(false);
    setIsLoading(true);
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const options: any = {
      key: "rzp_test_YKejJgzYAHnIpL", // Replace with your actual Razorpay key ID
      amount: amount * 100,
      currency: "INR",
      name: "Ludo",
      description: "Add money to your wallet",
      handler: async function (response: { razorpay_payment_id: string }) {
        try {
          const res = await verifyPayment(response.razorpay_payment_id);
          if (res.success) {
            toast.success(res.message);
            setAddMoney(false);
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      },
      prefill: {
        contact: user?.phoneNumbers[0]?.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <ResponsiveModal open={addMoney} onOpenChange={setAddMoney}>
        <ResponsiveModalTrigger asChild>
          <Button
            size={"lg"}
            className="w-full sm:w-1/2 bg-gradient-to-r from-green-600 to-green-400 hover:from--700 hover:to-green-700 text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              "Add Money"
            )}
          </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="bg-gradient-to-br from-gray-900 to-black text-white">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle className="text-2xl font-bold">
              Add Money
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="text-gray-300">
              Select the amount you want to add to your wallet
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <Separator className="my-5 bg-gray-700" />
          <div className="relative">
            <IndianRupee
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              min={0}
              type="number"
              placeholder="Enter amount"
              className="h-14 pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              value={amount == 0 ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <Separator className="my-5 bg-gray-700" />
          <ResponsiveModalFooter className="flex flex-col gap-3">
            <Button
              onClick={() => {
                if (amount <= 0) {
                  toast.error("Amount must be greater than 0");
                  return;
                }
                initializePayment(amount);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
            >
              Submit
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
        </ResponsiveModalContent>
      </ResponsiveModal>
      <WithdrawMoney wallet={wallet} />
    </div>
  );
};
