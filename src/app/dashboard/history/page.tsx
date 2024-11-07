import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
    return <div className="mx-auto">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <History size={40} className="text-green-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              Game History
            </h1>
          </div>
        </CardContent>
      </Card>
    </div>;
}
