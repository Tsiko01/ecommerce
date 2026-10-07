import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { CheckoutForm } from '../components/checkout/CheckoutForm'
import { CheckoutSummary } from '../components/checkout/CheckoutSummary'
import { setPageMetadata } from '../lib/utils'

export function Checkout() {
  useEffect(() => setPageMetadata('Checkout', 'Complete your frontend demo order securely in this browser.'), [])
  const items = useCartStore((state) => state.items)
  const [startedWithItems] = useState(items.length > 0)
  if (!startedWithItems) return <Navigate to="/cart" replace />
  return (
    <main className="section-wrap checkout-page">
      <Link className="back-link" to="/cart">← GO BACK TO CART</Link>
      <div className="checkout-layout"><section className="checkout-main"><h1>CHECKOUT</h1><CheckoutForm items={items} /></section><CheckoutSummary items={items} /></div>
    </main>
  )
}
