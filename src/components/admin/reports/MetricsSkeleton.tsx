import { Skeleton } from "@/components/ui/skeleton";

export const MetricsSkeleton = () => (
  <div className="w-full h-[400px] rounded-lg border bg-card animate-pulse">
    <div className="h-full flex items-center justify-center">
      <Skeleton className="h-[90%] w-[95%]" />
    </div>
  </div>
);