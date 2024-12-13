import { Seller } from '@/app/dto/seller'
import { api } from '@/lib/ky/api'

export type GetProfileResponse = {
  seller: Seller
}

export const getProfile = async () => {
  const result = await api.get<GetProfileResponse>('sellers/me').json()

  return result
}
