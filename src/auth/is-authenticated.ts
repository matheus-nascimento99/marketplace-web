import { CookiesFn, getCookie } from 'cookies-next'

export const isAuthenticated = async () => {
  let cookies: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')
    cookies = serverCookies
  }

  const authCookie = await getCookie('auth', { cookies })

  return !!authCookie
}
