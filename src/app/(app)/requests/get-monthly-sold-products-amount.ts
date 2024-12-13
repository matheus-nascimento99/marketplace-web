import { api } from '@/lib/ky/api'

export type GetMonthlySoldProductsAmountResponse = {
  amount: number
}

export const getMonthlySoldProductsAmount = async () => {
  const result = await api
    .get<GetMonthlySoldProductsAmountResponse>('sellers/metrics/products/sold')
    .json()

  return result
}
