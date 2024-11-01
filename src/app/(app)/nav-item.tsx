'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType } from 'react'

import { Button } from '@/ui/button'

type NavItemProps = {
  icon: ElementType
  label: string
  href: string
}

export const NavItem = ({ icon: Icon, label, href }: NavItemProps) => {
  const path = usePathname()
  const isActive = path === href

  return (
    <Link href={href}>
      <Button type="button" data-active={isActive} variant="ghost" size="sm">
        <Icon className="size-5 text-gray-300 transition-colors group-hover:text-orange-base group-data-[active=true]:text-orange-base" />
        {label}
      </Button>
    </Link>
  )
}
