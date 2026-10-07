import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link className="logo" to="/">audiophile</Link>
          <nav aria-label="Footer navigation">
            <Link to="/">HOME</Link>
            {categories.map((category) => <Link key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Bringing you the best audio gear, crafted for sound lovers and built for life. Experience sound as it was meant to be heard.</p>
          <div className="social-links" aria-label="Social media">
            <a href="https://www.facebook.com/" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2.1H7.2V13H10v8z"/></svg></a>
            <a href="https://twitter.com/" aria-label="Twitter"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.8 7.1v.5c0 5.1-3.9 11-11 11-2.2 0-4.2-.6-5.9-1.7h.9c1.8 0 3.5-.6 4.8-1.6a3.9 3.9 0 0 1-3.6-2.7c.2 0 .5.1.7.1.4 0 .7 0 1-.1a3.9 3.9 0 0 1-3.1-3.8v-.1c.5.3 1.1.5 1.7.5a3.9 3.9 0 0 1-1.2-5.2 11 11 0 0 0 8 4.1 4 4 0 0 1-.1-.9 3.9 3.9 0 0 1 6.8-2.7 7.7 7.7 0 0 0 2.5-1 3.9 3.9 0 0 1-1.7 2.1 7.8 7.8 0 0 0 2.2-.6 8.3 8.3 0 0 1-2 2.1"/></svg></a>
            <a href="https://www.instagram.com/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm8.7 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6"/></svg></a>
          </div>
        </div>
        <p className="copyright">Copyright 2026. All rights reserved.</p>
      </div>
    </footer>
  )
}
