'use client'

import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { UserMultipleIcon } from '@/ui/icons/user-multiple'

import { GetMonthlyViewsResponse } from './requests/get-monthly-views'

interface DataPoint {
  date: string
  amount: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    payload: DataPoint
  }>
  label?: string
}

type VisitorsByDayChartProps = {
  views: GetMonthlyViewsResponse['viewsPerDay']
}

export const VisitorsByDayChart = ({ views }: VisitorsByDayChartProps) => {
  const formatXAxis = (dateStr: string): string => {
    const date = new Date(dateStr)
    return String(date.getDate())
  }

  const formatTooltipLabel = (dateStr: string): string => {
    const date = new Date(dateStr)
    const months: string[] = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ]

    return `${date.getDate()} de ${months[date.getMonth()]}`
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col gap-2 rounded-lg bg-white p-3 drop-shadow">
          <span className="text-label-sm uppercase text-gray-400">
            {label ? formatTooltipLabel(label) : ''}
          </span>
          <div className="flex gap-2 text-body-xs text-gray-300">
            <UserMultipleIcon className="size-4 text-gray-300" />{' '}
            {payload[0].value} visitantes
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%" className="text-body-xs">
      <LineChart
        data={views}
        margin={{ top: 20, right: 8, left: -20, bottom: 20 }}
      >
        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="var(--gray-200)"
          strokeWidth={1}
          strokeDasharray="6 8"
          opacity="0.2"
        />
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          interval={0}
          tickLine={false}
          axisLine={false}
          dy={28}
          tick={{ fill: 'var(--gray-200)' }}
        />
        <YAxis
          domain={[0, 150]}
          ticks={[0, 50, 100, 150]}
          tickLine={false}
          axisLine={false}
          dx={-12}
          tick={{ fill: 'var(--gray-200)' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="var(--blue-base)"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default VisitorsByDayChart
