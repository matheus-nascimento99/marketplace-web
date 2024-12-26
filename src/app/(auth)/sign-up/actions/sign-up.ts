'use server'

import { z } from 'zod'

import { ActionState } from '@/utils/action-state'
import { capitalize } from '@/utils/capitalize'
import { handleHttpError } from '@/utils/handle-http-error'
import { harden } from '@/utils/harden'

import { signUp } from '../requests/sign-up'

const signUpSchema = z
  .object({
    avatarId: z.union([
      z
        .string({ required_error: 'Por favor, forneça a imagem do produto' })
        .uuid('Por favor, forneça a imagem do produto'),
      z.string().nullable(),
    ]),
    name: z
      .string()
      .trim()
      .min(1, 'Por favor, forneça seu nome')
      .transform((value) => capitalize(value))
      .refine((value) => value.split(' ').length > 1, {
        message: 'Por favor, forneça seu nome completo',
      }),
    phone: z
      .string()
      .trim()
      .min(1, 'Por favor, forneça o número do seu telefone')
      .transform((value) => harden(value)),
    email: z
      .string()
      .trim()
      .email('Por favor, forneça um e-mail válido')
      .min(1, 'Por favor, forneça seu e-mail'),
    password: z
      .string({ required_error: 'Por favor, forneça sua senha' })
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z
      .string({ required_error: 'Por favor, forneça a confirmação da senha' })
      .min(1, 'Por favor, forneça a confirmação da senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })

export const signUpAction = async (_: ActionState, form: FormData) => {
  const fields = Object.fromEntries(form)

  const data = signUpSchema.safeParse(fields)

  if (!data.success) {
    return {
      success: false,
      message: null,
      field_errors: data.error.flatten().fieldErrors,
      payload: fields,
    }
  }

  const { name, phone, email, avatarId, password, passwordConfirmation } =
    data.data

  try {
    await signUp({
      name,
      phone,
      email,
      avatarId,
      password,
      passwordConfirmation,
    })

    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      field_errors: null,
      payload: fields,
    }
  } catch (error) {
    const httpError = await handleHttpError(error)

    return {
      ...httpError,
      payload: fields,
    }
  }
}
