import Link from 'next/link'

import { ProductStatusTag } from './product-status-tag'
import { ProductTypeTag } from './product-type-tag'

export type ProductCardProps = {
  id: string
  image: string
  name: string
  price: number
  description: string
  status: 'ANNOUNCED' | 'SELLED' | 'DEACTIVATED'
  type:
    | 'TOY'
    | 'FURNITURE'
    | 'STATIONERY'
    | 'HEALTH_AND_BEAUTY'
    | 'UTENSIL'
    | 'CLOTHING'
}

export const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  status,
  type,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <figure className="w-product-card cursor-pointer rounded-card bg-white p-1 hover:ring-2 hover:ring-blue-base">
        <div className="relative">
          <img
            alt="product"
            src={image}
            width={300}
            height={150}
            className="h-36 w-full rounded-product-card object-cover"
          />

          <div className="absolute right-2 top-2 space-x-1">
            <ProductStatusTag status={status} />
            <ProductTypeTag type={type} />
          </div>
        </div>
        <div className="space-y-2 p-3">
          <div className="flex justify-between">
            <h4 className="truncate text-subtitle text-gray-400">{name}</h4>
            <span className="min-w-[50%] text-end align-top text-label-md text-gray-500">
              R${' '}
              <span className="font-dm-sans text-title-sm text-gray-500">
                {price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </span>
          </div>
          <figcaption className="line-clamp-2 text-body-sm text-gray-300">
            {description}
          </figcaption>
        </div>
      </figure>
    </Link>
  )
}
