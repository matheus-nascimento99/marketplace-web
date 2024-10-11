import { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'

import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = {
  title: 'Criar conta',
}

export default function SignUp() {
  return (
    <div className="flex h-full flex-col gap-12 rounded-4xl bg-white px-20 py-16">
      <div className="space-y-2">
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Crie sua conta
        </h1>
        <p className="text-body-sm text-gray-300">
          Informe seus dados pessoais e de acesso
        </p>
      </div>

      <SignUpForm />

      <div className="mt-auto flex flex-col gap-5">
        <p className="text-body-md text-gray-300">Já tem uma conta?</p>
        <Link href="/sign-in">
          <button className="group flex h-14 w-full items-center justify-between rounded-xl border border-orange-base bg-transparent p-4 text-action-md text-orange-base transition-colors hover:border-orange-dark">
            <span className="transition-colors group-hover:text-orange-dark">
              Acessar
            </span>
            <ArrowRight02Icon className="size-6 text-orange-base transition-colors group-hover:text-orange-dark" />
          </button>
        </Link>
      </div>
    </div>
  )
}
