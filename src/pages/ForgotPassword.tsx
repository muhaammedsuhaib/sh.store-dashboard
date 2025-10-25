import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MainHeader from "../components/common/MainHeader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setEmail("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
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
              Check your email
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              We've sent a password reset link to your email address
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Success Message */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Reset link sent!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                We've sent a password reset link to{" "}
                <strong className="text-slate-900 dark:text-white">
                  {email}
                </strong>
                . Please check your inbox and follow the instructions.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleReset}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Resend reset link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <Link
                  to="/sign-in"
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>

              {/* Help Text */}
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Didn't receive the email? Check your spam folder or try again
                with a different email address.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Mobile Info */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <MainHeader
        title="Reset your password"
        subtitle="Enter your email address and we'll send you a reset link"
      />
      <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-sm sm:text-base">
                      Sending reset link...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base">
                      Send reset link
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/sign-in"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong className="font-semibold">Note:</strong> The reset link
              will expire in 1 hour for security reasons. If you don't see the
              email, please check your spam folder.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Mobile Info */}
      <div className="mt-8 text-center sm:hidden">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Need help?{" "}
          <a
            href="/support"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
