import { randomUUID } from 'crypto'
import { Metadata } from 'next'

import { ProductCard } from './product-card'
import { ProductsFilter } from './products-filter'

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
        <div className="max-h-[306px] rounded-card bg-white p-6">
          <h3 className="font-dm-sans text-title-sm text-gray-300">Filtrar</h3>

          <div className="mt-6">
            <ProductsFilter />
          </div>
        </div>
        <div className="col-span-2 flex flex-wrap gap-4">
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Irure elit id eu nisi duis enim sunt. Dolore esse ut et eu irure pariatur esse. Officia cillum mollit voluptate ea ex quis. Velit aute id veniam veniam ea anim proident dolor Lorem aliquip ad adipisicing. In excepteur pariatur ut et nostrud laborum officia ea velit culpa ex aute magna."
            name="Reprehenderit ut cillum laborum ex voluptate dolore fugiat enim nisi deserunt."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Quis enim aute commodo est minim in consequat laboris. Adipisicing commodo minim laboris ad. Laboris consequat proident qui ut excepteur sunt aute tempor sunt officia voluptate dolore adipisicing. Velit reprehenderit irure nostrud reprehenderit nostrud anim nulla elit excepteur dolore aliquip tempor. Laboris cupidatat non do quis ex anim. Magna incididunt commodo nostrud laborum cillum aliquip ut nulla reprehenderit nisi nulla."
            name="Cillum occaecat incididunt ex veniam aute excepteur."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Qui veniam reprehenderit id voluptate esse reprehenderit dolore veniam dolore voluptate ad. Quis ex dolore pariatur tempor Lorem magna qui nisi sunt do Lorem excepteur quis. Duis Lorem officia Lorem laboris irure aliquip Lorem officia. Velit eiusmod velit occaecat commodo irure ipsum cupidatat excepteur do deserunt proident fugiat reprehenderit. Commodo laborum labore ex aute commodo exercitation aute nulla et ipsum nulla eiusmod."
            name="Ad laborum dolor consectetur ex sunt aliqua non."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Ipsum ut velit cupidatat aute nostrud reprehenderit ad consectetur eu in ex ad deserunt. Nisi officia deserunt ex ut est officia nulla excepteur irure ut laborum reprehenderit qui. Ad eiusmod laboris ullamco nulla. Velit qui cupidatat incididunt elit duis esse nulla. Tempor ea sint Lorem est ex voluptate tempor laborum consectetur ipsum eu aliquip est excepteur."
            name="Sunt officia et excepteur Lorem nisi ex adipisicing ad et aute."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Est elit proident duis eiusmod dolore in est Lorem aliqua laboris cupidatat tempor anim. Incididunt fugiat anim dolore consectetur ipsum incididunt laborum consectetur. Ut ea consequat qui minim consequat exercitation consectetur Lorem do ut."
            name="Pariatur excepteur laboris aliquip ut Lorem ut."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Commodo sunt ut officia incididunt id ad. Velit consequat voluptate eu ipsum aute proident. Ex ex est pariatur elit ea tempor ullamco ut. Lorem sit labore velit ea labore laborum veniam pariatur qui aliqua anim. Commodo exercitation velit amet minim in commodo mollit nisi cupidatat. Velit fugiat adipisicing proident magna esse veniam pariatur laborum occaecat."
            name="Minim tempor ut occaecat eu commodo est proident."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Culpa pariatur eu fugiat commodo eiusmod nisi. Do in anim non et nisi commodo culpa qui velit proident elit. Aliquip nisi adipisicing velit exercitation ea labore enim culpa veniam."
            name="Voluptate sint cillum consequat Lorem eiusmod id quis adipisicing sunt eu incididunt tempor."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Cillum est ad exercitation ad excepteur in officia exercitation. Reprehenderit ullamco nulla laboris velit sint reprehenderit ad exercitation sunt deserunt et. Excepteur labore do commodo consequat aliqua labore aliquip aliqua est aliquip veniam qui quis consequat. Ullamco esse laborum ipsum aute incididunt quis in consectetur est elit aliquip ullamco consectetur eu. Ad ipsum sunt pariatur magna eu labore. Duis eiusmod magna ipsum ipsum deserunt culpa. Ex do veniam deserunt fugiat velit do fugiat dolor."
            name="Dolor incididunt reprehenderit elit minim sint sint dolor eiusmod non ex irure sint."
            price={1200.0}
          />
          <ProductCard
            status="ANNOUNCED"
            type="FURNITURE"
            id={randomUUID()}
            image="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            description="Quis labore enim adipisicing duis aliquip consectetur adipisicing tempor ex ex. Consequat sint nisi in esse culpa labore amet. Ea reprehenderit minim aliquip mollit non eiusmod laboris. Laborum et quis id veniam anim. Laborum do in sint culpa velit do mollit reprehenderit consequat ut."
            name="Exercitation amet est commodo proident ex aliquip ullamco eu officia ullamco elit et."
            price={1200.0}
          />
        </div>
      </div>
    </section>
  )
}
