import { useState } from "react";
import { ArrowLeft, Shield, FileText, CheckCircle } from "lucide-react";
import { Button } from "../../components/common/Button";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <a
            href="/sign-up"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </a>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Scrollable Content */}
          <div className="h-[60vh] overflow-y-auto p-6 sm:p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-600" />
                  1. Introduction
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Welcome to SH.Shop ("we," "our," or "us"). These Terms and Conditions govern your use of the SH.Shop Smart Shop Management System, including all features, content, and services provided.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  By accessing or using SH.Shop, you agree to be bound by these Terms. If you disagree with any part, you may not access our services.
                </p>
              </section>

              {/* Account Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  2. Account Registration
                </h2>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>You must be at least 18 years old to create an account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Provide accurate, complete, and current registration information</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Notify us immediately of any unauthorized access</span>
                  </li>
                </ul>
              </section>

              {/* Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  3. Services Description
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  SH.Shop provides a comprehensive shop management system including:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[
                    "POS System & Checkout",
                    "Inventory Management",
                    "E-commerce Platform",
                    "Customer CRM",
                    "Order Management",
                    "Analytics Dashboard",
                    "Stock Alerts",
                    "Multi-branch Support"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Payments */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  4. Payments & Billing
                </h2>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li>Subscription fees are billed in advance</li>
                  <li>All fees are exclusive of applicable taxes</li>
                  <li>Payment processing through secure third-party providers</li>
                  <li>No refunds for partial subscription periods</li>
                </ul>
              </section>

              {/* Data Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  5. Data Privacy
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  We collect and process personal data in accordance with our Privacy Policy. By using SH.Shop, you consent to such processing.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  All content, features, and functionality of SH.Shop are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  7. Termination
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  We may terminate or suspend your account immediately for violations of these Terms. Upon termination, your right to use SH.Shop will cease immediately.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  SH.Shop shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes. Continued use after changes constitutes acceptance.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  10. Contact Information
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  For questions about these Terms, contact us at:{" "}
                  <a href="mailto:legal@sh.shop" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    legal@sh.shop
                  </a>
                </p>
              </section>
            </div>
          </div>

          {/* Acceptance Section */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-start space-x-3">
              <input
                id="accept-terms"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 mt-1 flex-shrink-0"
              />
              <label htmlFor="accept-terms" className="block text-sm text-slate-700 dark:text-slate-300 leading-5">
                I have read, understood, and agree to be bound by these Terms and Conditions. 
                I acknowledge that I am responsible for reviewing these Terms periodically for updates.
              </label>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                fullWidth
                disabled={!accepted}
                className="py-3"
                onClick={() => window.location.href = '/sign-up?accepted=true'}
              >
                Accept & Continue
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="py-3"
                onClick={() => window.history.back()}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Need help understanding these terms?{" "}
            <a href="/support" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}