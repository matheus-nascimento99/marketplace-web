import { Category } from '@/app/dto/category'
import { api } from '@/lib/ky/api'

export type FetchCategoriesResponse = {
  categories: Category[]
}

export const fetchCategories = async () => {
  const result = await api.get<FetchCategoriesResponse>('categories').json()

  return result.categories
}
