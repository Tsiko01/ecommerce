import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { setPageMetadata } from '../lib/utils'
import { CategoryCard } from '../components/ui/CategoryCard'
import { Button } from '../components/ui/Button'
import { ProductCard } from '../components/ui/ProductCard'
import { useEffect } from 'react'

export function Home() {
  useEffect(() => setPageMetadata('Premium audio equipment', 'Discover beautifully designed headphones, speakers and earphones from audiophile.'), [])
  const picks = [products[0], products[3], products[6]]
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy"><span className="hero-overline">NEW PRODUCT</span><h1>XX99 MARK II<br />HEADPHONES</h1><p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p><Button to="/products/xx99-mark-two">SEE PRODUCT</Button></div>
          <img className="hero-image" src="/headphones.svg" alt="XX99 Mark II premium over-ear headphones" />
          <span className="hero-number" aria-hidden="true">01 / 03</span>
        </div>
      </section>
      <section className="category-strip section-wrap" aria-label="Shop by category">{categories.map((category) => <CategoryCard key={category.slug} {...category} />)}</section>
      <main>
        <section className="featured-speaker section-wrap">
          <div className="featured-orbit" aria-hidden="true"></div>
          <img src="/speaker.svg" alt="ZX9 speaker in a matte black finish" loading="lazy" />
          <div className="featured-copy"><h2>ZX9<br />SPEAKER</h2><p>Powerful, room-filling sound meets refined design. Feel every beat with the wireless ZX9 speaker.</p><Button to="/products/zx9-speaker" variant="secondary">SEE PRODUCT</Button></div>
        </section>
        <section className="featured-zx7 section-wrap">
          <div><span>MAKE YOUR MUSIC</span><h2>COME ALIVE</h2><Button to="/products/zx7-speaker" variant="secondary">SEE PRODUCT</Button></div>
        </section>
        <section className="split-promo section-wrap">
          <div className="promo-photo"><img src="/earphones.svg" alt="YX1 wireless earphones" loading="lazy" /></div>
          <div className="promo-copy"><span>SMALL FORM. BIG SOUND.</span><h2>YX1 EARPHONES</h2><p>Every detail, wherever your day takes you. Rich, balanced sound in a pocket-sized wireless design.</p><Button to="/products/yx1-earphones" variant="secondary">SEE PRODUCT</Button></div>
        </section>
        <section className="best-gear section-wrap">
          <div><span className="eyebrow">MADE FOR THE MOMENT</span><h2>BRING YOUR<br />MUSIC TO LIFE</h2><p>We are a team of sound enthusiasts who believe the right equipment can bring you closer to the music you love. Thoughtful design, honest sound and lasting quality — that's the audiophile difference.</p><Link className="shop-link editorial-link" to="/products">EXPLORE THE COLLECTION <ArrowRight size={16} /></Link></div>
          <div className="editorial-image"><img src="/headphones.svg" alt="A closer look at audiophile listening equipment" loading="lazy" /></div>
        </section>
        <section className="home-picks section-wrap"><div className="section-heading"><span className="eyebrow">CURATED FOR YOU</span><h2>THE SOUND EDIT</h2><Link to="/products" className="shop-link">VIEW ALL <ArrowRight size={15} /></Link></div><div className="product-grid">{picks.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>
      </main>
    </>
  )
}
