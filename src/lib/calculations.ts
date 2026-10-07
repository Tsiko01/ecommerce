import { products } from '../data/products'
import type { CartLine } from '../types/product'

export function calculateSubtotal(cart: CartLine[]): number {
  return cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)
}

export function calculateShipping(cart: CartLine[]): number {
  return cart.length ? 50 : 0
}

export function calculateVAT(subtotal: number): number {
  return subtotal * 0.2
}

export function calculateTotal(subtotal: number, shipping: number, vat: number): number {
  return subtotal + shipping + vat
}

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
