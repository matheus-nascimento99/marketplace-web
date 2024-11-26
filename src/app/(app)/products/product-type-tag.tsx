const types = {
  TOY: { title: 'BRINQUEDO' },
  FURNITURE: { title: 'MÓVEL' },
  STATIONERY: { title: 'Papelaria' },
  HEALTH_AND_BEAUTY: { title: 'Saúde & Beleza' },
  UTENSIL: { title: 'Utensílio' },
  CLOTHING: { title: 'Vestuário' },
}

type ProductTypeTagProps = {
  type: keyof typeof types
}

export const ProductTypeTag = ({ type }: ProductTypeTagProps) => {
  return (
    <span className="rounded-full bg-gray-400 px-2 py-1 text-label-sm text-white">
      {types[type].title}
    </span>
  )
}
