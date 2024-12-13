import { api } from '@/lib/ky/api'

export type GetMonthlyViewsAmountResponse = {
  amount: number
}

export const getMonthlyViewsAmount = async () => {
  const result = await api
    .get<GetMonthlyViewsAmountResponse>('sellers/metrics/views')
    .json()

  return result
}
