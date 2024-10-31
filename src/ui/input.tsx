import { ComponentProps, createContext, useContext, useId } from 'react'

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

const useInputId = () => useContext(InputContext)

export const Label = (props: ComponentProps<'label'>) => {
  const { id } = useInputId()

  return (
    <label
      htmlFor={id}
      className="text-label-md uppercase text-gray-300 group-focus-within:text-orange-base"
      {...props}
    />
  )
}

export const Content = (props: ComponentProps<'div'>) => {
  return (
    <div
      className="flex h-12 items-center gap-2 border-b border-b-gray-100 focus-within:border-b-gray-400"
      {...props}
    />
  )
}

export const Prefix = (props: ComponentProps<'div'>) => {
  return <div {...props} />
}

export const Control = (props: ComponentProps<'input'>) => {
  const { id } = useInputId()
  return (
    <input
      id={id}
      className="w-full text-body-md placeholder:text-gray-200 focus:caret-orange-base focus:outline-none"
      {...props}
    />
  )
}

export const Sufix = (props: ComponentProps<'div'>) => {
  return <div {...props} />
}
