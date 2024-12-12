'use server'

import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

export const signOutAction = async () => {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth')
  } catch (error) {
    console.error(error)

    const message = 'Erro ao realizar o logout. Tente novamente mais tarde'

    return {
      success: false,
      message,
      field_errors: null,
      payload: null,
    }
  }

  redirect('/sign-in', RedirectType.replace)
}
