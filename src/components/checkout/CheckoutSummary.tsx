import type { CartLine } from '../../types/product'
import { products } from '../../data/products'
import { Price } from '../ui/Price'
import { CartSummary } from '../cart/CartSummary'

export function CheckoutSummary({ items }: { items: CartLine[] }) {
  return <div className="checkout-summary"><h2>YOUR ORDER</h2><div className="checkout-items">{items.map((line) => {
    const product = products.find((item) => item.id === line.productId)
    if (!product) return null
    return <div className="checkout-item" key={product.id}><img src={product.thumbnail} alt="" /><div><strong>{product.name}</strong><span>Qty {line.quantity}</span></div><Price value={product.price * line.quantity} /></div>
  })}</div><CartSummary items={items} checkout /></div>
}
