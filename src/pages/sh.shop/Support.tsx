// components/pages/Support.tsx
import { useState } from "react";
import { Phone, Mail, MessageCircle, Clock, Users, Star } from "lucide-react";
import { Button } from "../../components/common/Button";
import MainHeader from "../../components/common/MainHeader";

interface SupportCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  action: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  color: string;
  badge?: string;
}

export default function Support() {
  const [showContactForm, setShowContactForm] = useState(false);

  const supportChannels: SupportCard[] = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description:
        "Instant help from our support team. Average response time: 2 minutes",
      action: "Start Chat",
      href: "https://wa.me/+918086600582?text=Hello%20Sh.Shop%20Support%2C%20I%20need%20assistance%20with%20...",
      color: "bg-green-500",
      badge: "Most Popular",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Mon-Fri, 9AM-6PM IST. Direct conversation with our experts",
      action: "+91 80866 00582",
      href: "tel:+918086600582",
      variant: "outline",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description:
        "Detailed assistance with attachments. We'll respond within 2 hours",
      action: "support@sh.shop",
      href: "mailto:muhammedsuhaibpottayil@gmail.com",
      variant: "outline",
      color: "bg-purple-500",
    },
  ];

  const supportStats = [
    { icon: Clock, label: "Response Time", value: "< 2 min" },
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Star, label: "Satisfaction Rate", value: "98%" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <MainHeader
        title="Sh.Shop Support"
        subtitle="Your dedicated partner for seamless retail operations. We're here to help you succeed 24/7."
      />
      {/* Header Section */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              {supportStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200/60 dark:border-slate-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* Badge */}
                {channel.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      {channel.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {channel.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {channel.description}
                  </p>

                  {/* Action Button */}
                  <a
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block"
                  >
                    <Button
                      variant={channel.variant || "primary"}
                      className="w-full justify-center py-3 text-lg rounded-xl hover:scale-105 transition-transform duration-200"
                    >
                      {channel.action}
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Help Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200/60 dark:border-slate-700/50">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Can't find what you're looking for? Send us a detailed message and
              we'll get back to you with a comprehensive solution.
            </p>

            <Button
              onClick={() => setShowContactForm(true)}
              variant="secondary"
              className="px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform duration-200"
            >
              Send Detailed Message
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200/60 dark:border-slate-700/50">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Contact Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We'll get back to you within 2 hours
              </p>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, and what you were trying to accomplish."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setShowContactForm(false)}
                  variant="outline"
                  className="flex-1 justify-center py-3 rounded-xl"
                >
                  Cancel
                </Button>
                <Button className="flex-1 justify-center py-3 rounded-xl hover:scale-105 transition-transform duration-200">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
