'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { uploadAttachmentsAction } from '@/attachments/upload-attachments-action'
import { fetchCategories } from '@/categories/fetch-categories'
import { Button } from '@/ui/button'
import { AlertCircleIcon } from '@/ui/icons/alert-circle'
import { ImageUploadIcon } from '@/ui/icons/image-upload'
import * as Input from '@/ui/input'
import * as Select from '@/ui/select'
import { DEFAULT_ACTION_STATE } from '@/utils/action-state'
import { maskCurrency } from '@/utils/mask-currency'

import { createProductAction } from './actions/create-product'

export const AddProductForm = () => {
  const { data: categories, error } = useQuery({
    queryKey: ['fetch-categories'],
    queryFn: fetchCategories,
  })

  if (error) toast.error(error.message)

  const selectHandlersRef = useRef<Select.SelectHandlers>(null)

  const router = useRouter()

  const [state, formState, isPending] = useActionState(
    createProductAction,
    DEFAULT_ACTION_STATE,
  )

  useEffect(() => {
    if (state.success) {
      setPrice('')
      setProduct('')
      setAttachmentId('')
      selectHandlersRef.current?.resetState()

      toast.success('Cadastro realizado com sucesso!', {
        classNames: {
          actionButton: '!bg-green-700',
        },
      })
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  const [product, setProduct] = useState<string | null>(null)
  const [price, setPrice] = useState(
    !state.success && state.payload && state.payload.priceInCents
      ? state.payload.priceInCents.toString()
      : '',
  )
  const [attachmentId, setAttachmentId] = useState(
    !state.success && state.payload && state.payload.attachmentId
      ? state.payload.attachmentId.toString()
      : '',
  )

  const handleProductImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    if (files.length === 0) {
      setProduct(null)
      setAttachmentId('')

      e.target.value = ''
    } else {
      const objectURL = URL.createObjectURL(files[0])

      setProduct(objectURL)

      const result = await uploadAttachmentsAction({ file: files[0] })

      if (result.attachmentId) {
        setAttachmentId(result.attachmentId)
      }
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
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          className="sr-only"
          onChange={handleProductImageChange}
        />
        <input type="hidden" name="attachmentId" value={attachmentId} />
        <div>
          {state.field_errors &&
            state.field_errors.attachmentId &&
            state.field_errors.attachmentId.map((error, index) => (
              <Input.Error key={index}>
                <AlertCircleIcon className="size-4 text-danger" />
                {error}
              </Input.Error>
            ))}
        </div>
      </div>
      <div className="flex-1 rounded-card bg-white p-6">
        <fieldset>
          <div className="flex items-center justify-between">
            <legend className="text-title-sm text-gray-300">
              Dados do produto
            </legend>
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
                    defaultValue={
                      !state.success && state.payload && state.payload.title
                        ? state.payload.title.toString()
                        : ''
                    }
                  />
                </Input.Content>
                {state.field_errors &&
                  state.field_errors.title &&
                  state.field_errors.title.map((error, index) => (
                    <Input.Error key={index}>
                      <AlertCircleIcon className="size-4 text-danger" />
                      {error}
                    </Input.Error>
                  ))}
              </Input.Root>

              <Input.Root>
                <Input.Label>Valor</Input.Label>
                <Input.Content>
                  <Input.Prefix className="text-orange-base group-has-[:placeholder-shown]:text-gray-200">
                    R$
                  </Input.Prefix>
                  <Input.ControlInput
                    type="text"
                    name="priceInCents"
                    value={price}
                    placeholder="0,00"
                    onChange={handlePriceChange}
                    className="w-50"
                  />
                </Input.Content>
                {state.field_errors &&
                  state.field_errors.priceInCents &&
                  state.field_errors.priceInCents.map((error, index) => (
                    <Input.Error key={index}>
                      <AlertCircleIcon className="size-4 text-danger" />
                      {error}
                    </Input.Error>
                  ))}
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
                      : ''
                  }
                />
              </Input.Content>
              {state.field_errors &&
                state.field_errors.description &&
                state.field_errors.description.map((error, index) => (
                  <Input.Error key={index}>
                    <AlertCircleIcon className="size-4 text-danger" />
                    {error}
                  </Input.Error>
                ))}
            </Input.Root>

            <div>
              <Select.Root
                label="Categoria"
                ref={selectHandlersRef}
                name="categoryId"
                value={
                  !state.success && state.payload && state.payload.categoryId
                    ? state.payload.categoryId.toString()
                    : ''
                }
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
              {state.field_errors &&
                state.field_errors.categoryId &&
                state.field_errors.categoryId.map((error, index) => (
                  <Input.Error key={index}>
                    <AlertCircleIcon className="size-4 text-danger" />
                    {error}
                  </Input.Error>
                ))}
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <Button
              size="md"
              font="action-md"
              variant="outline"
              onClick={() => router.back()}
              type="button"
              disabled={isPending}
              className="disabled:cursor-not-allowed"
            >
              Cancelar
            </Button>
            <Button
              disabled={isPending}
              size="md"
              font="action-md"
              className="disabled:cursor-wait"
            >
              {isPending ? <>Carregando...</> : <>Salvar</>}
            </Button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}
