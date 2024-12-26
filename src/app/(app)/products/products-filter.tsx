'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'

import { Product } from '@/app/dto/product'
import { Button } from '@/ui/button'
import { SaleTag02Icon } from '@/ui/icons/sae-tag-02'
import { Search01Icon } from '@/ui/icons/search-01'
import * as Input from '@/ui/input'
import * as Select from '@/ui/select'

export const ProductsFilter = () => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const status = (searchParams.get('status') as Product['status']) ?? ''

  const [productTitle, setProductTitle] = useState<string>(search)

  const selectHandlersRef = useRef<Select.SelectHandlers>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    params.delete('search')
    params.delete('status')

    if (productTitle) {
      params.set('search', productTitle)
    }

    const selectValue = selectHandlersRef.current?.getState()

    if (selectValue) {
      params.set('status', selectValue)
    }

    router.push(pathname + '?' + params)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <Input.Root>
          <Input.Content>
            <Input.Sufix>
              <Search01Icon className="size-6 text-orange-base group-has-[:placeholder-shown]:text-gray-200" />
            </Input.Sufix>
            <Input.ControlInput
              type="text"
              name="product"
              placeholder="Pesquisar"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </Input.Content>
        </Input.Root>
        <Select.Root
          ref={selectHandlersRef}
          value={status}
          prefixIcon={SaleTag02Icon}
        >
          <Select.Item value="available" title="Anunciado" />
          <Select.Item value="sold" title="Vendido" />
          <Select.Item value="cancelled" title="Desativado" />
        </Select.Root>
      </div>
      <Button font="action-md" className="mt-10 disabled:cursor-not-allowed">
        Aplicar filtro
      </Button>
    </form>
  )
}
