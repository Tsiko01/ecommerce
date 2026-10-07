import { categoryAssets, categoryNames } from './products'
import type { Category } from '../types/product'

export const categories: { slug: Category; name: string; image: string }[] = (
  Object.keys(categoryNames) as Category[]
).map((slug) => ({ slug, name: categoryNames[slug], image: categoryAssets[slug] }))
