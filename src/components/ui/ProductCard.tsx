import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { Button } from './Button'
import { Price } from './Price'
import { Badge } from './Badge'
import { getStock } from '../../store/orderStore'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const stock = getStock(product.id)
  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.slug}`}>
        <img src={product.thumbnail} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-info">
        <span className="card-category">{product.category} · {stock > 0 ? 'In stock' : 'Sold out'}</span>
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <Price value={product.price} className="card-price" />
        <div className="card-actions">
          <Button to={`/products/${product.slug}`} variant="secondary">VIEW PRODUCT</Button>
          <Button onClick={() => addItem(product.id)} disabled={stock < 1} aria-label={`Add ${product.name} to cart`}>ADD</Button>
        </div>
        {product.isNew && <Badge />}
      </div>
    </article>
  )
}
