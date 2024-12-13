import Link from 'next/link'

import { Product } from '@/app/dto/product'

import { ProductStatusTag } from './product-status-tag'
import { ProductTypeTag } from './product-type-tag'

export type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <figure className="w-product-card cursor-pointer rounded-card bg-white p-1 hover:ring-2 hover:ring-blue-base">
        <div className="relative">
          <img
            alt="product"
            src={product.attachments[0].url}
            width={300}
            height={150}
            className="h-36 w-full rounded-product-card object-cover"
          />

          <div className="absolute right-2 top-2 space-x-1">
            <ProductStatusTag status={product.status} />
            <ProductTypeTag category={product.category} />
          </div>
        </div>
        <div className="space-y-2 p-3">
          <div className="flex justify-between">
            <h4 className="truncate text-subtitle text-gray-400">
              {product.title}
            </h4>
            <span className="min-w-[50%] text-end align-top text-label-md text-gray-500">
              R${' '}
              <span className="font-dm-sans text-title-sm text-gray-500">
                {(product.priceInCents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </span>
          </div>
          <figcaption className="line-clamp-2 text-body-sm text-gray-300">
            {product.description}
          </figcaption>
        </div>
      </figure>
    </Link>
  )
}
