import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-model";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";

const transactions = [
    {
        id: 'TXN123456',
        date: '2024-09-25',
        time: '14:30',
        amount: 500,
        type: 'credit', // can be 'debit' or 'credit'
    },
    {
        id: 'TXN123457',
        date: '2024-09-25',
        time: '16:45',
        amount: -200,
        type: 'debit',
    },
    {
        id: 'TXN123458',
        date: '2024-09-26',
        time: '09:15',
        amount: 300,
        type: 'credit',
    },
];

const WalletPage = () => {
    return <div>
        <Card>
            <CardHeader>
                <CardTitle>Wallet</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Balance</span>
                    <span className="flex items-center gap-2 text-3xl font-bold">
                        <IndianRupee size={30} />
                        1000
                    </span>
                </div>
            </CardContent>
        </Card>
        <Separator className="my-5" />
        <div className="flex justify-between items-center gap-2">
            <ResponsiveModal>
                <ResponsiveModalTrigger asChild>
                    <Button size={"lg"} className="w-1/2">Add Money</Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent className="bg-black">
                    <ResponsiveModalHeader>
                        <ResponsiveModalTitle>Add Money</ResponsiveModalTitle>
                        <ResponsiveModalDescription>
                            Select the amount you want to add to your wallet
                        </ResponsiveModalDescription>
                    </ResponsiveModalHeader>
                    <Separator className="my-5" />
                    <div>
                        <Input type="number" placeholder="Enter amount" className="h-14" />
                    </div>
                    <Separator className="my-5" />
                    <ResponsiveModalFooter className="flex flex-col gap-3">
                        <Button>Submit</Button>
                        <ResponsiveModalClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </ResponsiveModalClose>
                    </ResponsiveModalFooter>

                </ResponsiveModalContent>
            </ResponsiveModal>

            <ResponsiveModal>
                <ResponsiveModalTrigger asChild>
                    <Button size={"lg"} className="w-1/2">Withdraw Money</Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent className="bg-black">
                    <ResponsiveModalHeader>
                        <ResponsiveModalTitle>Withdraw Money</ResponsiveModalTitle>
                        <ResponsiveModalDescription>
                            Select the amount you want to withdraw from your wallet
                        </ResponsiveModalDescription>
                    </ResponsiveModalHeader>
                    <Separator className="my-5" />
                    <div>
                        <p className="mb-3">
                            Minimum withdrawal amount is ₹100
                        </p>
                        <Input type="number" placeholder="Enter amount" className="h-14" />
                        <p className="text-sm text-gray-500 mt-2">
                            Your current balance is ₹1000
                        </p>
                    </div>
                    <Separator className="my-5" />
                    <ResponsiveModalFooter className="flex flex-col gap-3">
                        <Button>Submit</Button>
                        <ResponsiveModalClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </ResponsiveModalClose>
                    </ResponsiveModalFooter>
                </ResponsiveModalContent>
            </ResponsiveModal>
        </div>
        <Separator className="my-5" />
        <div className="mt-5">
            <h1 className="text-xl font-bold">Transaction History</h1>
            {/* // The UI should contain the transaction Id, date, time, and the amount. debit or credit , It should be a card type ui */}

            <div className="flex flex-col gap-2">
                {
                    transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))
                }
            </div>
        </div>
        <Separator className="my-5" />
        <div className="mt-5">
            <Button variant={"outline"}>Cancel</Button>
        </div>
    </div>
}

export default WalletPage;





const TransactionCard = ({ transaction }: { transaction: typeof transactions[number] }) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm my-2">
            <div className="flex justify-between mb-2">
                <span className="font-semibold">Transaction ID:</span>
                <span>{transaction.id}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{transaction.date}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Time:</span>
                <span>{transaction.time}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span className={`${transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'} font-bold`}>
                    {transaction.type === 'debit' ? '-' : '+'}₹{Math.abs(transaction.amount)}
                </span>
            </div>
        </div>
    );
};