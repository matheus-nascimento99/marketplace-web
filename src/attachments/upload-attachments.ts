import { api } from '@/lib/ky/api'

export type UploadAttachmentsRequest = {
  file: File
}

export type UploadAttachmentsResponse = {
  attachments: {
    id: string
    url: string
  }[]
}

export const uploadAttachments = async ({ file }: UploadAttachmentsRequest) => {
  const formData = new FormData()
  formData.append('files', file)

  const result = await api
    .post<UploadAttachmentsResponse>('attachments', {
      body: formData,
    })
    .json()

  return result
}
