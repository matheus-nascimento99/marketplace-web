import { Metadata } from 'next'

import { ProductsFilter } from './products-filter'
import { ProductsList } from './products-list'

export const metadata: Metadata = {
  title: 'Produtos',
}

export default function ProductsPage() {
  return (
    <section className="mx-42 mb-36 mt-16 space-y-10">
      <div className="space-y-2">
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Seus produtos
        </h1>
        <h2 className="text-body-sm text-gray-300">
          Acesse gerencie a sua lista de produtos à venda
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="sticky top-10 max-h-[306px] rounded-card bg-white p-6">
          <h3 className="font-dm-sans text-title-sm text-gray-300">Filtrar</h3>

          <div className="mt-6">
            <ProductsFilter />
          </div>
        </div>
        <ProductsList />
      </div>
    </section>
  )
}
