import { api } from '@/lib/ky/api'

export type GetMonthlyAvailableProductsAmountResponse = {
  amount: number
}

export const getMonthlyAvailableProductsAmount = async () => {
  const result = await api
    .get<GetMonthlyAvailableProductsAmountResponse>(
      'sellers/metrics/products/available',
    )
    .json()

  return result
}
