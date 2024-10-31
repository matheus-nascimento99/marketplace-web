import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'flex items-center justify-center rounded-xl transition-colors',
    'focus:opacity-80',
  ],
  variants: {
    variant: {
      primary:
        'h-14 w-full bg-orange-base px-5 py-4 text-action-md text-white hover:bg-orange-dark',
      outline:
        'group h-14 w-full px-5 py-4 border border-orange-base bg-transparent text-action-md text-orange-base hover:border-orange-dark hover:text-orange-dark',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = ({ variant, ...props }: ButtonProps) => {
  return <button className={button({ variant })} {...props} />
}
