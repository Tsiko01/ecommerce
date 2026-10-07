import { NavLink } from 'react-router-dom'
import { categories } from '../../data/categories'
import { Button } from '../ui/Button'

interface Props {
  open: boolean
  cartCount: number
  onClose: () => void
}

export function MobileMenu({ open, cartCount, onClose }: Props) {
  return (
    <>
      <div id="mobile-navigation" className={`mobile-navigation ${open ? 'is-open' : ''}`} aria-hidden={!open} hidden={!open}>
        <nav aria-label="Mobile navigation">
          <NavLink to="/" onClick={onClose}>HOME</NavLink>
          {categories.map((category) => <NavLink key={category.slug} to={`/category/${category.slug}`} onClick={onClose}>{category.name}</NavLink>)}
          <NavLink to="/products" onClick={onClose}>ALL PRODUCTS</NavLink>
          <Button to="/cart" variant="secondary" onClick={onClose}>YOUR CART — {cartCount}</Button>
        </nav>
      </div>
      {open && <button className="menu-scrim" aria-label="Close navigation menu" onClick={onClose} />}
    </>
  )
}
