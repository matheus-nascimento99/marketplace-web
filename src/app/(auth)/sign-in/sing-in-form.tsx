'use client'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import { AccessIcon } from '@/ui/icons/access'
import { AlertCircleIcon } from '@/ui/icons/alert-circle'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { Loading01Icon } from '@/ui/icons/loading-01'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import * as Input from '@/ui/input'
import { DEFAULT_ACTION_STATE } from '@/utils/action-state'

import { signInAction } from './actions/sign-in'

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    DEFAULT_ACTION_STATE,
  )

  const [passwordShown, setPasswordShown] = useState(false)

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])

  const handleDisplayPassword = () => {
    setPasswordShown(!passwordShown)
  }

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  return (
    <form action={formAction} className="space-y-12">
      <div className="space-y-5">
        <Input.Root
          data-invalid={
            state.field_errors && Object.hasOwn(state.field_errors, 'email')
          }
        >
          <Input.Label>E-mail</Input.Label>
          <Input.Content>
            <Input.Sufix>
              <Mail02Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200 group-data-[invalid=true]:text-danger" />
            </Input.Sufix>
            <Input.ControlInput
              type="text"
              defaultValue={
                !state.success && state.payload && state.payload.email
                  ? state.payload.email.toString()
                  : email || ''
              }
              name="email"
              placeholder="Seu e-mail cadastrado"
              autoFocus={true}
            />
          </Input.Content>
          {state.field_errors &&
            state.field_errors.email &&
            state.field_errors.email.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </Input.Root>
        <Input.Root
          data-invalid={
            state.field_errors && Object.hasOwn(state.field_errors, 'password')
          }
        >
          <Input.Label>Senha</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200 group-data-[invalid=true]:text-danger" />
            </Input.Prefix>
            <Input.ControlInput
              type={!passwordShown ? 'password' : 'text'}
              defaultValue={
                !state.success && state.payload && state.payload.password
                  ? state.payload.password.toString()
                  : ''
              }
              name="password"
              placeholder="Sua senha de acesso"
            />
            <Input.Sufix>
              <button type="button" onClick={handleDisplayPassword}>
                {passwordShown ? (
                  <ViewOffIcon className="size-6 text-gray-300" />
                ) : (
                  <ViewIcon className="size-6 text-gray-300" />
                )}

                <span className="sr-only">Show/hide password</span>
              </button>
            </Input.Sufix>
          </Input.Content>
          {state.field_errors &&
            state.field_errors.password &&
            state.field_errors.password.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </Input.Root>
      </div>

      <Button
        disabled={isPending}
        font="action-md"
        className="disabled:cursor-wait"
      >
        {isPending ? (
          <>
            Carregando...
            <Loading01Icon className="ml-auto size-6 animate-spin text-white" />
          </>
        ) : (
          <>
            Acessar
            <ArrowRight02Icon className="ml-auto size-6 text-white" />
          </>
        )}
      </Button>
    </form>
  )
}
