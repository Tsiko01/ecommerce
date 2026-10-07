import { Button } from '../ui/Button'

export function EmptyCart() {
  return <div className="empty-state"><span className="empty-icon">0</span><h1>YOUR CART IS EMPTY</h1><p>Start adding products to your cart.</p><Button to="/products">CONTINUE SHOPPING</Button></div>
}
