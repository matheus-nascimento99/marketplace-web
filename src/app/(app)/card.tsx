import { ElementType } from 'react'

type MetricCardProps = {
  icon: ElementType
  amount: number
  label: string
}

export const MetricCard = ({ icon: Icon, amount, label }: MetricCardProps) => {
  return (
    <div className="flex gap-4 rounded-card bg-white py-3 pl-3 pr-12">
      <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-blue-light">
        <Icon className="size-10 text-blue-dark" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h3 className="font-dm-sans text-title-lg text-gray-400">{amount}</h3>
        <h4 className="text-body-xs text-gray-300">{label}</h4>
      </div>
    </div>
  )
}
