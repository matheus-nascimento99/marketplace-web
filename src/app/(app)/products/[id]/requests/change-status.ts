import { Product } from '@/app/dto/product'
import { api } from '@/lib/ky/api'

type ChangeProductStatusRequest = {
  productId: string
  status: Product['status']
}

export const changeProductStatus = async ({
  productId,
  status,
}: ChangeProductStatusRequest) => {
  await api.patch(`products/${productId}/${status}`)
}
