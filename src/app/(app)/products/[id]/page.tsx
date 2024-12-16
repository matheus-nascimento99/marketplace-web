import { Metadata } from 'next'

import { Button } from '@/ui/button'
import { GoBackButton } from '@/ui/go-back-button'
import { Tick02Icon } from '@/ui/icons/tick-02'
import { UnavailableIcon } from '@/ui/icons/unavailable'

import { EditProductForm } from './edit-product-form'

export const metadata: Metadata = {
  title: 'Título do produto',
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section className="mx-42 mb-36 mt-16 space-y-10">
      <div className="space-y-2">
        <GoBackButton />
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Editar produto
        </h1>
        <div className="flex justify-between">
          <h2 className="text-body-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </h2>

          <div className="flex gap-4">
            <Button variant="link" size="inset" font="action-sm" type="button">
              <Tick02Icon className="size-5 text-orange-base" />
              Marcar como vendido
            </Button>
            <Button variant="link" size="inset" font="action-sm" type="button">
              <UnavailableIcon className="size-5 text-orange-base" />
              Desativar anúncio
            </Button>
          </div>
        </div>
      </div>

      <EditProductForm productId={id} />
    </section>
  )
}
