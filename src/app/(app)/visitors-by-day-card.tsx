import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Calendar04Icon } from '@/ui/icons/calendar-04'

import { VisitorsByDayChart } from './visitors-by-day-chart'

export const VisitorsByDayCard = () => {
  const firstDay = format(subDays(subDays(new Date(), 1), 29), "d 'de' MMMM", {
    locale: ptBR,
  })

  const lastDay = format(subDays(new Date(), 1), "d 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <div className="col-span-3 row-span-3 flex flex-col gap-7 rounded-card bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-dm-sans text-title-sm text-gray-500">Visitantes</h3>

        <div className="flex items-center gap-2">
          <Calendar04Icon className="size-4 text-blue-dark" />
          <span className="align-middle text-label-sm uppercase text-gray-300">
            {firstDay} - {lastDay}
          </span>
        </div>
      </div>

      <VisitorsByDayChart />
    </div>
  )
}
