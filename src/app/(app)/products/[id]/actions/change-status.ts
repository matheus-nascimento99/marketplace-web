'use server'

import { revalidateTag } from 'next/cache'

import { Product } from '@/app/dto/product'
import { handleHttpError } from '@/utils/handle-http-error'

import { changeProductStatus } from '../requests/change-status'

export const changeProductStatusAction = async (
  productId: string,
  status: Product['status'],
) => {
  try {
    await changeProductStatus({ productId, status })

    revalidateTag('get-product')

    return {
      success: true,
      message: 'Status atualizado com sucesso!',
      field_errors: null,
      payload: null,
    }
  } catch (error) {
    const httpError = await handleHttpError(error)

    return {
      ...httpError,
      payload: null,
    }
  }
}
