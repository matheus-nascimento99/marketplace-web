import { Product } from '@/app/dto/product'
import { api } from '@/lib/ky/api'

export type EditProductRequest = {
  productId: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export type EditProductResponse = {
  product: Product
}

export const editProduct = async ({
  productId,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: EditProductRequest) => {
  const result = await api
    .put<EditProductResponse>(`products/${productId}`, {
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
