import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { products } from '../data/products'
import { setPageMetadata } from '../lib/utils'
import { Button } from '../components/ui/Button'
import { ProductGallery } from '../components/product/ProductGallery'
import { ProductInfo } from '../components/product/ProductInfo'
import { ProductFeatures } from '../components/product/ProductFeatures'
import { ProductIncludes } from '../components/product/ProductIncludes'
import { RelatedProducts } from '../components/product/RelatedProducts'

export function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  useEffect(() => setPageMetadata(product?.name ?? 'Product not found', product?.shortDescription ?? 'Explore the audiophile collection.'), [product])
  if (!product) return <div className="section-wrap error-state"><span className="eyebrow">PRODUCT NOT FOUND</span><h1>WE COULDN'T FIND THAT PRODUCT</h1><Button to="/products">BACK TO ALL PRODUCTS</Button></div>
  return (
    <main className="section-wrap detail-page">
      <Link className="back-link" to="/products">← GO BACK</Link>
      <div className="detail-intro"><ProductGallery images={product.images} name={product.name} /><ProductInfo product={product} /></div>
      <div className="features-layout"><ProductFeatures features={product.features} /><ProductIncludes items={product.includedItems} /></div>
      <RelatedProducts product={product} />
    </main>
  )
}
