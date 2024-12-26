'use client'

import * as Select from '@radix-ui/react-select'
import { ElementType, RefObject, useImperativeHandle, useState } from 'react'

import { Button } from './button'
import { ArrowDown01Icon } from './icons/arrow-down-01'
import { Cancel01Icon } from './icons/cancel-01'
import { Tick02Icon } from './icons/tick-02'

export type SelectHandlers = {
  getState: () => string
  resetState: () => void
}

type SelectRootProps = Select.SelectProps & {
  label?: string
  prefixIcon?: ElementType
  placeholder?: string
  name?: string
  ref: RefObject<SelectHandlers>
}

export const Root = ({
  label,
  children,
  value,
  prefixIcon: PrefixIcon,
  placeholder = 'Selecione...',
  name,
  ref,
  ...props
}: SelectRootProps) => {
  const [selectValue, setSelectValue] = useState<string>(value ?? '')

  const handleClearSelectValue = () => {
    setSelectValue('')
  }

  const handleSelectValueChange = (value: string) => {
    setSelectValue(value)
  }

  useImperativeHandle(
    ref,
    () => ({
      getState() {
        return selectValue
      },
      resetState() {
        setSelectValue('')
      },
    }),
    [selectValue],
  )

  return (
    <Select.Root
      value={selectValue}
      onValueChange={handleSelectValueChange}
      {...props}
    >
      <div>
        {label && (
          <span
            className="text-label-md uppercase text-gray-300 data-[filled=true]:text-orange-base"
            data-filled={!!selectValue}
          >
            {label}
          </span>
        )}
        <div className="relative">
          <Select.Trigger className="group flex h-12 w-full items-center border-b border-b-gray-100 text-gray-400 outline-none focus:border-b-gray-400 data-[state=open]:border-b-gray-400 data-[placeholder]:text-gray-200">
            {PrefixIcon && (
              <Select.Icon>
                <PrefixIcon className="mr-2 size-6 text-gray-200 text-orange-base group-focus:text-orange-base group-data-[placeholder]:text-gray-200 group-data-[state=open]:text-orange-base" />
              </Select.Icon>
            )}
            <Select.Value placeholder={placeholder} />

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
        {name && <input type="hidden" name={name} value={selectValue} />}
      </div>
      <Select.Portal>
        <Select.Content
          className="max-h-[--radix-select-content-available-height] w-[--radix-select-trigger-width] animate-slide rounded-lg bg-white text-body-sm text-gray-300 drop-shadow"
          position="popper"
          side="bottom"
          sideOffset={4}
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

type SelectItemProps = Select.SelectItemProps & {
  title: string
}

export const Item = ({ title, ...props }: SelectItemProps) => {
  return (
    <Select.Item
      className="flex justify-between px-4 py-3 hover:cursor-pointer hover:text-orange-dark hover:outline-none data-[state=checked]:text-orange-base"
      {...props}
    >
      <Select.ItemText>{title}</Select.ItemText>
      <Select.ItemIndicator>
        <Tick02Icon className="size-6 text-orange-base" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
