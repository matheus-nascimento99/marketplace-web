'use server'

import { redirect, RedirectType } from 'next/navigation'

import { signOut } from '../requests/sign-out'

export const signOutAction = async () => {
  try {
    await signOut()
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
