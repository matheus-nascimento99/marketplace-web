import { api } from '@/lib/ky/api'

export type GetMonthlyViewsResponse = {
  viewsPerDay: {
    date: string
    amount: number
  }[]
}

export const getMonthlyViews = async () => {
  const result = await api
    .get<GetMonthlyViewsResponse>('sellers/metrics/views/days')
    .json()

  return result
}
