import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  to?: string
  onClick?: () => void
}

export function Button({ children, variant = 'primary', to, className = '', ...props }: Props) {
  const classes = `button button-${variant} ${className}`
  return to
    ? <Link className={classes} to={to} onClick={props.onClick} aria-label={props['aria-label']}>{children}</Link>
    : <button className={classes} {...props}>{children}</button>
}
