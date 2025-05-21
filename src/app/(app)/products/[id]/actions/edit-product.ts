'use server'

import { z } from 'zod'

import { ActionState } from '@/utils/action-state'
import { capitalize } from '@/utils/capitalize'
import { handleHttpError } from '@/utils/handle-http-error'
import { harden } from '@/utils/harden'

import { editProduct } from '../requests/edit-product'

const editProductSchema = z.object({
  attachmentId: z
    .string({ required_error: 'Por favor, forneça a imagem do produto' })
    .uuid('Por favor, forneça a imagem do produto'),
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

export const editProductAction = async (
  productId: string,
  _: ActionState,
  form: FormData,
) => {
  const fields = Object.fromEntries(form)

  const data = editProductSchema.safeParse(fields)

  if (!data.success) {
    return {
      success: false,
      message: null,
      field_errors: data.error.flatten().fieldErrors,
      payload: fields,
    }
  }

  const { attachmentId, categoryId, description, priceInCents, title } =
    data.data

  try {
    await editProduct({
      productId,
      attachmentsIds: [attachmentId],
      categoryId,
      description,
      priceInCents,
      title,
    })

    return {
      success: true,
      message: 'Produto atualizado com sucesso!',
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
