"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const WalletFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState(searchParams?.get("filter") || "transactions");

    useEffect(() => {
        router.push(`/dashboard/wallet?filter=${filter}`);
    }, [filter, router]);

    return (
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg my-4">
            <CardContent className="p-3">
                <div className="flex gap-2">
                    <FilterButton
                        active={filter === "transactions"}
                        onClick={() => setFilter("transactions")}
                        icon={<ArrowUpIcon className="w-4 h-4" />}
                    >
                        Transactions
                    </FilterButton>
                    <FilterButton
                        active={filter === "withdrawals"}
                        onClick={() => setFilter("withdrawals")}
                        icon={<ArrowDownIcon className="w-4 h-4" />}
                    >
                        Withdrawals
                    </FilterButton>
                </div>
            </CardContent>
        </Card>
    );
};

const FilterButton = ({ active, onClick, children, icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode }) => (
    <Button
        variant={active ? "default" : "outline"}
        className={`flex-1 h-14 text-base font-medium py-2 px-3 ${
            active
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border-gray-600"
        }`}
        onClick={onClick}
    >
        <span className="flex items-center justify-center">
            {icon}
            <span className="ml-1">{children}</span>
        </span>
    </Button>
);

export default WalletFilter;