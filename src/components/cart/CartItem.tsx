import { X } from 'lucide-react'
import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { Price } from '../ui/Price'
import { QuantitySelector } from '../ui/QuantitySelector'
import { Link } from 'react-router-dom'
import { getStock } from '../../store/orderStore'

export function CartItem({ product, quantity }: { product: Product; quantity: number }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore()
  const stock = getStock(product.id)
  return (
    <article className="cart-item">
      <Link className="cart-item-image" to={`/products/${product.slug}`}><img src={product.thumbnail} alt="" /></Link>
      <div className="cart-item-details"><Link to={`/products/${product.slug}`}><h3>{product.name}</h3></Link><Price value={product.price} /></div>
      <QuantitySelector quantity={quantity} max={stock} onChange={(next) => next > quantity ? increaseQuantity(product.id) : decreaseQuantity(product.id)} />
      <div className="cart-item-subtotal"><span>Subtotal</span><Price value={product.price * quantity} /></div>
      <button className="remove-item" aria-label={`Remove ${product.name}`} onClick={() => removeItem(product.id)}><X size={19} /></button>
    </article>
  )
}
