import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge('flex w-full animate-pulse bg-gray-100', className)}
      {...props}
    />
  )
}
