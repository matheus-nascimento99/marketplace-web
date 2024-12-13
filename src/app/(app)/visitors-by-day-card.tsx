'use client'

import { useQuery } from '@tanstack/react-query'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import { Calendar04Icon } from '@/ui/icons/calendar-04'
import { Skeleton } from '@/ui/skeleton'

import { getMonthlyViews } from './requests/get-monthly-views'
import { VisitorsByDayChart } from './visitors-by-day-chart'

export const VisitorsByDayCard = () => {
  const { data: views, error } = useQuery({
    queryKey: ['get-monthly-views-per-day'],
    queryFn: getMonthlyViews,
  })

  if (error) toast.error(error.message)

  const viewsPerDay = views?.viewsPerDay

  const firstDay = format(subDays(subDays(new Date(), 1), 29), "d 'de' MMMM", {
    locale: ptBR,
  })

  const lastDay = format(new Date(), "d 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <>
      {viewsPerDay ? (
        <div className="col-span-3 row-span-3 flex flex-col gap-7 rounded-card bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-dm-sans text-title-sm text-gray-500">
              Visitantes
            </h3>

            <div className="flex items-center gap-2">
              <Calendar04Icon className="size-4 text-blue-dark" />
              <span className="align-middle text-label-sm uppercase text-gray-300">
                {firstDay} - {lastDay}
              </span>
            </div>
          </div>

          <VisitorsByDayChart views={viewsPerDay} />
        </div>
      ) : (
        <Skeleton className="h-88 col-span-3 row-span-3 rounded-card" />
      )}
    </>
  )
}
