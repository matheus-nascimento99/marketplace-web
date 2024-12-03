'use server'
import { HTTPError } from 'ky'
import { redirect, RedirectType } from 'next/navigation'
import { z } from 'zod'

import { ActionState } from '@/utils/action-state'

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
    await signIn({ email, password })
  } catch (error) {
    console.error(error)
    const isHTTPError = error instanceof HTTPError
    const message =
      isHTTPError && error.response.status < 500
        ? 'Credenciais inválidas'
        : 'Erro ao realizar o login. Tente novamente mais tarde'

    return {
      success: false,
      message,
      field_errors: null,
      payload: fields,
    }
  }

  redirect('/', RedirectType.replace)
}
