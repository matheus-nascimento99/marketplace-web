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

interface DataPoint {
  date: string
  value: number
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

export const VisitorsByDayChart: React.FC = () => {
  const generateLast30Days = (): DataPoint[] => {
    const data: DataPoint[] = []
    const today = new Date()

    // Set endDate to the day before today
    const endDate = new Date(today)
    endDate.setDate(today.getDate())

    // Set startDate to 29 days before endDate (to include 30 days total)
    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - 29)

    const currentDate = new Date(startDate)

    // Format dates to remove time component
    currentDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    // eslint-disable-next-line no-unmodified-loop-condition
    while (currentDate <= endDate) {
      data.push({
        date: currentDate.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 150),
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return data
  }

  const data = generateLast30Days()

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
        data={data}
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
          dataKey="value"
          stroke="var(--blue-base)"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default VisitorsByDayChart
