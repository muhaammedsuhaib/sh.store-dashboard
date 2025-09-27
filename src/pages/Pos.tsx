import { useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart, User, CreditCard, X } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Mock data
const products: Product[] = [
  { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'Electronics', stock: 15, image: '📱' },
  { id: 2, name: 'MacBook Air', price: 1299, category: 'Electronics', stock: 8, image: '💻' },
  { id: 3, name: 'AirPods Pro', price: 249, category: 'Electronics', stock: 25, image: '🎧' },
  { id: 4, name: 'Nike Air Max', price: 120, category: 'Shoes', stock: 30, image: '👟' },
  { id: 5, name: 'Coffee Mug', price: 15, category: 'Home', stock: 50, image: '☕' },
  { id: 6, name: 'Backpack', price: 79, category: 'Accessories', stock: 20, image: '🎒' },
  { id: 7, name: 'Wireless Mouse', price: 45, category: 'Electronics', stock: 35, image: '🖱️' },
  { id: 8, name: 'Desk Lamp', price: 35, category: 'Home', stock: 18, image: '💡' },
];

const categories = ['All', 'Electronics', 'Shoes', 'Home', 'Accessories'];

export function POS() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + tax;

  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setCustomer('');
  };

  // Process payment
  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment successful! Total: $${finalTotal.toFixed(2)}`);
      clearCart();
      setIsCheckoutOpen(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* POS Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Point of Sale</h1>
            <p className="text-gray-600 dark:text-gray-400">Quick and easy checkout system</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">$2,847.50</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">POS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products Section */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div className="text-4xl text-center mb-3">{product.image}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:w-96">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 sticky top-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order Summary
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Customer
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Walk-in customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No items in cart</p>
                  <p className="text-sm">Select products to start order</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax (8%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span>Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Process Payment (${finalTotal.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Payment</h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['card', 'cash', 'digital', 'other'].map(method => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 border rounded-lg text-center capitalize ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Items:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}