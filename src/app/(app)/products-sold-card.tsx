import { SaleTag02Icon } from '@/ui/icons/sae-tag-02'

import { MetricCard } from './card'

export const ProductsSoldCard = () => {
  return (
    <MetricCard icon={SaleTag02Icon} amount={24} label="Produtos vendidos" />
  )
}
