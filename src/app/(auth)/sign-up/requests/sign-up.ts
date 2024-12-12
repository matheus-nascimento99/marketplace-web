import { api } from '@/lib/ky/api'

export type SignUpRequest = {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export type SignUpResponse = {
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

export const signUp = async ({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: SignUpRequest) => {
  const result = await api
    .post<SignUpResponse>('sellers', {
      json: {
        name,
        phone,
        email,
        avatarId,
        password,
        passwordConfirmation,
      },
    })
    .json()

  return result
}
