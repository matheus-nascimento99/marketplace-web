import { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'

import { SignInForm } from './sing-in-form'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function SignIn() {
  return (
    <div className="flex h-full max-h-[768px] flex-col gap-12 rounded-4xl bg-white px-20 py-16">
      <div className="space-y-2">
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Acesse sua conta
        </h1>
        <p className="text-body-sm text-gray-300">
          Informe seu e-mail e senha para entrar
        </p>
      </div>
      <SignInForm />
      <div className="mt-auto flex flex-col gap-5">
        <p className="text-body-md text-gray-300">Ainda não tem uma conta?</p>
        <Link href="/sign-up">
          <button className="group flex h-14 w-full items-center justify-between rounded-xl border border-orange-base bg-transparent p-4 text-action-md text-orange-base transition-colors hover:border-orange-dark">
            <span className="transition-colors group-hover:text-orange-dark">
              Cadastrar
            </span>
            <ArrowRight02Icon className="size-6 text-orange-base transition-colors group-hover:text-orange-dark" />
          </button>
        </Link>
      </div>
    </div>
  )
}
