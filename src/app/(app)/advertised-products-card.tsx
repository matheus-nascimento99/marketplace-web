'use client'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Store04Icon } from '@/ui/icons/store-04'
import { Skeleton } from '@/ui/skeleton'

import { MetricCard } from './card'
import { getMonthlyAvailableProductsAmount } from './requests/get-monthly-available-products-amount'

export const AdvertisedProductsCard = () => {
  const { data: availableAmount, error } = useQuery({
    queryKey: ['get-monthly-available-products'],
    queryFn: getMonthlyAvailableProductsAmount,
  })

  if (error) toast.error(error.message)

  return (
    <>
      {availableAmount ? (
        <MetricCard
          icon={Store04Icon}
          amount={availableAmount.amount}
          label="Produtos anunciados"
        />
      ) : (
        <Skeleton className="h-[110px] rounded-card" />
      )}
    </>
  )
}
