import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeLoading() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-36" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-28 w-full" />
          ))}
        </div>
      </div>
    </Container>
  );
}

