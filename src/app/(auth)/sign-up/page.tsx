import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/ui/button'
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
          <Button variant="outline" type="button">
            Acessar
            <ArrowRight02Icon className="ml-auto size-6 text-orange-base transition-colors group-hover:text-orange-dark" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
