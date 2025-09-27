import { Layout } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductNew from "./pages/ProductNew";
import ProductCategories from "./pages/ProductCategories";
import Orders from "./pages/Orders";
import OrdersPending from "./pages/OrdersPending";
import OrdersCompleted from "./pages/OrdersCompleted";
import Customers from "./pages/Customers";
import CustomerSegments from "./pages/CustomerSegments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { NotFound } from "./pages/NotFound";
import { POS } from "./pages/Pos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          {/* POS */}
          <Route path="/pos" element={<POS />} />
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
