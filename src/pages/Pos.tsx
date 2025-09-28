// import { useState, useRef, useEffect } from 'react';
// import { Search, Plus, Minus, Trash2, ShoppingCart, User, CreditCard, X, Filter, ChevronDown, Clock, CheckCircle, Package } from 'lucide-react';

// // Types
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   stock: number;
//   image: string;
//   popularity: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// // Mock data with popularity scores
// const products: Product[] = [
//   { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'Electronics', stock: 15, image: '📱', popularity: 95 },
//   { id: 2, name: 'MacBook Air', price: 1299, category: 'Electronics', stock: 8, image: '💻', popularity: 88 },
//   { id: 3, name: 'AirPods Pro', price: 249, category: 'Electronics', stock: 25, image: '🎧', popularity: 92 },
//   { id: 4, name: 'Nike Air Max', price: 120, category: 'Shoes', stock: 30, image: '👟', popularity: 78 },
//   { id: 5, name: 'Coffee Mug', price: 15, category: 'Home', stock: 50, image: '☕', popularity: 65 },
//   { id: 6, name: 'Backpack', price: 79, category: 'Accessories', stock: 20, image: '🎒', popularity: 72 },
//   { id: 7, name: 'Wireless Mouse', price: 45, category: 'Electronics', stock: 35, image: '🖱️', popularity: 68 },
//   { id: 8, name: 'Desk Lamp', price: 35, category: 'Home', stock: 18, image: '💡', popularity: 60 },
//   { id: 9, name: 'Smart Watch', price: 199, category: 'Electronics', stock: 12, image: '⌚', popularity: 85 },
//   { id: 10, name: 'Water Bottle', price: 25, category: 'Accessories', stock: 40, image: '💧', popularity: 70 },
// ];

// const categories = ['All', 'Electronics', 'Shoes', 'Home', 'Accessories', 'Car', 'Smart Home', 'Smart Watch', 'Smart Phone', 'Smart TV'];

// export function POS() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [customer, setCustomer] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
//   const [categorySearch, setCategorySearch] = useState('');
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
//   const [showCartNotification, setShowCartNotification] = useState(false);
//   const [lastAddedItem, setLastAddedItem] = useState<string>('');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowCategoryDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Filter categories based on search
//   const filteredCategories = categories.filter(category =>
//     category.toLowerCase().includes(categorySearch.toLowerCase())
//   );

//   // Filter and sort products
//   const filteredProducts = products
//     .filter(product => {
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'price':
//           return a.price - b.price;
//         case 'name':
//           return a.name.localeCompare(b.name);
//         case 'popularity':
//         default:
//           return b.popularity - a.popularity;
//       }
//     });

//   // Cart total
//   const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const tax = cartTotal * 0.08;
//   const finalTotal = cartTotal + tax;

//   // Add to cart with notification
//   const addToCart = (product: Product) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });

//     // Show notification
//     setLastAddedItem(product.name);
//     setShowCartNotification(true);
//     setTimeout(() => setShowCartNotification(false), 2000);

//     // Add to recent searches
//     if (!recentSearches.includes(product.name)) {
//       setRecentSearches(prev => [product.name, ...prev.slice(0, 4)]);
//     }
//   };

//   // Quick add from recent searches
//   const quickAddFromRecent = (productName: string) => {
//     const product = products.find(p => p.name === productName);
//     if (product) {
//       addToCart(product);
//       setSearchTerm('');
//     }
//   };

//   // Update quantity
//   const updateQuantity = (id: number, change: number) => {
//     setCart(prevCart => {
//       return prevCart.map(item => {
//         if (item.id === id) {
//           const newQuantity = item.quantity + change;
//           if (newQuantity <= 0) {
//             return null;
//           }
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       }).filter(Boolean) as CartItem[];
//     });
//   };

//   // Remove from cart
//   const removeFromCart = (id: number) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== id));
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCart([]);
//     setCustomer('');
//   };

//   // Process payment
//   const processPayment = () => {
//     setTimeout(() => {
//       alert(`Payment successful! Total: $${finalTotal.toFixed(2)}`);
//       clearCart();
//       setIsCheckoutOpen(false);
//     }, 1000);
//   };

//   // Popular products (top 3 by popularity)
//   const popularProducts = products
//     .filter(p => p.popularity > 80)
//     .slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//       {/* Cart Notification */}
//       {showCartNotification && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-bounce">
//           <CheckCircle className="h-5 w-5" />
//           <span>{lastAddedItem} added to cart!</span>
//         </div>
//       )}

//       {/* POS Header */}
//       {/* <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sm:p-6 mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex-1 min-w-0">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">QuickPOS</h1>
//             <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Fast and easy checkout system</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</p>
//               <p className="text-lg font-bold text-gray-900 dark:text-white">$2,847.50</p>
//             </div>
//             <div className="relative">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                 <ShoppingCart className="h-5 w-5 text-white" />
//               </div>
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 sm:px-6">
//         {/* Products Section */}
//         <div className="flex-1 min-w-0">
//           {/* Search and Filters */}
//           <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
//             <div className="space-y-4">
//               {/* Main Search */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder="Search products by name..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   {/* Recent Searches */}
//                   {recentSearches.length > 0 && searchTerm === '' && (
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       <span className="text-xs text-gray-500">Recent:</span>
//                       {recentSearches.map((search, index) => (
//                         <button
//                           key={index}
//                           onClick={() => quickAddFromRecent(search)}
//                           className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
//                         >
//                           {search} +
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Category Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                     className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Filter className="h-4 w-4" />
//                       <span className="truncate">{selectedCategory}</span>
//                     </div>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>

//                   {showCategoryDropdown && (
//                     <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
//                       {/* Category Search */}
//                       <div className="p-2 border-b border-gray-200 dark:border-gray-700">
//                         <div className="relative">
//                           <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
//                           <input
//                             type="text"
//                             placeholder="Search categories..."
//                             value={categorySearch}
//                             onChange={(e) => setCategorySearch(e.target.value)}
//                             className="w-full pl-7 pr-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                           />
//                         </div>
//                       </div>

//                       {/* Category List */}
//                       <div className="py-1">
//                         {filteredCategories.map(category => (
//                           <button
//                             key={category}
//                             onClick={() => {
//                               setSelectedCategory(category);
//                               setShowCategoryDropdown(false);
//                               setCategorySearch('');
//                             }}
//                             className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                               selectedCategory === category ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
//                             }`}
//                           >
//                             {category}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Sort Options */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Package className="h-4 w-4" />
//                   <span>{filteredProducts.length} products found</span>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value as any)}
//                     className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                   >
//                     <option value="popularity">Popular</option>
//                     <option value="price">Price</option>
//                     <option value="name">Name</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Popular Products */}
//           {searchTerm === '' && selectedCategory === 'All' && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                 <Clock className="h-5 w-5 text-blue-500" />
//                 Popular Products
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {popularProducts.map(product => (
//                   <div
//                     key={product.id}
//                     onClick={() => addToCart(product)}
//                     className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-4 hover:shadow-md transition-all cursor-pointer group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="text-2xl">{product.image}</div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
//                           {product.name}
//                         </h4>
//                         <p className="text-blue-600 dark:text-blue-400 font-bold">${product.price}</p>
//                       </div>
//                       <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
//                         Hot
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//             {filteredProducts.map(product => (
//               <div
//                 key={product.id}
//                 className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group"
//                 onClick={() => addToCart(product)}
//               >
//                 <div className="text-3xl text-center mb-2 group-hover:scale-110 transition-transform">
//                   {product.image}
//                 </div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate text-sm">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{product.category}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-base font-bold text-blue-600 dark:text-blue-400">
//                     ${product.price}
//                   </span>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     product.stock > 10 
//                       ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
//                       : product.stock > 5
//                       ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
//                       : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
//                   }`}>
//                     {product.stock} left
//                   </span>
//                 </div>
//                 <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
//                   <div 
//                     className="bg-green-500 h-1 rounded-full" 
//                     style={{ width: `${product.popularity}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* No Results */}
//           {filteredProducts.length === 0 && (
//             <div className="text-center py-12">
//               <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
//               <p className="text-gray-600 dark:text-gray-400">Try changing your search or filter criteria</p>
//             </div>
//           )}
//         </div>

//         {/* Cart Section */}
//         <div className="w-full lg:w-80 xl:w-96 mt-4 lg:mt-0">
//           <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 sticky top-4 sm:top-6 shadow-lg">
//             <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   Current Order
//                 </h2>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={clearCart}
//                     className="text-red-600 hover:text-red-700 text-sm flex items-center transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4 mr-1" />
//                     Clear
//                   </button>
//                 )}
//               </div>

//               {/* Customer Info */}
//               <div className="mb-3">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   <User className="h-4 w-4 inline mr-1" />
//                   Customer
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Walk-in customer"
//                   value={customer}
//                   onChange={(e) => setCustomer(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Cart Items */}
//             <div className="p-4 max-h-64 overflow-y-auto">
//               {cart.length === 0 ? (
//                 <div className="text-center text-gray-500 dark:text-gray-400 py-8">
//                   <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p>Your cart is empty</p>
//                   <p className="text-sm mt-1">Add products to get started</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {cart.map(item => (
//                     <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
//                         <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">${item.price}</p>
//                       </div>
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             updateQuantity(item.id, -1);
//                           }}
//                           className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                         >
//                           <Minus className="h-3 w-3" />
//                         </button>
//                         <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             updateQuantity(item.id, 1);
//                           }}
//                           className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                         >
//                           <Plus className="h-3 w-3" />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeFromCart(item.id);
//                           }}
//                           className="ml-1 text-red-600 hover:text-red-700 transition-colors"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Checkout Section */}
//             <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4 bg-gray-50 dark:bg-gray-800/50">
//               {/* Totals */}
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
//                   <span className="font-medium">${cartTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Tax (8%):</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
//                   <span>Total:</span>
//                   <span className="text-blue-600 dark:text-blue-400">${finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Checkout Button */}
//               <button
//                 onClick={() => setIsCheckoutOpen(true)}
//                 disabled={cart.length === 0}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
//               >
//                 <CreditCard className="h-5 w-5 mr-2" />
//                 Pay ${finalTotal.toFixed(2)}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Modal */}
//       {isCheckoutOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Payment</h3>
//               <button
//                 onClick={() => setIsCheckoutOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Payment Method
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['card', 'cash', 'digital', 'other'].map(method => (
//                     <button
//                       key={method}
//                       onClick={() => setPaymentMethod(method)}
//                       className={`p-3 border rounded-lg text-center capitalize transition-colors ${
//                         paymentMethod === method
//                           ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
//                           : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
//                       }`}
//                     >
//                       {method}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                 <div className="flex justify-between text-sm mb-2">
//                   <span>Items:</span>
//                   <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-2">
//                   <span>Subtotal:</span>
//                   <span>${cartTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mb-2">
//                   <span>Tax:</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
//                   <span>Total:</span>
//                   <span>${finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setIsCheckoutOpen(false)}
//                   className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={processPayment}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                 >
//                   Confirm Payment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart, User, CreditCard, X, Filter, ChevronDown, Clock, CheckCircle, Package, ChevronUp } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  popularity: number;
}

interface CartItem extends Product {
  quantity: number;
}

// Mock data with popularity scores
const products: Product[] = [
  { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'Electronics', stock: 15, image: '📱', popularity: 95 },
  { id: 2, name: 'MacBook Air', price: 1299, category: 'Electronics', stock: 8, image: '💻', popularity: 88 },
  { id: 3, name: 'AirPods Pro', price: 249, category: 'Electronics', stock: 25, image: '🎧', popularity: 92 },
  { id: 4, name: 'Nike Air Max', price: 120, category: 'Shoes', stock: 30, image: '👟', popularity: 78 },
  { id: 5, name: 'Coffee Mug', price: 15, category: 'Home', stock: 50, image: '☕', popularity: 65 },
  { id: 6, name: 'Backpack', price: 79, category: 'Accessories', stock: 20, image: '🎒', popularity: 72 },
  // Add more products to simulate 30,000+ items
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 7,
    name: `Product ${i + 7}`,
    price: Math.floor(Math.random() * 500) + 10,
    category: ['Electronics', 'Shoes', 'Home', 'Accessories'][Math.floor(Math.random() * 4)],
    stock: Math.floor(Math.random() * 50) + 1,
    image: '📦',
    popularity: Math.floor(Math.random() * 100) + 1
  }))
];

const categories = ['All', 'Electronics', 'Shoes', 'Home', 'Accessories', 'Car', 'Smart Home', 'Smart Watch', 'Smart Phone', 'Smart TV'];

export function POS() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close cart when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCartOpen && cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

  // Cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add to cart with notification
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

    // Show notification
    setLastAddedItem(product.name);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 2000);

    // Add to recent searches
    if (!recentSearches.includes(product.name)) {
      setRecentSearches(prev => [product.name, ...prev.slice(0, 4)]);
    }

    // Auto-open cart on mobile when adding first item
    if (window.innerWidth < 1024 && totalItems === 0) {
      setIsCartOpen(true);
    }
  };

  // Quick add from recent searches
  const quickAddFromRecent = (productName: string) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      addToCart(product);
      setSearchTerm('');
    }
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
    setIsCartOpen(false);
  };

  // Process payment
  const processPayment = () => {
    setTimeout(() => {
      alert(`Payment successful! Total: $${finalTotal.toFixed(2)}`);
      clearCart();
      setIsCheckoutOpen(false);
    }, 1000);
  };

  // Popular products (top 3 by popularity)
  const popularProducts = products
    .filter(p => p.popularity > 80)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0"> {/* Added padding bottom for mobile cart */}
      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-5 w-5" />
          <span>{lastAddedItem} added to cart!</span>
        </div>
      )}

      {/* POS Header */}
      {/* <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">QuickPOS</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Fast and easy checkout system</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">$2,847.50</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 sm:px-6">
        {/* Products Section */}
        <div className="flex-1 min-w-0">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
            <div className="space-y-4">
              {/* Main Search */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search products by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && searchTerm === '' && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">Recent:</span>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => quickAddFromRecent(search)}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          {search} +
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="truncate">{selectedCategory}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {/* Category Search */}
                      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                          <input
                            type="text"
                            placeholder="Search categories..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="w-full pl-7 pr-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Category List */}
                      <div className="py-1">
                        {filteredCategories.map(category => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowCategoryDropdown(false);
                              setCategorySearch('');
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              selectedCategory === category ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Package className="h-4 w-4" />
                  <span>{filteredProducts.length} products found</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="popularity">Popular</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Products */}
          {searchTerm === '' && selectedCategory === 'All' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Popular Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {popularProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-4 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{product.image}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                          {product.name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-bold">${product.price}</p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                        Hot
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => addToCart(product)}
              >
                <div className="text-3xl text-center mb-2 group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate text-sm">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : product.stock > 5
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {product.stock} left
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-green-500 h-1 rounded-full" 
                    style={{ width: `${product.popularity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try changing your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Desktop Cart Section - Hidden on mobile */}
        <div className="hidden lg:block lg:w-80 xl:w-96 mt-4 lg:mt-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 sticky top-4 sm:top-6 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Current Order
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>

              {/* Customer Info */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Customer
                </label>
                <input
                  type="text"
                  placeholder="Walk-in customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Add products to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, -1);
                          }}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, 1);
                          }}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="ml-1 text-red-600 hover:text-red-700 transition-colors"
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4 bg-gray-50 dark:bg-gray-800/50">
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
                <div className="flex justify-between text-lg font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span>Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ${finalTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Cart Summary - Fixed at bottom */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-40">
          {/* Cart Summary Bar */}
          <div 
            className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                  <p className="text-blue-100 text-sm">Total: ${finalTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-100">{isCartOpen ? 'Close' : 'View Cart'}</span>
                <ChevronUp className={`h-5 w-5 transform transition-transform ${isCartOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {/* Expandable Cart Details */}
          {isCartOpen && (
            <div ref={cartRef} className="max-h-60 overflow-y-auto bg-white dark:bg-gray-900">
              {/* Customer Info */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Customer
                </label>
                <input
                  type="text"
                  placeholder="Walk-in customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Cart Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, -1);
                          }}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, 1);
                          }}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="ml-1 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg mt-4"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Checkout ${finalTotal.toFixed(2)}
                </button>

                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-red-600 hover:text-red-700 text-sm flex items-center justify-center transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty Cart Mobile Button */}
      {totalItems === 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-40 p-4">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <ShoppingCart className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Cart is empty</p>
            <p className="text-xs">Add products to get started</p>
          </div>
        </div>
      )}

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
                      className={`p-3 border rounded-lg text-center capitalize transition-colors ${
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
                  <span>{totalItems}</span>
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
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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