import { api } from '@/lib/ky/api'

export type GetProfileResponse = {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    } | null
  }
}

export const getProfile = async () => {
  const result = await api.get<GetProfileResponse>('sellers/me').json()

  return result
}
