import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/common/Loader";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

// Lazy imports with better error handling
const lazyWithErrorHandling = (
  importFn: () => Promise<any>,
  componentName: string
) =>
  lazy(() =>
    importFn().catch((error) => {
      console.error(`Failed to load ${componentName}:`, error);
      throw error; // Re-throw to let ErrorBoundary handle it
    })
  );

// Lazy load components
const Home = lazyWithErrorHandling(() => import("./pages/Home"), "Home");
const SignIn = lazyWithErrorHandling(() => import("./pages/SignIn"), "SignIn");
const SignUp = lazyWithErrorHandling(() => import("./pages/SignUp"), "SignUp");
const ForgotPassword = lazyWithErrorHandling(
  () => import("./pages/ForgotPassword"),
  "ForgotPassword"
);
const ResetPassword = lazyWithErrorHandling(
  () => import("./pages/ResetPassword"),
  "ResetPassword"
);
const Layout = lazyWithErrorHandling(
  () => import("./components/Layout"),
  "Layout"
);
const Dashboard = lazyWithErrorHandling(
  () => import("./pages/Dashboard"),
  "Dashboard"
);
const POS = lazyWithErrorHandling(() => import("./pages/Pos"), "POS");
const Orders = lazyWithErrorHandling(() => import("./pages/Orders"), "Orders");
const Customers = lazyWithErrorHandling(
  () => import("./pages/Customers"),
  "Customers"
);
const Products = lazyWithErrorHandling(
  () => import("./pages/Products"),
  "Products"
);
const ProductNew = lazyWithErrorHandling(
  () => import("./pages/ProductNew"),
  "ProductNew"
);
const NotFound = lazyWithErrorHandling(
  () => import("./pages/NotFound"),
  "NotFound"
);

// Enhanced loading component with better UX
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="lg" text="Loading..." fullScreen />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Layout Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductNew />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
