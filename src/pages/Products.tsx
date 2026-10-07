import { useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'
import { setPageMetadata } from '../lib/utils'
import type { Category } from '../types/product'
import { ProductCard } from '../components/ui/ProductCard'
import { getStock } from '../store/orderStore'

type Sort = 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export function Products({ category }: { category?: Category }) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>(category ?? 'all')
  const [availability, setAvailability] = useState('all')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sort, setSort] = useState<Sort>('newest')
  useEffect(() => setPageMetadata(category ? `${category} collection` : 'Shop all products', 'Shop the audiophile collection of headphones, speakers and earphones.'), [category])

  const shown = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = products.filter((product) =>
      (filterCategory === 'all' || product.category === filterCategory) &&
      (availability === 'all' || (availability === 'available' ? getStock(product.id) > 0 : getStock(product.id) === 0)) &&
      product.price <= maxPrice &&
      (!query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query))
    )
    return filtered.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      return Number(b.isNew) - Number(a.isNew)
    })
  }, [search, filterCategory, availability, maxPrice, sort])

  return (
    <>
      <div className="page-banner"><span className="eyebrow">THE AUDIOPHILE COLLECTION</span><h1>{category ? `${category.toUpperCase()}` : 'ALL PRODUCTS'}</h1></div>
      <main className="section-wrap listing-page">
        <div className="filter-bar">
          <label className="search-field">SEARCH<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Product, category or detail" /></label>
          <label>CATEGORY<select value={filterCategory} onChange={(event) => setFilterCategory(event.target.value as Category | 'all')}><option value="all">All categories</option><option value="headphones">Headphones</option><option value="speakers">Speakers</option><option value="earphones">Earphones</option></select></label>
          <label>AVAILABILITY<select value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">All products</option><option value="available">In stock</option><option value="unavailable">Sold out</option></select></label>
          <label className="price-filter">MAX PRICE <span>${maxPrice}</span><input type="range" min="200" max="5000" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label>
          <label>SORT BY<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="newest">Newest</option><option value="price-asc">Price Low → High</option><option value="price-desc">Price High → Low</option><option value="name-asc">Name A → Z</option><option value="name-desc">Name Z → A</option></select></label>
        </div>
        <p className="result-count">{shown.length} PRODUCTS</p>
        {shown.length ? <div className="product-grid">{shown.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-results"><h2>NO PRODUCTS FOUND</h2><p>Try changing your search or filters.</p><button onClick={() => { setSearch(''); setFilterCategory('all'); setAvailability('all'); setMaxPrice(5000) }}>CLEAR FILTERS</button></div>}
      </main>
    </>
  )
}
