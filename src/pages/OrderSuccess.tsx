import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { getOrder } from '../store/orderStore'
import { useEffect } from 'react'
import { setPageMetadata } from '../lib/utils'
import { products } from '../data/products'
import { Price } from '../components/ui/Price'
import { Button } from '../components/ui/Button'

export function OrderSuccess() {
  const { orderId = '' } = useParams()
  const order = getOrder(orderId)
  useEffect(() => {
    setPageMetadata(
      order ? `Order ${order.id} confirmed` : 'Order not found',
      'View your order confirmation and browser-local demo order details.',
    )
  }, [order, orderId])
  if (!order) return <main className="section-wrap error-state"><span className="eyebrow">ORDER NOT FOUND</span><h1>WE COULDN'T FIND THAT ORDER</h1><p>This order may have been cleared from this browser.</p><Button to="/products">CONTINUE SHOPPING</Button></main>
  return (
    <main className="section-wrap success-page">
      <div className="success-mark"><Check size={28} /></div>
      <span className="eyebrow">THANK YOU FOR YOUR ORDER</span>
      <h1>ORDER CONFIRMED</h1>
      <p>Your demo order is ready. A confirmation would be sent to <strong>{order.customer.email}</strong>.</p>
      <section className="order-card">
        <div className="order-head"><div><span className="eyebrow">ORDER NUMBER</span><h2>{order.id}</h2></div><span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span></div>
        <div className="order-lines">{order.items.map((line) => {
          const product = products.find((item) => item.id === line.productId)
          return product ? <div className="order-item" key={line.productId}><img src={product.thumbnail} alt="" /><div><strong>{product.name}</strong><span>Quantity {line.quantity}</span></div><Price value={product.price * line.quantity} /></div> : null
        })}</div>
        <div className="order-details"><div><h3>SHIPPING TO</h3><p>{order.customer.name}<br />{order.shippingAddress.address}<br />{order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />{order.shippingAddress.country}</p><span>{order.customer.phone}</span></div><div className="order-totals"><h3>PAYMENT SUMMARY</h3><p>Subtotal <Price value={order.subtotal} /></p><p>Shipping <Price value={order.shipping} /></p><p>VAT <Price value={order.vat} /></p><p className="order-total">Total <Price value={order.total} /></p></div></div>
        <p className="local-note">This order and inventory are stored only in this browser.</p>
      </section>
      <Button to="/products">CONTINUE SHOPPING</Button>
      <Link className="quiet-link" to="/">BACK TO HOME</Link>
    </main>
  )
}
