import { readStorage, writeStorage } from '../lib/storage'
import { products } from '../data/products'
import type { Order } from '../types/order'

const validOrders = (value: unknown): value is Order[] => Array.isArray(value)
  && value.every((order) => typeof order?.id === 'string' && Array.isArray(order.items))

export function getOrders(): Order[] {
  return readStorage<Order[]>('ecommerce_orders', [], validOrders)
}

export function getOrder(orderId: string): Order | undefined {
  return getOrders().find((order) => order.id === orderId)
}

export function saveOrder(order: Order): void {
  writeStorage('ecommerce_orders', [order, ...getOrders()])
}

export function getInventory(): Record<string, number> {
  return readStorage<Record<string, number>>('ecommerce_inventory', {}, (value): value is Record<string, number> =>
    typeof value === 'object' && value !== null && Object.values(value).every((stock) => Number.isInteger(stock) && stock >= 0))
}

export function getStock(productId: string): number {
  const product = products.find((entry) => entry.id === productId)
  if (!product) return 0
  return getInventory()[productId] ?? product.stock
}

export function reduceInventory(items: Order['items']): void {
  const inventory = getInventory()
  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId)
    if (product) inventory[item.productId] = Math.max(0, (inventory[item.productId] ?? product.stock) - item.quantity)
  }
  writeStorage('ecommerce_inventory', inventory)
}
