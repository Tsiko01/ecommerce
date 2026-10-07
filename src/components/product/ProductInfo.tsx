import { useState } from 'react'
import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { Button } from '../ui/Button'
import { Price } from '../ui/Price'
import { Badge } from '../ui/Badge'
import { QuantitySelector } from '../ui/QuantitySelector'
import { getStock } from '../../store/orderStore'

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const stock = getStock(product.id)
  const addItem = useCartStore((state) => state.addItem)
  const inCart = useCartStore((state) => state.items.find((item) => item.productId === product.id)?.quantity ?? 0)
  const availableToAdd = Math.max(stock - inCart, 0)
  const [added, setAdded] = useState(false)
  return (
    <div className="product-info">
      {product.isNew && <Badge />}
      <h1>{product.name}</h1>
      <p>{product.shortDescription}</p>
      <Price value={product.price} className="detail-price" />
      <p className={`stock-copy ${stock ? '' : 'out'}`}>{stock ? `${stock} available · Local demo stock` : 'Currently unavailable'}</p>
      <div className="purchase-row">
        <QuantitySelector quantity={quantity} max={availableToAdd || 1} onChange={setQuantity} />
        <Button disabled={!availableToAdd} onClick={() => { addItem(product.id, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800) }}>
          {added ? 'ADDED TO CART' : 'ADD TO CART'}
        </Button>
      </div>
    </div>
  )
}
