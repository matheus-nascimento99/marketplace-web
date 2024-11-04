import { UserMultipleIcon } from '@/ui/icons/user-multiple'

import { MetricCard } from './card'

export const VisitorsCard = () => {
  return (
    <MetricCard
      icon={UserMultipleIcon}
      amount={1238}
      label="Pessoas visitantes"
    />
  )
}
