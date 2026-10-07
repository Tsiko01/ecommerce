import { create } from 'zustand'
import { products } from '../data/products'
import { readStorage, writeStorage } from '../lib/storage'
import { getStock } from './orderStore'
import type { CartLine } from '../types/product'

const validCart = (value: unknown): value is CartLine[] =>
  Array.isArray(value) && value.every((line) =>
    typeof line?.productId === 'string' && products.some((product) => product.id === line.productId) &&
    Number.isInteger(line.quantity) && line.quantity > 0
  )

interface CartState {
  items: CartLine[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

const initialItems = readStorage<CartLine[]>('ecommerce_cart', [], validCart)

export const useCartStore = create<CartState>((set, get) => ({
  items: initialItems,
  addItem: (productId, quantity = 1) => set((state) => {
    const product = products.find((item) => item.id === productId)
    const stock = getStock(productId)
    if (!product || stock < 1) return state
    const current = state.items.find((item) => item.productId === productId)?.quantity ?? 0
    const nextQuantity = Math.min(current + quantity, stock)
    const items = current
      ? state.items.map((item) => item.productId === productId ? { ...item, quantity: nextQuantity } : item)
      : [...state.items, { productId, quantity: nextQuantity }]
    writeStorage('ecommerce_cart', items)
    return { items }
  }),
  removeItem: (productId) => set((state) => {
    const items = state.items.filter((item) => item.productId !== productId)
    writeStorage('ecommerce_cart', items)
    return { items }
  }),
  increaseQuantity: (productId) => set((state) => {
    const stock = getStock(productId)
    const items = state.items.map((item) => item.productId === productId && item.quantity < stock
      ? { ...item, quantity: item.quantity + 1 } : item)
    writeStorage('ecommerce_cart', items)
    return { items }
  }),
  decreaseQuantity: (productId) => set((state) => {
    const items = state.items.flatMap((item) => item.productId !== productId ? [item] : item.quantity > 1
      ? [{ ...item, quantity: item.quantity - 1 }] : [])
    writeStorage('ecommerce_cart', items)
    return { items }
  }),
  clearCart: () => {
    writeStorage('ecommerce_cart', [])
    set({ items: [] })
  },
  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  getSubtotal: () => get().items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0),
}))
