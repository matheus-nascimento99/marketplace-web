'use client'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { SaleTag02Icon } from '@/ui/icons/sae-tag-02'
import { Skeleton } from '@/ui/skeleton'

import { MetricCard } from './card'
import { getMonthlySoldProductsAmount } from './requests/get-monthly-sold-products-amount'

export const ProductsSoldCard = () => {
  const { data: sellAmount, error } = useQuery({
    queryKey: ['get-monthly-sold-products'],
    queryFn: getMonthlySoldProductsAmount,
  })

  if (error) toast.error(error.message)

  return (
    <>
      {sellAmount ? (
        <MetricCard
          icon={SaleTag02Icon}
          amount={sellAmount.amount}
          label="Produtos vendidos"
        />
      ) : (
        <Skeleton className="h-[110px] rounded-card" />
      )}
    </>
  )
}
