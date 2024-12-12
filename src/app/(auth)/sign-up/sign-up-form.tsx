'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import { AccessIcon } from '@/ui/icons/access'
import { AlertCircleIcon } from '@/ui/icons/alert-circle'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'
import { CallIcon } from '@/ui/icons/call'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import { Loading01Icon } from '@/ui/icons/loading-01'
import { Mail02Icon } from '@/ui/icons/mail-02'
import { UserIcon } from '@/ui/icons/user'
import { ViewIcon } from '@/ui/icons/view'
import { ViewOffIcon } from '@/ui/icons/view-off'
import * as Input from '@/ui/input'
import { DEFAULT_ACTION_STATE } from '@/utils/action-state'
import { maskPhone } from '@/utils/mask-phone'

import { signUpAction } from './actions/sign-up'

export const SignUpForm = () => {
  const router = useRouter()

  const [state, formState, isPending] = useActionState(
    signUpAction,
    DEFAULT_ACTION_STATE,
  )

  const [avatar, setAvatar] = useState<string | null>(null)
  const [phone, setPhone] = useState(
    !state.success && state.payload && state.payload.phone
      ? state.payload.phone.toString()
      : '',
  )
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  useEffect(() => {
    if (state.success) {
      if (!state.payload) return

      const email = state.payload.email

      setAvatar('')
      setPhone('')

      toast.success('Cadastro realizado com sucesso!', {
        classNames: {
          actionButton: '!bg-green-700',
        },
        action: {
          label: 'Login',
          onClick: () => router.replace(`/sign-in?email=${email}`),
        },
      })
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state, router])

  const handleProfileAvatarChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files

    if (!files) return

    if (files.length > 0) {
      const objectURL = URL.createObjectURL(files[0])

      setAvatar(objectURL)
    } else {
      setAvatar('')
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
        <div>
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
              name="file"
              onChange={handleProfileAvatarChange}
              data-invalid={
                state.field_errors && Object.hasOwn(state.field_errors, 'file')
              }
            />
          </div>
          <div>
            {state.field_errors &&
              state.field_errors.file &&
              state.field_errors.file.map((error, index) => (
                <Input.Error key={index}>
                  <AlertCircleIcon className="size-4 text-danger" />
                  {error}
                </Input.Error>
              ))}
          </div>
        </div>
        <Input.Root
          defaultValue={
            !state.success && state.payload && state.payload.name
              ? state.payload.name.toString()
              : ''
          }
        >
          <Input.Label>Nome</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <UserIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              type="text"
              name="name"
              defaultValue={
                !state.success && state.payload && state.payload.name
                  ? state.payload.name.toString()
                  : ''
              }
              placeholder="Seu nome completo"
            />
          </Input.Content>
          {state.field_errors &&
            state.field_errors.name &&
            state.field_errors.name.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </Input.Root>
        <Input.Root
          data-invalid={
            state.field_errors && Object.hasOwn(state.field_errors, 'phone')
          }
        >
          <Input.Label>Telefone</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <CallIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              type="tel"
              name="phone"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={handlePhoneChange}
            />
          </Input.Content>
          {state.field_errors &&
            state.field_errors.phone &&
            state.field_errors.phone.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </Input.Root>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-dm-sans text-title-sm text-gray-500">
          Acesso
        </legend>
        <Input.Root
          data-invalid={
            state.field_errors && Object.hasOwn(state.field_errors, 'email')
          }
        >
          <Input.Label>E-mail</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <Mail02Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              type="text"
              name="email"
              defaultValue={
                !state.success && state.payload && state.payload.email
                  ? state.payload.email.toString()
                  : ''
              }
              placeholder="Seu e-mail de acesso"
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
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              type={!passwordShown ? 'password' : 'text'}
              defaultValue={
                !state.success && state.payload && state.payload.password
                  ? state.payload.password.toString()
                  : ''
              }
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
          {state.field_errors &&
            state.field_errors.password &&
            state.field_errors.password.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </Input.Root>
        <Input.Root
          data-invalid={
            state.field_errors &&
            Object.hasOwn(state.field_errors, 'passwordConfirmation')
          }
        >
          <Input.Label>Confirmar senha</Input.Label>
          <Input.Content>
            <Input.Prefix>
              <AccessIcon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Prefix>
            <Input.ControlInput
              type={!confirmPasswordShown ? 'password' : 'text'}
              name="passwordConfirmation"
              placeholder="Confirme a senha"
              defaultValue={
                !state.success &&
                state.payload &&
                state.payload.passwordConfirmation
                  ? state.payload.passwordConfirmation.toString()
                  : ''
              }
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
          {state.field_errors &&
            state.field_errors.passwordConfirmation &&
            state.field_errors.passwordConfirmation.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
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
