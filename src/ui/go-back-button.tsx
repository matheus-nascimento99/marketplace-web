'use client'

import { useRouter } from 'next/navigation'

import { Button } from './button'
import { ArrowLeft02Icon } from './icons/arrow-left-02'

export const GoBackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant="link"
      size="inset"
      font="action-sm"
      onClick={() => router.back()}
      type="button"
    >
      <ArrowLeft02Icon className="size-5 text-orange-base" />
      Voltar
    </Button>
  )
}
