import { Product } from '@/app/dto/product'
import { api } from '@/lib/ky/api'

export type GetProductRequest = {
  productId: string
}

export type GetProductResponse = {
  product: Product
}

export const getProduct = async ({ productId }: GetProductRequest) => {
  const result = await api
    .get<GetProductResponse>(`products/${productId}`, {
      next: { tags: ['get-product'] },
    })
    .json()

  return result.product
}
