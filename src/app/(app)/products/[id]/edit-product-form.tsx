'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useActionState, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Product } from '@/app/dto/product'
import { fetchCategories } from '@/categories/fetch-categories'
import { Button } from '@/ui/button'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import * as Input from '@/ui/input'
import * as Select from '@/ui/select'
import { ActionState, DEFAULT_ACTION_STATE } from '@/utils/action-state'
import { maskCurrency } from '@/utils/mask-currency'

import { ProductStatusTag } from '../product-status-tag'
import { editProductAction } from './actions/edit-product'

type EditProductFormProps = {
  product: Product
}

export const EditProductForm = ({ product }: EditProductFormProps) => {
  const { data: categories, error } = useQuery({
    queryKey: ['fetch-categories'],
    queryFn: fetchCategories,
  })

  if (error) toast.error(error.message)

  const selectHandlersRef = useRef<Select.SelectHandlers>(null)

  const router = useRouter()

  const [state, formState, isPending] = useActionState(
    (currentState: ActionState, form: FormData) =>
      editProductAction(product.id, currentState, form),
    DEFAULT_ACTION_STATE,
  )

  const [productTitle, setProductTitle] = useState<string | null>(null)
  const [price, setPrice] = useState(
    !state.success && state.payload && state.payload.priceInCents
      ? state.payload.priceInCents.toString()
      : (product.priceInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
  )

  const handleProductImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    if (files.length === 0) {
      setProductTitle(null)

      e.target.value = ''
    } else {
      const objectURL = URL.createObjectURL(files[0])

      setProductTitle(objectURL)
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

  return (
    <form action={formState} className="flex items-start gap-6">
      <div className="h-product-image w-product-image">
        <>
          <label
            htmlFor="product"
            className="relative flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-shape"
          >
            {productTitle ? (
              <>
                <div className="absolute flex h-full w-full items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                  <ImageUploadIcon className="size-8 text-white" />
                </div>

                <Image
                  src={productTitle}
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
        </>
      </div>
      <div className="flex-1 rounded-card bg-white p-6">
        <fieldset>
          <div className="flex items-center justify-between">
            <legend className="text-title-sm text-gray-300">
              Dados do produto
            </legend>
            <ProductStatusTag status="available" />
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
                    defaultValue={
                      !state.success && state.payload && state.payload.title
                        ? state.payload.title.toString()
                        : product.title
                    }
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
                  defaultValue={
                    !state.success && state.payload && state.payload.description
                      ? state.payload.description.toString()
                      : product.description
                  }
                />
              </Input.Content>
            </Input.Root>

            <Select.Root
              label="Categoria"
              value={product.category.id}
              ref={selectHandlersRef}
              name="categoryId"
            >
              {categories ? (
                categories.map((category) => (
                  <Select.Item
                    key={category.id}
                    value={category.id}
                    title={category.title}
                  />
                ))
              ) : (
                <span className="block px-4 py-3 text-center text-body-sm text-gray-300">
                  Carregando...
                </span>
              )}
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
