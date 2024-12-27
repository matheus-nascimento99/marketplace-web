import { GoBackButton } from '@/ui/go-back-button'

import { EditProductForm } from './edit-product-form'
import { EditProductStatusActions } from './edit-product-status-actions'
import { getProduct } from './requests/get-product'

type EditProductProps = {
  productId: string
}

export const EditProduct = async ({ productId }: EditProductProps) => {
  const product = await getProduct({ productId })

  return (
    <>
      <div className="space-y-2">
        <GoBackButton />
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Editar produto
        </h1>
        <div className="flex justify-between">
          <h2 className="text-body-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </h2>

          <EditProductStatusActions product={product} />
        </div>
      </div>
      <EditProductForm product={product} />
    </>
  )
}
