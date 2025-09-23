import { Layout } from './components/Layout'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductNew from './pages/ProductNew'
import ProductCategories from './pages/ProductCategories'
import Orders from './pages/Orders'
import OrdersPending from './pages/OrdersPending'
import OrdersCompleted from './pages/OrdersCompleted'
import Customers from './pages/Customers'
import CustomerSegments from './pages/CustomerSegments'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductNew />} />
          <Route path="/products/categories" element={<ProductCategories />} />
          {/* Orders */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/pending" element={<OrdersPending />} />
          <Route path="/orders/completed" element={<OrdersCompleted />} />
          {/* Customers */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/segments" element={<CustomerSegments />} />
          {/* Analytics & Settings */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
