import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { categories } from '../../data/categories'
import { useCartStore } from '../../store/cartStore'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [open, setOpen] = useState(false)
  const count = useCartStore((state) => state.getItemCount())
  const close = () => setOpen(false)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <Link className="logo" to="/" aria-label="audiophile home" onClick={close}>audiophile</Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/">HOME</NavLink>
          {categories.map((category) => <NavLink key={category.slug} to={`/category/${category.slug}`}>{category.name}</NavLink>)}
          <NavLink to="/products">ALL PRODUCTS</NavLink>
        </nav>
        <Link to="/cart" className="cart-button" aria-label={`Shopping cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <ShoppingCart size={23} strokeWidth={2} /><span className="cart-count">{count}</span>
        </Link>
      </div>
      <MobileMenu open={open} cartCount={count} onClose={close} />
    </header>
  )
}
