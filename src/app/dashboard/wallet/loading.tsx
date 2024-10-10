import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-12 w-full" />{" "}
        {/* Increased top bar height and full width */}
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-40 w-full" />{" "}
        {/* Card 1 skeleton - full width */}
        <Skeleton className="h-40 w-full" />{" "}
        {/* Card 2 skeleton - full width */}
        <Skeleton className="h-40 w-full" />{" "}
        {/* Card 3 skeleton - full width */}
      </div>
    </div>
  );
}
