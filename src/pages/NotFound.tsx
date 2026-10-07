import { Button } from '../components/ui/Button'
import { useEffect } from 'react'
import { setPageMetadata } from '../lib/utils'

export function NotFound() {
  useEffect(() => setPageMetadata('Page not found', 'The page you are looking for does not exist.'), [])
  return <main className="section-wrap not-found"><span className="error-number">404</span><h1>PAGE NOT FOUND</h1><p>The page you’re looking for has moved or doesn’t exist.</p><Button to="/">BACK TO HOME</Button></main>
}
