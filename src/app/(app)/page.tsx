import { AdvertisedProductsCard } from './advertised-products-card'
import { ProductsSoldCard } from './products-sold-card'
import { VisitorsCard } from './visitors-card'

export default function HomePage() {
  return (
    <section className="mx-42 mt-16 space-y-10">
      <div className="space-y-2">
        <h1 className="font-dm-sans text-title-md text-gray-500">
          Últimos 30 dias
        </h1>
        <h2 className="text-body-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </h2>
      </div>
      <div className="grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-4">
        <ProductsSoldCard />

        <div className="col-span-3 row-span-3"></div>

        <AdvertisedProductsCard />

        <VisitorsCard />
      </div>
    </section>
  )
}
