import { api } from '@/lib/ky/api'

export const signOut = async () => {
  await api.post('sign-out')
}
