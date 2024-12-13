'use client'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { UserMultipleIcon } from '@/ui/icons/user-multiple'
import { Skeleton } from '@/ui/skeleton'

import { MetricCard } from './card'
import { getMonthlyViewsAmount } from './requests/get-monthly-views-amount'

export const VisitorsCard = () => {
  const { data: viewsAmount, error } = useQuery({
    queryKey: ['get-monthly-views'],
    queryFn: getMonthlyViewsAmount,
  })

  if (error) toast.error(error.message)

  return (
    <>
      {viewsAmount ? (
        <MetricCard
          icon={UserMultipleIcon}
          amount={viewsAmount.amount}
          label="Pessoas visitantes"
        />
      ) : (
        <Skeleton className="h-[110px] rounded-card" />
      )}
    </>
  )
}
