import { HTTPError } from 'ky'

import { ErrorResponse } from '@/app/_types/error-response'

import { ActionState } from './action-state'

export const handleHttpError = async (
  error: unknown,
): Promise<Omit<ActionState, 'payload'>> => {
  const isHTTPError = error instanceof HTTPError

  if (isHTTPError) {
    const httpError = await error.response.json<ErrorResponse>()
    const parsedHttpError = handleHttpError(httpError)

    return parsedHttpError
  }

  return {
    success: false,
    message: 'Erro ao realizar o login. Tente novamente mais tarde',
    field_errors: null,
  }
}
