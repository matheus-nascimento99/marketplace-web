'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import { AccessIcon } from '@/ui/icons/access'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { CallIcon } from '@/ui/icons/call'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import { Loading01Icon } from '@/ui/icons/loading-01'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { UserIcon } from '@/ui/icons/user'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import * as Input from '@/ui/input'
import { maskPhone } from '@/utils/mask-phone'

import { signUp } from './actions/sign-up'

export const SignUpForm = () => {
  const router = useRouter()
  const [state, formState, isPending] = useActionState(signUp, {
    success: false,
    message: null,
    payload: null,
    validationErrors: null,
  })

  useEffect(() => {
    if (state.success) {
      toast.success('Cadastro realizado com sucesso!', {
        classNames: {
          actionButton: '!bg-green-700',
        },
        action: {
          label: 'Login',
          onClick: () => router.replace('/sign-in'),
        },
      })
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state, router])

  const [avatar, setAvatar] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

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
    setPasswordShown(!passwordShown)
  }

  const handleDisplayConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown)
  }

  return (
    <form action={formState} className="space-y-12">
      <fieldset className="space-y-5">
        <legend className="font-dm-sans text-title-sm text-gray-500">
          Perfil
        </legend>
        <div className="size-30">
          <label
            htmlFor="avatar"
            className="relative flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-shape"
          >
            {avatar ? (
              <>
                <div className="absolute flex h-full w-full items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                  <ImageUploadIcon className="size-8 text-white" />
                </div>

                <Image
                  src={avatar}
                  className="h-full w-full object-contain"
                  width={120}
                  height={120}
                  quality={100}
                  alt="Avatar picture"
                />
              </>
            ) : (
              <ImageUploadIcon className="size-8 text-orange-base" />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg"
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
            <Input.ControlInput
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
            <Input.ControlInput
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
            <Input.ControlInput
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
            <Input.ControlInput
              type={!passwordShown ? 'password' : 'text'}
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
            <Input.ControlInput
              type={!confirmPasswordShown ? 'password' : 'text'}
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

      <Button disabled={isPending} font="action-md">
        {isPending ? (
          <>
            Carregando...
            <Loading01Icon className="ml-auto size-6 animate-spin text-white" />
          </>
        ) : (
          <>
            Cadastrar
            <ArrowRight02Icon className="ml-auto size-6 text-white" />
          </>
        )}
      </Button>
    </form>
  )
}
