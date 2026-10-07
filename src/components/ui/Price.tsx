import { formatPrice } from '../../lib/calculations'

export function Price({ value, className = '' }: { value: number; className?: string }) {
  return <span className={className}>{formatPrice(value)}</span>
}
