'use server'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { z } from 'zod'

import { ActionState } from '@/utils/action-state'
import { handleHttpError } from '@/utils/handle-http-error'

import { signIn } from '../requests/sign-in'

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Por favor, forneça um e-mail válido')
    .min(1, 'Por favor, forneça seu e-mail'),
  password: z.string().min(1, 'Por favor, forneça sua senha'),
})

export const signInAction = async (_: ActionState, form: FormData) => {
  const fields = Object.fromEntries(form)

  const data = signInSchema.safeParse(fields)

  if (!data.success) {
    return {
      success: false,
      message: null,
      field_errors: data.error.flatten().fieldErrors,
      payload: fields,
    }
  }

  const { email, password } = data.data

  try {
    const { accessToken } = await signIn({
      email,
      password,
    })

    const cookieStorage = await cookies()

    cookieStorage.set('auth', accessToken, {
      path: '/',
    })
  } catch (error) {
    const httpError = await handleHttpError(error)

    return {
      ...httpError,
      payload: fields,
    }
  }

  redirect('/', RedirectType.replace)
}
