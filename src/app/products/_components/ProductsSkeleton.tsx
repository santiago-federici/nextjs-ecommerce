import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkeleton() {
  return (
    <section className="grid custom-grid gap-4 mb-16">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </section>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[175px] md:h-[220px] lg:h-[290px] max-w-sm rounded-md" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[45%]" />
        <Skeleton className="h-4 w-[20%]" />
      </div>
    </div>
  );
}
