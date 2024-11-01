'use client'

import { ChartHistogramIcon } from '@/ui/icons/chart-histogram'
import { PackageIcon } from '@/ui/icons/package'

import { NavItem } from './nav-item'

export const Navigation = () => {
  return (
    <div className="m-auto flex gap-2">
      <NavItem icon={ChartHistogramIcon} href="/" label="Dashboard" />
      <NavItem icon={PackageIcon} href="/products" label="Produtos" />
    </div>
  )
}
