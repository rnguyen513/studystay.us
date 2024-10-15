import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  const skeletonItem = () => (
    <div className="space-y-4">
      <div className="relative">
        <Skeleton className="w-full aspect-[3/2] rounded-xl" />
        <Skeleton className="absolute top-2 right-2 w-6 h-6 rounded-full" />
        <Skeleton className="absolute top-2 left-2 w-24 h-6 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index}>{skeletonItem()}</div>
      ))}
    </div>
  )
}