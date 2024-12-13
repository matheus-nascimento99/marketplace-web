import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'flex items-center justify-center rounded-xl transition-colors',
    'disabled:opacity-80',
  ],
  variants: {
    variant: {
      primary: 'bg-orange-base text-white hover:bg-orange-dark',
      outline: [
        'group border border-orange-base bg-transparent text-orange-base',
        'hover:border-orange-dark hover:text-orange-dark',
      ],
      nav: [
        'group text-gray-300 hover:text-orange-base',
        'data-[active=true]:bg-shape data-[active=true]:text-orange-base',
      ],
      ghost: 'text-gray-300 bg-shape',
      link: 'text-orange-base gap-2',
    },
    size: {
      default: 'h-14 w-full px-5 py-4',
      md: 'h-12 w-full',
      sm: 'h-10 gap-2 px-4 py-2.5',
      inset: 'h-auto w-auto',
    },
    font: {
      'action-md': '!text-action-md',
      'action-sm': '!text-action-sm',
      'body-sm': '!text-body-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = ({
  className,
  variant,
  size,
  font,
  ...props
}: ButtonProps) => {
  return (
    <button className={button({ variant, font, size, className })} {...props} />
  )
}
