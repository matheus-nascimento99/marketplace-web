import { HTTPError } from 'ky'

import { ErrorResponse } from '@/app/_types/error-response'

import { ActionState } from './action-state'

export const handleHttpError = async (
  error: unknown,
): Promise<Omit<ActionState, 'payload'>> => {
  const isHTTPError = error instanceof HTTPError
  let fieldErrors: ActionState['field_errors'] = null
  let message: ActionState['message'] = null

  if (isHTTPError) {
    const httpError = await error.response.json<ErrorResponse>()

    message = httpError.message

    if (httpError.errors) {
      message = null
      fieldErrors = httpError.errors.reduce(
        (accumulator, currentValue) => {
          if (accumulator) {
            accumulator[currentValue.validation] = []
            accumulator[currentValue.validation].push(currentValue.message)
          }

          return accumulator
        },
        {} as ActionState['field_errors'],
      )
    }
  }

  return {
    success: false,
    message,
    field_errors: fieldErrors,
  }
}
