'use client'
import { useActionState, useRef, useState } from 'react'

import { Button } from '@/ui/button'
import { AccessIcon } from '@/ui/icons/access'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { Loading01Icon } from '@/ui/icons/loading-01'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import * as Input from '@/ui/input'

import { signIn } from './actions/sign-in'

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, null)

  const [passwordShown, setPasswordShown] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDisplayPassword = () => {
    if (passwordShown) {
      inputRef.current?.setAttribute('type', 'password')
    } else {
      inputRef.current?.setAttribute('type', 'text')
    }

    setPasswordShown(!passwordShown)
  }

  return (
    <form action={formAction} className="space-y-12">
      <div className="space-y-5">
        <Input.Root>
          <Input.Label>E-mail</Input.Label>
          <Input.Content>
            <Input.Sufix>
              <Mail02Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Sufix>
            <Input.ControlInput
              type="text"
              name="email"
              placeholder="Seu e-mail cadastrado"
              autoFocus={true}
            />
          </Input.Content>
        </Input.Root>
        <Input.Root>
          <Input.Label>Senha</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              ref={inputRef}
              type="password"
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
        </Input.Root>
      </div>

      <Button disabled={isPending} font="action-md">
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
