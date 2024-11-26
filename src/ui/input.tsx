import { ComponentProps, createContext, useContext, useId } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputContextProps {
  id: string
}

const InputContext = createContext({} as InputContextProps)

export const Root = (
  { children }: { children: React.ReactNode },
  props: ComponentProps<'div'>,
) => {
  const id = useId()

  return (
    <InputContext.Provider value={{ id }}>
      <div className="group flex flex-col" {...props}>
        {children}
      </div>
    </InputContext.Provider>
  )
}

const useControlId = () => useContext(InputContext)

export const Label = (props: ComponentProps<'label'>) => {
  const { id } = useControlId()

  return (
    <label
      htmlFor={id}
      className="text-label-md uppercase text-gray-300 group-focus-within:text-orange-base"
      {...props}
    />
  )
}

export const Content = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge(
        'flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400',
        className,
      )}
      {...props}
    />
  )
}

export const Prefix = (props: ComponentProps<'div'>) => {
  return <div {...props} />
}

export const ControlInput = ({
  className,
  ...props
}: ComponentProps<'input'>) => {
  const { id } = useControlId()
  return (
    <input
      id={id}
      className={twMerge(
        'w-full text-body-md text-gray-400 placeholder:text-gray-200 focus:caret-orange-base focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export const ControlTextArea = ({
  className,
  ...props
}: ComponentProps<'textarea'>) => {
  const { id } = useControlId()
  return (
    <textarea
      id={id}
      className={twMerge(
        'w-full resize-none text-body-md text-gray-400 placeholder:text-gray-200 focus:caret-orange-base focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export const Sufix = (props: ComponentProps<'div'>) => {
  return <div {...props} />
}
