// components/common/NotFound.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertCircle, 
  Globe,
  Compass,
  Satellite,
  Rocket
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface NotFoundProps {
  title?: string;
  description?: string;
  showSearch?: boolean;
  showQuickLinks?: boolean;
  customLinks?: Array<{ path: string; label: string; icon: React.ComponentType<any> }>;
}

export default function NotFound({
  title = "Lost in Space?",
  description = "The page you're looking for seems to have drifted off into the digital cosmos. Let's get you back on track.",
  showSearch = false,
  showQuickLinks = true,
  customLinks
}: NotFoundProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const defaultLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/products', label: 'Products', icon: Globe },
    { path: '/categories', label: 'Categories', icon: Compass },
    { path: '/orders', label: 'Orders', icon: Rocket },
  ];

  const quickLinks = customLinks || defaultLinks;

  const suggestedSearches = [
    'Dashboard',
    'Products',
    'Categories', 
    'Orders',
    'Customers',
    'Settings'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement your search logic here
      console.log('Searching for:', searchQuery);
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    // Auto-trigger search or navigate
    console.log('Quick search:', query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Animated Space Illustration */}
          <div className="relative flex justify-center mb-8">
            <div className="relative">
              {/* Orbiting planets */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-6 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              
              {/* Main Planet */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Planet rings */}
                <div className="absolute w-32 h-1 bg-blue-400/30 rotate-45 rounded-full"></div>
                <div className="absolute w-28 h-1 bg-indigo-400/20 -rotate-12 rounded-full"></div>
                
                {/* 404 Text */}
                <span className="text-2xl font-bold text-white relative z-10">404</span>
              </div>
            </div>
          </div>

          {/* Error Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-3 rounded-full flex items-center shadow-sm">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="font-medium">Page not found</span>
              <span className="mx-2 text-red-400">•</span>
              <code className="text-sm bg-red-200/50 dark:bg-red-800/30 px-2 py-1 rounded">
                {location.pathname}
              </code>
            </div>
          </div>
          
          {/* Main Title & Description */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/50 p-8 lg:p-12">
          {/* Search Section */}
          {showSearch && (
            <div className="mb-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Find Your Way
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Search our site or try one of these popular destinations
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-32 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="What are you looking for?"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="rounded-xl"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>

              {/* Suggested Searches */}
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedSearches.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(suggestion)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Links */}
          {showQuickLinks && (
            <div className="mb-10">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Quick Navigation
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Get back to familiar territory
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={index}
                      to={link.path}
                      className="group p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
                    >
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button
                variant="primary"
                icon={Home}
                className="w-full justify-center py-4 text-lg rounded-2xl hover:scale-105 transition-transform duration-200"
                size="lg"
              >
                Go to Dashboard
              </Button>
            </Link>
            
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              icon={ArrowLeft}
              className="flex-1 justify-center py-4 text-lg rounded-2xl hover:scale-105 transition-transform duration-200"
              size="lg"
            >
              Go Back
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <Satellite className="h-4 w-4" />
              <span>Need assistance navigating?</span>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>

        {/* Footer Illustration */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 shadow-inner">
              <Rocket className="w-8 h-8 text-slate-400 animate-bounce" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Even the best explorers need a map sometimes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}