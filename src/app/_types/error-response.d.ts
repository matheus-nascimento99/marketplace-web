export type ErrorResponse = {
  statusCode: number
  message: string
  error?: string
  errors?: {
    validation: string
    code: string
    message: string
    path: string[]
  }[]
}
