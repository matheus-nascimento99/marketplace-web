import { CookiesFn, getCookies } from 'cookies-next'
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

        const cookies = await getCookies({ cookies: cookieStore })

        if (!cookies) {
          return
        }

        request.headers.set(
          'Cookie',
          Object.entries(cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join('; '),
        )
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
