import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Package, 
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Order Management",
      description: "Easily manage and track all your orders in one place with real-time updates.",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Product Catalog",
      description: "Organize your products with categories, inventory tracking, and bulk operations.",
      color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Management",
      description: "Manage customer relationships, segments, and communication effectively.",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Get insights into your sales, customer behavior, and business performance.",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First",
      description: "Enterprise-grade security to protect your business data and customer information.",
      color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast & Reliable",
      description: "Lightning-fast performance with 99.9% uptime guarantee for your store.",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Stores" },
    { number: "2M+", label: "Orders Processed" },
    { number: "500K+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold">Sh</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">Sh.shop</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The ultimate e-commerce management platform to grow your business efficiently and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sign-in"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Your Business
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your online store efficiently, from inventory to analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of successful stores using Sh.shop to manage their e-commerce operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/customers"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="font-bold">Sh</span>
                </div>
                <span className="text-xl font-bold">Sh.shop</span>
              </div>
              <p className="text-gray-400">
                The complete e-commerce solution for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sh.shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}