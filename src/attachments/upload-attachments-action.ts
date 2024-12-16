'use server'

import { z } from 'zod'

import { handleHttpError } from '@/utils/handle-http-error'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  sizeInMB,
} from '@/utils/size-in-mb'

import { uploadAttachments } from './upload-attachments'

const uploadAttachmentSchema = z.object({
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
})

type UploadAttachmentSchema = z.infer<typeof uploadAttachmentSchema>

export const uploadAttachmentsAction = async (
  attachment: UploadAttachmentSchema,
) => {
  const data = uploadAttachmentSchema.safeParse(attachment)

  if (!data.success) {
    return {
      success: false,
      message: null,
      field_errors: data.error.flatten().fieldErrors,
      payload: null,
    }
  }

  const { file } = data.data

  try {
    const result = await uploadAttachments({ file })

    return {
      success: true,
      message: null,
      field_errors: null,
      payload: null,
      attachmentId: result.attachments[0].id,
    }
  } catch (error) {
    const httpError = await handleHttpError(error)

    return {
      ...httpError,
      payload: null,
    }
  }
}
