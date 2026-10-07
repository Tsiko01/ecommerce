import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import type { Category } from './types/product'

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })))
const Products = lazy(() => import('./pages/Products').then((module) => ({ default: module.Products })))
const ProductDetails = lazy(() => import('./pages/ProductDetails').then((module) => ({ default: module.ProductDetails })))
const Cart = lazy(() => import('./pages/Cart').then((module) => ({ default: module.Cart })))
const Checkout = lazy(() => import('./pages/Checkout').then((module) => ({ default: module.Checkout })))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess').then((module) => ({ default: module.OrderSuccess })))
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })))

function CategoryPage({ category }: { category: Category }) {
  return <Products key={category} category={category} />
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div className="route-loading flex min-h-[450px] items-center justify-center" role="status">LOADING…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/category/headphones" element={<CategoryPage category="headphones" />} />
          <Route path="/category/speakers" element={<CategoryPage category="speakers" />} />
          <Route path="/category/earphones" element={<CategoryPage category="earphones" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
