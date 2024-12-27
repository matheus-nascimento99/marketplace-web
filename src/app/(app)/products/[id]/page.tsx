import { Metadata } from 'next'
import { Suspense } from 'react'

import { EditProduct } from './edit-product'
import Loading from './loading'
import { getProduct } from './requests/get-product'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const productId = (await params).id

  const product = await getProduct({ productId })

  return {
    title: product.title,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section className="mx-42 mb-36 mt-16 space-y-10">
      <Suspense fallback={<Loading />}>
        <EditProduct productId={id} />
      </Suspense>
    </section>
  )
}
