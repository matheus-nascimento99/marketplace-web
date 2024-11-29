import { api } from '@/lib/ky/api'

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
}

export const signIn = async ({ email, password }: SignInRequest) => {
  const result = await api
    .post<SignInResponse>('sellers/sessions', {
      json: {
        email,
        password,
      },
    })
    .json()

  return result
}
