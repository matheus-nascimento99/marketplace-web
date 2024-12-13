'use server'

import { z } from 'zod'

import { uploadAttachments } from '@/attachments/upload-attachments'
import { ActionState } from '@/utils/action-state'
import { capitalize } from '@/utils/capitalize'
import { handleHttpError } from '@/utils/handle-http-error'
import { harden } from '@/utils/harden'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  sizeInMB,
} from '@/utils/size-in-mb'

import { signUp } from '../requests/sign-up'

const signUpSchema = z
  .object({
    file: z
      .custom<File>()
      .refine((file) => {
        return sizeInMB(file.size) <= MAX_IMAGE_SIZE
      }, `O tamanho máximo aceitável da imagem é ${MAX_IMAGE_SIZE}MB`)
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      }, 'Tipo de imagem não suportada'),
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

  const { name, phone, email, file, password, passwordConfirmation } = data.data

  try {
    let avatarId: string | null = null

    if (file) {
      const { attachments } = await uploadAttachments({ file })
      avatarId = attachments[0].id
    }

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
