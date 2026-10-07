import { Products } from './Products'
import type { Category as CategoryName } from '../types/product'

export function Category({ category }: { category: CategoryName }) {
  return <Products category={category} />
}
