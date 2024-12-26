import { Skeleton } from '@/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex items-start gap-6">
      <div className="h-product-image w-product-image">
        <Skeleton className="h-full rounded-2xl" />
      </div>
      <Skeleton className="h-[466px] flex-1 rounded-card" />
    </div>
  )
}
