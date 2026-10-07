import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartStore } from '../store/cartStore'
import { setPageMetadata } from '../lib/utils'
import { products } from '../data/products'
import { CartItem } from '../components/cart/CartItem'
import { CartSummary } from '../components/cart/CartSummary'
import { EmptyCart } from '../components/cart/EmptyCart'

export function Cart() {
  useEffect(() => setPageMetadata('Your cart', 'Review your selected audiophile products before checkout.'), [])
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const lines = items.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })
  if (!lines.length) return <main className="section-wrap cart-page"><EmptyCart /></main>
  return (
    <main className="section-wrap cart-page">
      <Link className="back-link" to="/products">← CONTINUE SHOPPING</Link>
      <div className="cart-heading"><h1>YOUR CART <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h1><button onClick={clearCart}>CLEAR CART</button></div>
      <div className="cart-layout"><div className="cart-list">{lines.map((line) => <CartItem key={line.productId} product={line.product} quantity={line.quantity} />)}</div><CartSummary items={items} /></div>
    </main>
  )
}
