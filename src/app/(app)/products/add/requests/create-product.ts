import { Product } from '@/app/dto/product'
import { api } from '@/lib/ky/api'

export type CreateProductRequest = {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export type CreateProductResponse = {
  product: Product
}

export const createProduct = async ({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: CreateProductRequest) => {
  const result = await api
    .post<CreateProductResponse>('products', {
      json: {
        title,
        categoryId,
        description,
        priceInCents,
        attachmentsIds,
      },
    })
    .json()

  return result
}
