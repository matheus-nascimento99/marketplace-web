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

import { createProduct } from '../requests/create-product'

const createProductSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => {
      return file.name !== 'undefined'
    }, 'A imagem do produto é obrigatória')
    .refine((file) => {
      return sizeInMB(file.size) <= MAX_IMAGE_SIZE
    }, `O tamanho máximo aceitável da imagem é ${MAX_IMAGE_SIZE}MB`)
    .refine((file) => {
      return file.name !== 'undefined'
        ? ACCEPTED_IMAGE_TYPES.includes(file.type)
        : true
    }, 'Tipo de imagem não suportada'),
  title: z
    .string()
    .trim()
    .min(1, 'Por favor, forneça o título do produto')
    .transform((value) => capitalize(value)),
  description: z
    .string()
    .trim()
    .min(1, 'Por favor, forneça a descrição do produto'),
  priceInCents: z
    .string()
    .min(1, 'Por favor, forneça o valor do produto')
    .transform((value, ctx) => {
      const parsedNumber = parseInt(harden(value))

      if (isNaN(parsedNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O valor deve ser um número',
        })

        return z.NEVER
      }

      return parsedNumber
    }),
  categoryId: z
    .string({ required_error: 'Por favor, forneça a categoria do produto' })
    .min(1, 'Por favor, forneça a categoria do produto')
    .uuid('A categoria deve ser um uuid'),
})

export const createProductAction = async (_: ActionState, form: FormData) => {
  const fields = Object.fromEntries(form)

  const data = createProductSchema.safeParse(fields)

  if (!data.success) {
    return {
      success: false,
      message: null,
      field_errors: data.error.flatten().fieldErrors,
      payload: fields,
    }
  }

  const { file, categoryId, description, priceInCents, title } = data.data

  try {
    const attachmentsIds: string[] = []

    if (file) {
      const { attachments } = await uploadAttachments({ file })
      attachmentsIds.push(attachments[0].id)
    }

    await createProduct({
      attachmentsIds,
      categoryId,
      description,
      priceInCents,
      title,
    })

    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      field_errors: null,
      payload: null,
    }
  } catch (error) {
    const httpError = await handleHttpError(error)

    return {
      ...httpError,
      payload: fields,
    }
  }
}
