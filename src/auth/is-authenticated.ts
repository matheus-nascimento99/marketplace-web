import { cookies } from 'next/headers'

export const isAuthenticated = async () => {
  const cookiesStorage = await cookies()

  return !!cookiesStorage.get('auth')
}
