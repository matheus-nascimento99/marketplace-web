import { Metadata } from 'next'

import { AddProductForm } from './add-product-form'

export const metadata: Metadata = {
  title: 'Novo produto',
}

export default async function NewProduct() {
  return (
    <section className="mx-42 mb-36 mt-16 space-y-10">
      <div className="space-y-2">
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Novo produto
        </h1>
        <h2 className="text-body-sm text-gray-300">
          Cadastre um produto para venda no marketplace
        </h2>
      </div>

      <AddProductForm />
    </section>
  )
}
