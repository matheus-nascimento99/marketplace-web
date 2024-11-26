'use client'

import * as Select from '@radix-ui/react-select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

import { Button } from '@/ui/button'
import { ArrowDown01Icon } from '@/ui/icons/arrow-down-01'
import { Cancel01Icon } from '@/ui/icons/cancel-01'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import { Tick02Icon } from '@/ui/icons/tick-02'
import * as Input from '@/ui/input'
import { maskCurrency } from '@/utils/mask-currency'

import { ProductStatusTag } from '../product-status-tag'

export const EditProductForm = () => {
  const router = useRouter()

  const [selectValue, setSelectValue] = useState<string>('')
  const [product, setProduct] = useState<string | null>(null)
  const [price, setPrice] = useState('')

  const handleProductImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    if (files.length === 0) {
      setProduct(null)

      e.target.value = ''
    } else {
      const objectURL = URL.createObjectURL(files[0])

      setProduct(objectURL)
    }
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numbers = value.replace(/\D/g, '')

    if (numbers === '') {
      setPrice('')
    } else {
      const formattedValue = maskCurrency(numbers)
      setPrice(formattedValue)
    }
  }

  const handleClearSelectValue = () => {
    setSelectValue('')
  }

  const handleSelectValueChange = (value: string) => {
    setSelectValue(value)
  }

  return (
    <form className="flex items-start gap-6">
      <div className="h-product-image w-product-image">
        <label
          htmlFor="product"
          className="relative flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-shape"
        >
          {product ? (
            <>
              <div className="absolute flex h-full w-full items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                <ImageUploadIcon className="size-8 text-white" />
              </div>

              <Image
                src={product}
                className="h-full w-full object-contain"
                width={120}
                height={120}
                quality={100}
                alt="Product picture"
              />
            </>
          ) : (
            <ImageUploadIcon className="size-8 text-orange-base" />
          )}
        </label>
        <input
          type="file"
          id="product"
          accept="image/png, image/jpeg, image/jpg"
          className="sr-only"
          onChange={handleProductImageChange}
        />
      </div>
      <div className="flex-1 rounded-card bg-white p-6">
        <fieldset>
          <div className="flex items-center justify-between">
            <legend className="text-title-sm text-gray-300">
              Dados do produto
            </legend>
            <ProductStatusTag status="ANNOUNCED" />
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex gap-5">
              <Input.Root>
                <Input.Label>Título</Input.Label>
                <Input.Content>
                  <Input.ControlInput
                    type="text"
                    name="title"
                    placeholder="Nome do produto"
                    autoFocus={true}
                  />
                </Input.Content>
              </Input.Root>

              <Input.Root>
                <Input.Label>Valor</Input.Label>
                <Input.Content>
                  <Input.Prefix className="text-orange-base group-has-[:placeholder-shown]:text-gray-200">
                    R$
                  </Input.Prefix>
                  <Input.ControlInput
                    type="text"
                    name="price"
                    value={price}
                    placeholder="0,00"
                    onChange={handlePriceChange}
                    className="w-50"
                  />
                </Input.Content>
              </Input.Root>
            </div>

            <Input.Root>
              <Input.Label>Descrição</Input.Label>
              <Input.Content className="mt-3 h-auto">
                <Input.ControlTextArea
                  name="description"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características..."
                  rows={4}
                />
              </Input.Content>
            </Input.Root>

            <Select.Root
              value={selectValue}
              onValueChange={handleSelectValueChange}
            >
              <div>
                <span
                  className="text-label-md uppercase text-gray-300 data-[filled=true]:text-orange-base"
                  data-filled={!!selectValue}
                >
                  Categoria
                </span>
                <div className="relative">
                  <Select.Trigger className="group flex h-12 w-full items-center border-b border-b-gray-100 text-gray-400 outline-none focus:border-b-gray-400 data-[state=open]:border-b-gray-400 data-[placeholder]:text-gray-200">
                    <Select.Value placeholder="Selecione" />

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
                      value="ANNOUNCED"
                      className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
                    >
                      <Select.ItemText>Anunciado</Select.ItemText>
                      <Select.ItemIndicator>
                        <Tick02Icon className="size-6 text-orange-base" />
                      </Select.ItemIndicator>
                    </Select.Item>

                    <Select.Item
                      value="SELLED"
                      className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
                    >
                      <Select.ItemText>Vendido</Select.ItemText>
                      <Select.ItemIndicator>
                        <Tick02Icon className="size-6 text-orange-base" />
                      </Select.ItemIndicator>
                    </Select.Item>

                    <Select.Item
                      value="DEACTIVATED"
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

          <div className="mt-10 flex gap-3">
            <Button
              size="md"
              font="action-md"
              variant="outline"
              onClick={() => router.back()}
              type="button"
            >
              Cancelar
            </Button>
            <Button size="md" font="action-md">
              Salvar e atualizar
            </Button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}
