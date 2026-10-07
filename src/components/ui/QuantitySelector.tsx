interface Props {
  quantity: number
  max: number
  onChange: (quantity: number) => void
  label?: string
}

export function QuantitySelector({ quantity, max, onChange, label = 'Quantity' }: Props) {
  return (
    <div className="quantity" aria-label={label}>
      <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => onChange(quantity - 1)}>-</button>
      <span aria-live="polite">{quantity}</span>
      <button aria-label="Increase quantity" disabled={quantity >= max} onClick={() => onChange(quantity + 1)}>+</button>
    </div>
  )
}
