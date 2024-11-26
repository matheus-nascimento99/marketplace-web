const statuses = {
  ANNOUNCED: { bg: 'bg-blue-dark', title: 'ANUNCIADO' },
  SELLED: { bg: 'bg-success', title: 'VENDIDO' },
  DEACTIVATED: { bg: 'bg-gray-300', title: 'DESATIVADO' },
}

type ProductStatusTagProps = {
  status: keyof typeof statuses
}

export const ProductStatusTag = ({ status }: ProductStatusTagProps) => {
  return (
    <span
      className={`text-white ${statuses[status].bg} rounded-full px-2 py-1 text-label-sm`}
    >
      {statuses[status].title}
    </span>
  )
}
