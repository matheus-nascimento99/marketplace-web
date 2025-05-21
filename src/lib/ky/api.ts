import { CookiesFn, getCookie, getCookies } from 'cookies-next'
import ky from 'ky'

import { signOutAction } from '@/app/(app)/actions/sign-out'
import { isAuthenticated } from '@/auth/is-authenticated'
import { env } from '@/env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        const authCookie = await getCookie('auth', { cookies: cookieStore })

        if (!authCookie) {
          return
        }

        request.headers.set('Cookie', `auth=${authCookie}`)
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        const isAuth = await isAuthenticated()
        const status = response.status

        if (isAuth && status === 401) {
          await signOutAction()
        }
      },
    ],
  },
})
