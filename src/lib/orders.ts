import { calculateShipping, calculateSubtotal, calculateTotal, calculateVAT } from './calculations'
import type { Order } from '../types/order'
import type { CartLine } from '../types/product'

export function createOrder(
  items: CartLine[],
  customer: Order['customer'],
  shippingAddress: Order['shippingAddress'],
): Order {
  const subtotal = calculateSubtotal(items)
  const shipping = calculateShipping(items)
  const vat = calculateVAT(subtotal)
  const bytes = new Uint32Array(1)
  window.crypto.getRandomValues(bytes)
  return {
    id: `ORD-${String(bytes[0] % 1_000_000).padStart(6, '0')}`,
    items: items.map((item) => ({ ...item })),
    subtotal,
    shipping,
    vat,
    total: calculateTotal(subtotal, shipping, vat),
    customer,
    shippingAddress,
    createdAt: new Date().toISOString(),
  }
}
