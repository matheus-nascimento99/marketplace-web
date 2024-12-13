import { Product } from '@/app/dto/product'
import { api } from '@/lib/ky/api'

export type FetchSellerProductsRequest = {
  search: string | null
  status: Product['status'] | null
}

export type FetchSellerProductsResponse = {
  products: Product[]
}

export const fetchSellerProducts = async ({
  status,
  search,
}: FetchSellerProductsRequest) => {
  const searchParams = new URLSearchParams()

  if (status) {
    searchParams.set('status', status)
  }

  if (search) {
    searchParams.set('search', search)
  }

  const result = await api
    .get<FetchSellerProductsResponse>('products/me', {
      searchParams,
    })
    .json()

  return result.products
}
