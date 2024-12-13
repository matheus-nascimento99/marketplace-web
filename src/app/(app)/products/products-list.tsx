'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { Product } from '@/app/dto/product'
import { Skeleton } from '@/ui/skeleton'

import { ProductCard } from './product-card'
import { fetchSellerProducts } from './requests/fetch-seller-products'

export const ProductsList = () => {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status') as Product['status']

  const { data: products, error } = useQuery({
    queryKey: ['fetch-seller-products', search, status],
    queryFn: () => fetchSellerProducts({ search, status }),
  })

  if (error) toast.error(error.message)

  return (
    <div className="col-span-2 flex flex-wrap gap-4">
      {products ? (
        products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2 className="w-full text-center text-body-md text-gray-300">
            Nenhum produto encontrado.
          </h2>
        )
      ) : (
        Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="h-60 w-product-card rounded-card" />
        ))
      )}
    </div>
  )
}
