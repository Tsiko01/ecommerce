import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { createOrder } from '../../lib/orders'
import { getInventory, reduceInventory, saveOrder } from '../../store/orderStore'
import { useCartStore } from '../../store/cartStore'
import { Input } from '../ui/Input'
import type { CartLine } from '../../types/product'

const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(24, 'Enter a valid phone number.'),
  address: z.string().trim().min(5, 'Enter your street address.'),
  postalCode: z.string().trim().min(3, 'Enter a valid ZIP or postal code.'),
  city: z.string().trim().min(2, 'Enter your city.'),
  country: z.string().trim().min(2, 'Enter your country.'),
  cardNumber: z.string().regex(/^(?:\d{4} ?){3}\d{4}$/, 'Enter a valid 16-digit card number.'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format.').refine((value) => {
    const [monthValue, yearValue] = value.split('/')
    const now = new Date()
    const year = Number(yearValue) + 2000
    return year > now.getFullYear() || (year === now.getFullYear() && Number(monthValue) >= now.getMonth() + 1)
  }, 'Enter a future expiration date.'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Enter a valid security code.'),
})

type FormValues = z.infer<typeof checkoutSchema>

const groups: { title: string; fields: { key: keyof FormValues; label: string; placeholder: string; type?: string; autoComplete?: string }[] }[] = [
  { title: 'BILLING DETAILS', fields: [{ key: 'name', label: 'Name', placeholder: 'Alex Morgan', autoComplete: 'name' }, { key: 'email', label: 'Email Address', placeholder: 'alex@email.com', type: 'email', autoComplete: 'email' }, { key: 'phone', label: 'Phone Number', placeholder: '+1 202 555 0136', type: 'tel', autoComplete: 'tel' }] },
  { title: 'SHIPPING INFO', fields: [{ key: 'address', label: 'Your Address', placeholder: '1137 Williams Avenue', autoComplete: 'street-address' }, { key: 'postalCode', label: 'ZIP Code', placeholder: '10001', autoComplete: 'postal-code' }, { key: 'city', label: 'City', placeholder: 'New York', autoComplete: 'address-level2' }, { key: 'country', label: 'Country', placeholder: 'United States', autoComplete: 'country-name' }] },
  { title: 'PAYMENT DETAILS', fields: [{ key: 'cardNumber', label: 'Card Number', placeholder: '0000 0000 0000 0000', autoComplete: 'off' }, { key: 'expiry', label: 'Expiration Date', placeholder: 'MM/YY', autoComplete: 'off' }, { key: 'cvv', label: 'CVV', placeholder: '123', autoComplete: 'off' }] },
]

export function CheckoutForm({ items }: { items: CartLine[] }) {
  const [processing, setProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const navigate = useNavigate()
  const clearCart = useCartStore((state) => state.clearCart)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', email: '', phone: '', address: '', postalCode: '', city: '', country: '', cardNumber: '', expiry: '', cvv: '' },
  })

  const onSubmit = async (values: FormValues) => {
    setCheckoutError('')
    const inventory = getInventory()
    const unavailable = items.some((line) => {
      const product = products.find((item) => item.id === line.productId)
      return !product || line.quantity > (inventory[line.productId] ?? product.stock)
    })
    if (unavailable) {
      setCheckoutError('One or more products no longer have enough local demo stock. Please update your cart.')
      return
    }
    setProcessing(true)
    await new Promise((resolve) => window.setTimeout(resolve, 1000))
    const order = createOrder(
      items,
      { name: values.name, email: values.email, phone: values.phone },
      { address: values.address, city: values.city, postalCode: values.postalCode, country: values.country },
    )
    try {
      saveOrder(order)
      reduceInventory(items)
      clearCart()
      navigate(`/order-success/${order.id}`)
    } catch (error) {
      console.error('Unable to complete local demo checkout.', error)
      setCheckoutError('We could not save your demo order. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      {groups.map((group) => <fieldset className="form-section" key={group.title}><legend>{group.title}</legend><div className="field-grid">
        {group.fields.map((field) => {
          const error = errors[field.key]
          return <Input key={field.key} {...register(field.key)} label={field.label} error={error?.message} id={field.key} type={field.type ?? 'text'} placeholder={field.placeholder} autoComplete={field.autoComplete} inputMode={field.key === 'cardNumber' || field.key === 'cvv' ? 'numeric' : undefined} />
        })}
      </div></fieldset>)}
      {checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}
      <p className="payment-disclaimer">Demo checkout only. Card details are used for validation in this browser and are never sent or stored.</p>
      <button className="button button-primary submit-order" type="submit" disabled={processing || !items.length}>{processing ? <><span className="spinner" /> PROCESSING PAYMENT…</> : 'PLACE ORDER'}</button>
    </form>
  )
}
