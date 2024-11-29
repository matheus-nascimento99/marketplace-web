export type ActionState = {
  success: boolean
  message: string | null
  field_errors: Record<string, string[]> | null
  payload: {
    [k: string]: FormDataEntryValue
  } | null
}

export const DEFAULT_ACTION_STATE: ActionState = {
  success: false,
  message: null,
  field_errors: null,
  payload: null,
}
