'use client'

import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'

import { Button } from '@/ui/button'
import { AccessIcon } from '@/ui/icons/access'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { CallIcon } from '@/ui/icons/call'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { UserIcon } from '@/ui/icons/user'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import * as Input from '@/ui/input'
import { maskPhone } from '@/utils/mask-phone'

export const SignUpForm = () => {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const handleProfileAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    if (files.length === 0) {
      setAvatar(null)

      e.target.value = ''
    } else {
      const objectURL = URL.createObjectURL(files[0])

      setAvatar(objectURL)
    }
  }

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
        <div>
          <label
            htmlFor="avatar"
            className="size-30 flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-shape"
          >
            {avatar ? (
              <Image
                src={avatar}
                className="h-full w-full object-contain"
                width={120}
                height={120}
                quality={100}
                alt="Avatar picture"
              />
            ) : (
              <ImageUploadIcon className="size-8 text-orange-base" />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            className="sr-only"
            onChange={handleProfileAvatarChange}
          />
        </div>
        <Input.Root>
          <Input.Label>Nome</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <UserIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.Control
              type="text"
              name="name"
              placeholder="Seu nome completo"
            />
          </Input.Content>
        </Input.Root>
        <Input.Root>
          <Input.Label>Telephone</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <CallIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.Control
              type="tel"
              name="telephone"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={handlePhoneChange}
            />
          </Input.Content>
        </Input.Root>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-dm-sans text-title-sm text-gray-500">
          Acesso
        </legend>
        <Input.Root>
          <Input.Label>E-mail</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <Mail02Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.Control
              type="text"
              name="email"
              placeholder="Seu e-mail de acesso"
            />
          </Input.Content>
        </Input.Root>
        <Input.Root>
          <Input.Label>Senha</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.Control
              ref={passwordInputRef}
              type="password"
              name="password"
              placeholder="Senha de acesso"
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
        <Input.Root>
          <Input.Label>Confirmar senha</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.Control
              ref={confirmPasswordInputRef}
              type="password"
              name="password"
              placeholder="Confirme a senha"
            />
            <Input.Sufix>
              <button type="button" onClick={handleDisplayConfirmPassword}>
                {confirmPasswordShown ? (
                  <ViewOffIcon className="size-6 text-gray-300" />
                ) : (
                  <ViewIcon className="size-6 text-gray-300" />
                )}

                <span className="sr-only">Show/hide password</span>
              </button>
            </Input.Sufix>
          </Input.Content>
        </Input.Root>
      </fieldset>

      <Button>
        Cadastrar
        <ArrowRight02Icon className="ml-auto size-6 text-white" />
      </Button>
    </form>
  )
}
