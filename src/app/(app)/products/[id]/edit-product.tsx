import { EditProductForm } from './edit-product-form'
import { getProduct } from './requests/get-product'

type EditProductProps = {
  productId: string
}

export const EditProduct = async ({ productId }: EditProductProps) => {
  const product = await getProduct({ productId })

  return <EditProductForm product={product} />
}
