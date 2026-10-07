import { calculateShipping, calculateSubtotal, calculateTotal, calculateVAT } from '../../lib/calculations'
import type { CartLine } from '../../types/product'
import { Price } from '../ui/Price'
import { Button } from '../ui/Button'

export function CartSummary({ items, checkout = false }: { items: CartLine[]; checkout?: boolean }) {
  const subtotal = calculateSubtotal(items)
  const shipping = calculateShipping(items)
  const vat = calculateVAT(subtotal)
  const total = calculateTotal(subtotal, shipping, vat)
  return (
    <aside className="summary-panel">
      <h2>SUMMARY</h2>
      <div className="summary-line"><span>Subtotal</span><Price value={subtotal} /></div>
      <div className="summary-line"><span>Shipping</span><Price value={shipping} /></div>
      <div className="summary-line"><span>VAT (included)</span><Price value={vat} /></div>
      <div className="summary-line total-line"><span>Total</span><Price value={total} /></div>
      {!checkout && <Button to={items.length ? '/checkout' : '/products'}>CONTINUE TO CHECKOUT</Button>}
      <p className="local-note">Frontend demo · no real payment or global inventory</p>
    </aside>
  )
}
