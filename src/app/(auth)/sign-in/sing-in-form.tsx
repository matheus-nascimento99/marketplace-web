'use client'
import { useRef, useState } from 'react'

import { AccessIcon } from '@/ui/icons/access'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'

export const SignInForm = () => {
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
    <form method="POST" className="space-y-12">
      <div className="space-y-5">
        <div className="group flex flex-col">
          <label
            htmlFor="email"
            className="text-label-md uppercase text-gray-300 group-has-[:focus]:text-orange-base"
          >
            E-mail
          </label>
          <div className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400">
            <Mail02Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Seu e-mail cadastrado"
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
              autoFocus={true}
            />
          </div>
        </div>
        <div className="group flex flex-col">
          <label
            htmlFor="password"
            className="text-label-md uppercase text-gray-300 group-focus-within:text-orange-base"
          >
            Senha
          </label>
          <div className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400">
            <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            <input
              ref={inputRef}
              type="password"
              name="password"
              id="password"
              placeholder="Sua senha de acesso"
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
            />
            <button type="button" onClick={handleDisplayPassword}>
              {passwordShown ? (
                <ViewOffIcon className="size-6 text-gray-300" />
              ) : (
                <ViewIcon className="size-6 text-gray-300" />
              )}

              <span className="sr-only">Show/hide password</span>
            </button>
          </div>
        </div>
      </div>

      <button className="flex h-14 w-full items-center justify-between rounded-xl bg-orange-base p-4 text-action-md text-white transition-colors hover:bg-orange-dark">
        <span>Acessar</span>
        <ArrowRight02Icon className="size-6 text-white" />
      </button>
    </form>
  )
}
