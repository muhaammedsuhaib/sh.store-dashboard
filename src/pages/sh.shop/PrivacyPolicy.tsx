import { useState } from "react";
import { ArrowLeft, Shield, Lock, Database } from "lucide-react";
import { Button } from "../../components/common/Button";

export default function PrivacyPolicy() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Privacy Policy
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
                <p className="text-slate-700 dark:text-slate-300">
                  At SH.Shop, we are committed to protecting your privacy and
                  personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you use our shop management system.
                </p>
              </section>

              {/* Information Collection */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  2. Information We Collect
                </h2>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-4 mb-3">
                  Personal Information
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-4">
                  <li>• Name, email address, and phone number</li>
                  <li>• Business information and shop details</li>
                  <li>• Billing and payment information</li>
                  <li>• Customer data you input into the system</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-4 mb-3">
                  Usage Data
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• IP address and browser type</li>
                  <li>• Pages visited and features used</li>
                  <li>• Transaction history and sales data</li>
                  <li>• Inventory and stock information</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Service Provision",
                      description: "To provide and maintain SH.Shop services",
                    },
                    {
                      title: "Customer Support",
                      description:
                        "To respond to your inquiries and provide support",
                    },
                    {
                      title: "Business Analytics",
                      description:
                        "To analyze usage patterns and improve our services",
                    },
                    {
                      title: "Security",
                      description:
                        "To protect against fraud and unauthorized access",
                    },
                    {
                      title: "Communication",
                      description:
                        "To send important updates and notifications",
                    },
                    {
                      title: "Legal Compliance",
                      description:
                        "To comply with legal obligations and regulations",
                    },
                  ].map((use, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {use.title}
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {use.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  4. Data Sharing & Disclosure
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  We do not sell your personal information. We may share
                  information with:
                </p>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Service Providers:</strong> Trusted third parties
                      who assist in operating our platform
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Business Transfers:</strong> In connection with
                      mergers or acquisitions
                    </span>
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-blue-600" />
                  5. Data Security
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  We implement appropriate security measures to protect your
                  personal information:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                  {[
                    "SSL encryption for data transmission",
                    "Secure server infrastructure",
                    "Regular security audits",
                    "Access controls and authentication",
                    "Data backup and recovery",
                    "Employee privacy training",
                  ].map((measure, index) => (
                    <div key={index} className="flex items-center">
                      <Lock className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm">{measure}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  6. Your Data Protection Rights
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    You have the right to access, correct, delete, or restrict
                    processing of your personal data. Contact us at{" "}
                    <strong>privacy@sh.shop</strong> to exercise these rights.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  7. Data Retention
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  We retain personal data only as long as necessary for the
                  purposes outlined in this policy, or as required by law.
                  Typically, we retain data for the duration of your active
                  account plus 3 years for legal and compliance purposes.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  8. Cookies & Tracking
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  We use cookies and similar technologies to enhance user
                  experience, analyze trends, and administer the platform. You
                  can control cookie preferences through your browser settings.
                </p>
              </section>

              {/* International Transfers */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  Your data may be transferred to and processed in countries
                  other than your own. We ensure appropriate safeguards are in
                  place to protect your data during international transfers.
                </p>
              </section>

              {/* Changes to Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  We may update this Privacy Policy periodically. We will notify
                  you of significant changes by email or through platform
                  notifications. Continued use after changes constitutes
                  acceptance.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  11. Contact Us
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  For privacy-related questions or concerns, contact our Data
                  Protection Officer at:{" "}
                  <a
                    href="mailto:privacy@sh.shop"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    privacy@sh.shop
                  </a>
                </p>
              </section>
            </div>
          </div>

          {/* Acceptance Section */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-start space-x-3">
              <input
                id="accept-privacy"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 mt-1 flex-shrink-0"
              />
              <label
                htmlFor="accept-privacy"
                className="block text-sm text-slate-700 dark:text-slate-300 leading-5"
              >
                I have read and understood this Privacy Policy. I consent to the
                collection, use, and disclosure of my personal information as
                described herein.
              </label>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                fullWidth
                disabled={!accepted}
                className="py-3"
                onClick={() =>
                  (window.location.href = "/sign-up?privacyAccepted=true")
                }
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
            Questions about your privacy?{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Contact our privacy team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
