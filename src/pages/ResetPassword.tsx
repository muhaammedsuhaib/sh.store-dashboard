import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import MainHeader from "../components/common/MainHeader";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <MainHeader
          title="Password reset successfully!"
          subtitle="Your password has been updated successfully"
        />
        <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Success Message */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                All set!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Your password has been updated successfully. You can now sign in
                with your new password.
              </p>

              {/* Sign In Button */}
              <Link
                to="/sign-in"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign in now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Additional Info */}
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                If you face any issues signing in, try clearing your browser
                cache or contact support.
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
        title="Create new password"
        subtitle={
          email
            ? `Reset password for ${email}`
            : "Enter your new password below"
        }
      />
      <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-11 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-r-xl transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-11 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-50 dark:hover:bg-slate-700 rounded-r-xl transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password requirements:
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
                  Include uppercase and lowercase letters
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
                  Include at least one number
                </li>
              </ul>
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
                      Resetting password...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base">Reset password</span>
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
        </div>
      </div>

      {/* Additional Mobile Info */}
      <div className="mt-8 text-center sm:hidden">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Make sure your new password is strong and unique.
        </p>
      </div>
    </div>
  );
}
