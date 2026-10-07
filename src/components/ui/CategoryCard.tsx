import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  name: string
  slug: string
  image: string
}

export function CategoryCard({ name, slug, image }: Props) {
  return (
    <Link to={`/category/${slug}`} className="category-card">
      <img src={image} alt="" loading="lazy" />
      <span className="category-name">{name}</span>
      <span className="shop-link">SHOP <ArrowRight size={15} aria-hidden="true" /></span>
    </Link>
  )
}
