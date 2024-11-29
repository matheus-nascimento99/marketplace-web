import ky from 'ky'

import { env } from '@/env/env'

export const api = ky.create({
  credentials: 'include',
  prefixUrl: env.API_BASE_URL,
})
