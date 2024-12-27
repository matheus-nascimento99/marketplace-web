'use client'

import { toast } from 'sonner'

import { Product } from '@/app/dto/product'
import { Button } from '@/ui/button'
import { Tick02Icon } from '@/ui/icons/tick-02'
import { UnavailableIcon } from '@/ui/icons/unavailable'

import { changeProductStatusAction } from './actions/change-status'

export type EditProductStatusActionsProps = {
  product: Product
}

export const EditProductStatusActions = ({
  product,
}: EditProductStatusActionsProps) => {
  const handleChangeProductStatus = async (status: Product['status']) => {
    const result = await changeProductStatusAction(product.id, status)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="link"
        size="inset"
        font="action-sm"
        type="button"
        disabled={product.status === 'cancelled'}
        onClick={async () =>
          await handleChangeProductStatus(
            product.status === 'available' ? 'sold' : 'available',
          )
        }
      >
        <Tick02Icon className="size-5 text-orange-base" />
        {product.status === 'available'
          ? 'Marcar como vendido'
          : product.status === 'sold'
            ? 'Marcar como disponível'
            : 'Produto desabilitado'}
      </Button>
      <Button
        variant="link"
        size="inset"
        font="action-sm"
        type="button"
        disabled={product.status === 'sold'}
        onClick={async () =>
          await handleChangeProductStatus(
            product.status === 'cancelled' ? 'available' : 'cancelled',
          )
        }
      >
        <UnavailableIcon className="size-5 text-orange-base" />
        {product.status === 'cancelled'
          ? 'Reativar anúncio'
          : product.status === 'sold'
            ? 'Produto vendido'
            : 'Desativar anúncio'}
      </Button>
    </div>
  )
}
