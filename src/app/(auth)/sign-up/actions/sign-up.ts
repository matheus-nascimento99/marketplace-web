'use server'

import { setTimeout } from 'timers/promises'

export const signUp = async (_: unknown, __: FormData) => {
  await setTimeout(2000)

  return { success: true, message: null, validationErrors: null, payload: null }
}
