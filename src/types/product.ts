export type Category = 'headphones' | 'speakers' | 'earphones'

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  shortDescription: string
  price: number
  images: string[]
  thumbnail: string
  features: string[]
  includedItems: { item: string; quantity: number }[]
  isNew: boolean
  stock: number
}

export interface CartLine {
  productId: string
  quantity: number
}
