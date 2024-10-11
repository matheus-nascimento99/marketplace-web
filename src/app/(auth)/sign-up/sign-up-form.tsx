'use client'

import { ChangeEvent, useRef, useState } from 'react'

import { AccessIcon } from '@/ui/icons/access'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { CallIcon } from '@/ui/icons/call'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { UserIcon } from '@/ui/icons/user'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import { maskPhone } from '@/utils/mask-phone'

export const SignUpForm = () => {
  const [phone, setPhone] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const onlyNumbers = value.replace(/\D/g, '')
    const masked = maskPhone(onlyNumbers)

    setPhone(masked)
  }

  const handleDisplayPassword = () => {
    if (passwordShown) {
      passwordInputRef.current?.setAttribute('type', 'password')
    } else {
      passwordInputRef.current?.setAttribute('type', 'text')
    }

    setPasswordShown(!passwordShown)
  }

  const handleDisplayConfirmPassword = () => {
    if (confirmPasswordShown) {
      confirmPasswordInputRef.current?.setAttribute('type', 'password')
    } else {
      confirmPasswordInputRef.current?.setAttribute('type', 'text')
    }

    setConfirmPasswordShown(!confirmPasswordShown)
  }

  return (
    <form method="POST" className="space-y-12">
      <fieldset className="space-y-5">
        <legend className="font-dm-sans text-title-sm text-gray-500">
          Perfil
        </legend>
        <div className="group flex flex-col">
          <label
            htmlFor="name"
            className="text-label-md uppercase text-gray-300 group-has-[:focus]:text-orange-base"
          >
            Nome
          </label>
          <div className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400">
            <UserIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Seu nome completo"
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
            />
          </div>
        </div>
        <div className="group flex flex-col">
          <label
            htmlFor="telephone"
            className="text-label-md uppercase text-gray-300 group-has-[:focus]:text-orange-base"
          >
            Telephone
          </label>
          <div className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400">
            <CallIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            <input
              type="tel"
              name="telephone"
              id="telephone"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-dm-sans text-title-sm text-gray-500">
          Acesso
        </legend>
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
              placeholder="Seu e-mail de acesso"
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
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
              ref={passwordInputRef}
              type="password"
              name="password"
              id="password"
              placeholder="Senha de acesso"
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
        <div className="group flex flex-col">
          <label
            htmlFor="password"
            className="text-label-md uppercase text-gray-300 group-focus-within:text-orange-base"
          >
            Confirmar senha
          </label>
          <div className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400">
            <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            <input
              ref={confirmPasswordInputRef}
              type="password"
              name="password"
              id="password"
              placeholder="Confirme a senha"
              className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
            />
            <button type="button" onClick={handleDisplayConfirmPassword}>
              {confirmPasswordShown ? (
                <ViewOffIcon className="size-6 text-gray-300" />
              ) : (
                <ViewIcon className="size-6 text-gray-300" />
              )}

              <span className="sr-only">Show/hide password</span>
            </button>
          </div>
        </div>
      </fieldset>

      <button className="flex h-14 w-full items-center justify-between rounded-xl bg-orange-base p-4 text-action-md text-white transition-colors hover:bg-orange-dark">
        <span>Cadastrar</span>
        <ArrowRight02Icon className="size-6 text-white" />
      </button>
    </form>
  )
}
