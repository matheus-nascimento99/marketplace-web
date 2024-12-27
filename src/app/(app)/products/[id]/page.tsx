import { Metadata } from 'next'
import { Suspense } from 'react'

import { EditProduct } from './edit-product'
import Loading from './loading'

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
      <Suspense fallback={<Loading />}>
        <EditProduct productId={id} />
      </Suspense>
    </section>
  )
}
