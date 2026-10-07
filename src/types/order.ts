import type { CartLine } from './product'

export interface CustomerDetails {
  name: string
  email: string
  phone: string
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  items: CartLine[]
  subtotal: number
  shipping: number
  vat: number
  total: number
  customer: CustomerDetails
  shippingAddress: ShippingAddress
  createdAt: string
}
