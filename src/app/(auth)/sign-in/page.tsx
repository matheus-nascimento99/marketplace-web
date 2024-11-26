import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/ui/button'
import { ArrowRight02Icon } from '@/ui/icons/arrow-right-02'

import { SignInForm } from './sing-in-form'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function SignInPage() {
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
          <Button variant="outline" type="button" font="action-md">
            Cadastrar
            <ArrowRight02Icon className="ml-auto size-6 text-orange-base transition-colors group-hover:text-orange-dark" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
