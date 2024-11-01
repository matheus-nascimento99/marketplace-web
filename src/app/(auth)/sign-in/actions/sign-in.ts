'use server'

import { redirect, RedirectType } from 'next/navigation'
import { setTimeout } from 'timers/promises'

export const signIn = async (_, __: FormData) => {
  await setTimeout(2000)

  redirect('/', RedirectType.replace)
}
