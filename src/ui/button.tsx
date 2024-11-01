import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'flex items-center justify-center rounded-xl transition-colors',
    'disabled:opacity-80 disabled:cursor-wait',
  ],
  variants: {
    variant: {
      primary: 'bg-orange-base text-action-md text-white hover:bg-orange-dark',
      outline:
        'group border border-orange-base bg-transparent text-action-md text-orange-base hover:border-orange-dark hover:text-orange-dark',
      ghost:
        'group text-gray-300 hover:text-orange-base data-[active=true]:bg-shape data-[active=true]:text-orange-base',
    },
    size: {
      default: 'h-14 w-full px-5 py-4',
      sm: 'h-10 gap-2 px-4 py-2.5',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = ({ variant, size, ...props }: ButtonProps) => {
  return <button className={button({ variant, size })} {...props} />
}
