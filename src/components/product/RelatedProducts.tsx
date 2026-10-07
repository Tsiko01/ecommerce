import { products } from '../../data/products'
import type { Product } from '../../types/product'
import { ProductCard } from '../ui/ProductCard'

export function RelatedProducts({ product }: { product: Product }) {
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
  return <section className="related section-wrap"><h2>YOU MAY ALSO LIKE</h2><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
}
