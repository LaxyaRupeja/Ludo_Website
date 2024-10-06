import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/helpers/db";
import { currentUser } from "@clerk/nextjs/server";
import { IndianRupee, Wallet as WalletIcon } from "lucide-react";
import { AddAndDeductMoney } from "./components/add-and-deduct-money";
import { Transaction, WithdrawalRequest } from "@prisma/client";
import { format } from "date-fns";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import WalletFilter from "./components/wallet-filter";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const WalletPage = async ({
    searchParams
}: {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) => {
  const user = await currentUser();

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: dbUser?.id,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: dbUser?.id,
    },
  });

  const withdrawalRequests = await prisma.withdrawalRequest.findMany({
    where: {
      userId: dbUser?.id,
    },
  });

  return (
    <div>
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg my-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <WalletIcon size={40} className="text-green-400" />
              <div>
                <h2 className="text-2xl font-bold">Your Wallet</h2>
                <p className="text-sm text-gray-400">Current Balance</p>
              </div>
            </div>
            <div className="flex items-center">
              <IndianRupee size={30} className="text-green-400 mr-2" />
              <span className="text-4xl font-bold">{wallet?.balance.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator className="my-5" />
      <AddAndDeductMoney wallet={wallet} />
      <Separator className="my-5" />
      <WalletFilter />
      <div className="mt-5">
        {searchParams?.filter === "transactions" ? (
          <div className="flex flex-col gap-2">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            {searchParams?.filter === "withdrawals" ? (
              <div className="flex flex-col gap-2">
                {withdrawalRequests.map((request) => (
                  <WithdrawRequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const isDebit = transaction.type === "DEBIT";

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg my-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">Transaction ID: {transaction.id}</span>
          <Badge variant={isDebit ? "destructive" : "default"} className="text-xs">
            {isDebit ? "Debit" : "Credit"}
          </Badge>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <IndianRupee className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-2xl font-bold">
              {Math.abs(transaction.amount)}
            </span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {format(new Date(transaction.createdAt), "MMM d, yyyy HH:mm")}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {isDebit ? "Debited from" : "Credited to"} your wallet
        </p>
      </CardContent>
    </Card>
  );
};

const WithdrawRequestCard = ({ request }: { request: WithdrawalRequest }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-500";
      case "APPROVED":
        return "text-green-500";
      case "REJECTED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "APPROVED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "REJECTED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg my-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Request ID: {request.id}</span>
        <div className={`flex items-center ${getStatusColor(request.status)}`}>
          {getStatusIcon(request.status)}
          <span className="ml-2 font-semibold">{request.status}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <IndianRupee className="w-6 h-6 text-green-400 mr-2" />
          <span className="text-2xl font-bold">{request.amount}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {format(new Date(request.createdAt), "MMM d, yyyy HH:mm")}
          </span>
        </div>
      </div>
      {request.status === "PENDING" && (
        <p className="text-sm text-gray-400 mt-2">
          Your withdrawal request is being processed. This may take up to 24
          hours.
        </p>
      )}
    </div>
  );
};
