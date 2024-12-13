import { Category } from '@/app/dto/category'

export type ProductTypeTagProps = {
  category: Category
}

export const ProductTypeTag = ({ category }: ProductTypeTagProps) => {
  return (
    <span className="rounded-full bg-gray-400 px-2 py-1 text-label-sm text-white">
      {category.title.toUpperCase()}
    </span>
  )
}
