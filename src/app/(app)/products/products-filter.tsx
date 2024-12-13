'use client'

import * as Select from '@radix-ui/react-select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Product } from '@/app/dto/product'
import { Button } from '@/ui/button'
import { ArrowDown01Icon } from '@/ui/icons/arrow-down-01'
import { Cancel01Icon } from '@/ui/icons/cancel-01'
import { SaleTag02Icon } from '@/ui/icons/sae-tag-02'
import { Search01Icon } from '@/ui/icons/search-01'
import { Tick02Icon } from '@/ui/icons/tick-02'
import * as Input from '@/ui/input'

export const ProductsFilter = () => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const status = (searchParams.get('status') as Product['status']) ?? ''

  const [productTitle, setProductTitle] = useState<string>(search)
  const [selectValue, setSelectValue] = useState<string>(status)

  const handleClearSelectValue = () => {
    setSelectValue('')
  }

  const handleSelectValueChange = (value: string) => {
    setSelectValue(value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    params.delete('search')
    params.delete('status')

    if (productTitle) {
      params.set('search', productTitle)
    }

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
          value={selectValue}
          onValueChange={handleSelectValueChange}
        >
          <div className="relative">
            <Select.Trigger className="group flex h-12 w-full items-center border-b border-b-gray-100 text-gray-400 outline-none focus:border-b-gray-400 data-[state=open]:border-b-gray-400 data-[placeholder]:text-gray-200">
              <Select.Icon>
                <SaleTag02Icon className="mr-2 size-6 text-gray-200 text-orange-base group-focus:text-orange-base group-data-[placeholder]:text-gray-200 group-data-[state=open]:text-orange-base" />
              </Select.Icon>
              <Select.Value placeholder="Status" />

              <Select.Icon className="ml-auto">
                <ArrowDown01Icon className="size-6 text-gray-300 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Select.Icon>
            </Select.Trigger>

            {selectValue && (
              <Button
                className="absolute bottom-0 right-8 top-4 size-4 rounded-full p-1"
                variant="ghost"
                size="inset"
                onClick={handleClearSelectValue}
              >
                <Cancel01Icon className="size-4 text-gray-300" />
              </Button>
            )}
          </div>
          <Select.Portal>
            <Select.Content
              className="max-h-[--radix-select-content-available-height] w-[--radix-select-trigger-width] animate-slide rounded-lg bg-white text-body-sm text-gray-300 drop-shadow"
              position="popper"
              side="bottom"
              sideOffset={4}
            >
              <Select.Viewport>
                <Select.Item
                  value="available"
                  className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
                >
                  <Select.ItemText>Anunciado</Select.ItemText>
                  <Select.ItemIndicator>
                    <Tick02Icon className="size-6 text-orange-base" />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item
                  value="sold"
                  className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
                >
                  <Select.ItemText>Vendido</Select.ItemText>
                  <Select.ItemIndicator>
                    <Tick02Icon className="size-6 text-orange-base" />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item
                  value="cancelled"
                  className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
                >
                  <Select.ItemText>Desativado</Select.ItemText>
                  <Select.ItemIndicator>
                    <Tick02Icon className="size-6 text-orange-base" />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <Button font="action-md" className="mt-10 disabled:cursor-not-allowed">
        Aplicar filtro
      </Button>
    </form>
  )
}
