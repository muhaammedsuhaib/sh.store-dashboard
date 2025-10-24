import { useState } from "react";
import {
  //   Search,
  Phone,
  Mail,
  MessageCircle,
  //   Clock,
  //   Users,
  //   FileText,
  //   Video,
  //   BookOpen,
  //   ChevronRight,
  //   Star,
  //   CheckCircle,
  //   AlertCircle,
  //   HelpCircle,
  //   Lightbulb,
  //   Zap,
  //   Shield,
  //   CreditCard,
  //   Package,
  //   BarChart3,
  //   Smartphone,
  //   Globe
} from "lucide-react";
import { Button } from "../../components/common/Button";

// Dummy data for support categories
// const supportCategories = [
//   {
//     id: 1,
//     title: "Getting Started",
//     description: "New to SH.Shop? Learn the basics",
//     icon: Zap,
//     color: "from-blue-500 to-cyan-500",
//     articles: 12
//   },
//   {
//     id: 2,
//     title: "Account & Billing",
//     description: "Manage your account and payments",
//     icon: CreditCard,
//     color: "from-green-500 to-emerald-500",
//     articles: 8
//   },
//   {
//     id: 3,
//     title: "POS System",
//     description: "Point of Sale setup and usage",
//     icon: Smartphone,
//     color: "from-purple-500 to-pink-500",
//     articles: 15
//   },
//   {
//     id: 4,
//     title: "Inventory Management",
//     description: "Stock tracking and management",
//     icon: Package,
//     color: "from-orange-500 to-red-500",
//     articles: 10
//   },
//   {
//     id: 5,
//     title: "E-commerce Setup",
//     description: "Online store configuration",
//     icon: Globe,
//     color: "from-indigo-500 to-blue-500",
//     articles: 14
//   },
//   {
//     id: 6,
//     title: "Reports & Analytics",
//     description: "Understanding your business data",
//     icon: BarChart3,
//     color: "from-teal-500 to-green-500",
//     articles: 9
//   }
// ];

// Dummy data for FAQ
// const faqItems = [
//   {
//     id: 1,
//     question: "How do I set up my POS system?",
//     answer: "To set up your POS system, go to Settings → POS Setup. Connect your barcode scanner, receipt printer, and cash drawer. Run a test transaction to ensure everything works properly.",
//     category: "POS System",
//     views: 1247
//   },
//   {
//     id: 2,
//     question: "Can I use SH.Shop on multiple devices?",
//     answer: "Yes, SH.Shop supports multi-device access. You can install it on up to 5 devices per account. All data syncs automatically across devices.",
//     category: "Account & Billing",
//     views: 892
//   },
//   {
//     id: 3,
//     question: "How do I manage low stock alerts?",
//     answer: "Navigate to Inventory → Stock Settings. Set minimum stock levels for each product. You'll receive automatic alerts when stock runs low.",
//     category: "Inventory Management",
//     views: 756
//   },
//   {
//     id: 4,
//     question: "What payment methods are supported?",
//     answer: "SH.Shop supports cash, credit/debit cards, UPI, mobile wallets, and online payment gateways like Razorpay and Stripe.",
//     category: "Account & Billing",
//     views: 1103
//   },
//   {
//     id: 5,
//     question: "How do I create an online store?",
//     answer: "Go to E-commerce → Store Setup. Choose a template, add your products, and configure payment and shipping options. Your store will be live instantly.",
//     category: "E-commerce Setup",
//     views: 634
//   }
// ];

// Dummy data for popular articles
// const popularArticles = [
//   {
//     id: 1,
//     title: "Setting Up Your First Product",
//     category: "Getting Started",
//     reads: 2450,
//     rating: 4.8,
//     duration: "5 min read"
//   },
//   {
//     id: 2,
//     title: "Understanding Sales Reports",
//     category: "Reports & Analytics",
//     reads: 1890,
//     rating: 4.6,
//     duration: "8 min read"
//   },
//   {
//     id: 3,
//     title: "Mobile App Installation Guide",
//     category: "Getting Started",
//     reads: 1670,
//     rating: 4.9,
//     duration: "3 min read"
//   },
//   {
//     id: 4,
//     title: "Inventory Best Practices",
//     category: "Inventory Management",
//     reads: 1420,
//     rating: 4.7,
//     duration: "10 min read"
//   }
// ];

// Dummy data for support team
// const supportTeam = [
//   {
//     id: 1,
//     name: "Sarah Chen",
//     role: "Senior Support Specialist",
//     expertise: ["POS Setup", "Hardware Integration"],
//     availability: "Available",
//     avatar: "/avatars/sarah.jpg",
//     rating: 4.9
//   },
//   {
//     id: 2,
//     name: "Mike Rodriguez",
//     role: "E-commerce Expert",
//     expertise: ["Online Store", "Payment Gateways"],
//     availability: "Available",
//     avatar: "/avatars/mike.jpg",
//     rating: 4.8
//   },
//   {
//     id: 3,
//     name: "Emily Watson",
//     role: "Inventory Specialist",
//     expertise: ["Stock Management", "Supplier Integration"],
//     availability: "Busy",
//     avatar: "/avatars/emily.jpg",
//     rating: 4.7
//   }
// ];

export default function Support() {
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [activeCategory, setActiveCategory] = useState("all");
  const [showContactForm, setShowContactForm] = useState(false);

  //   const filteredFAQs = faqItems.filter(item =>
  //     item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.category.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            {/* <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How can we help you?
            </h1> */}

            {/* <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              Get answers, guides, and expert support for your SH.Shop platform
            </p> */}

            {/* Search Bar */}
            {/* <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for answers, features, or issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div> */}
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/brand-images/logo.jpg"
                  alt="Sh.shop"
                  className="w-10 h-10 rounded-lg"
                />
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Welcome to Sh.Shop Support
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your all-in-one solution to streamline your retail operations
                and boost sales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Instant help from our support team
            </p>
            {/* <Button className="w-full">
              Start Chat
            </Button> */}
            <a
              href="https://wa.me/+918086600582?text=Hello%20Sh.Shop%20Support%2C%20I%20need%20assistance%20with%20..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">Start Chat</Button>
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Call Support
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Mon-Fri, 9AM-6PM your local time
            </p>
            {/* call number  */}
            {/* <Button variant="outline" className="w-full">
              +1 (555) 123-4567
            </Button> */}
            <a href="tel:+918086600582">
              <Button variant="outline" className="w-full">
                +91 80866 00582
              </Button>
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              We'll respond within 2 hours
            </p>
            {/* <Button variant="outline" className="w-full">
              support@sh.shop
            </Button> */}
            <a href="mailto:muhammedsuhaibpottayil@gmail.com">
              <Button variant="outline" className="w-full">
                support@sh.shop
              </Button>
            </a>
          </div>
        </div>

        {/* Support Categories */}
        {/* <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Support Categories
            </h2>
            <Button variant="outline" className="hidden sm:flex">
              View All Categories
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      {category.articles} articles
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* Popular Articles */}
        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Popular Help Articles
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.duration}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {article.reads.toLocaleString()} reads
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {article.rating}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* FAQ Section */}
        {/* <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="flex space-x-2">
              <Button
                variant={activeCategory === "all" ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
              >
                All
              </Button>
              {Array.from(new Set(faqItems.map(item => item.category))).map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {(activeCategory === "all" ? filteredFAQs : filteredFAQs.filter(item => item.category === activeCategory))
              .map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 mr-3">
                          {faq.category}
                        </span>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {faq.views.toLocaleString()} views
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4 flex-shrink-0">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section> */}

        {/* Support Team */}
        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Meet Our Support Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  {member.role}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(member.rating)
                            ? "text-yellow-500 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2">
                      {member.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  member.availability === "Available"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    member.availability === "Available" ? "bg-green-500" : "bg-yellow-500"
                  }`} />
                  {member.availability}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Additional Resources */}
        {/* <section className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-blue-200 text-lg mb-6 max-w-2xl mx-auto">
              Our dedicated support team is here to help you get the most out of SH.Shop
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => setShowContactForm(true)}
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </section> */}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Support
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Please describe your issue in detail..."
                />
              </div>
              <div className="flex gap-3">
                <Button
                  fullWidth
                  onClick={() => setShowContactForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button fullWidth>Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
