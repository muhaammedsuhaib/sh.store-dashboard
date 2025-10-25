import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Smartphone,
  Lock,
  ArrowRight,
} from "lucide-react";
import { ButtonLoader } from "../components/common/Loader";
import { Button } from "../components/common/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserSignup } from "../api/auth";
import toast from "react-hot-toast";
import { setLoginToken } from "../utils/helper";
import MainHeader from "../components/common/MainHeader";

// Define form data type
interface SignUpFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // React Query mutation hook
  const { mutate: signupMutate, isPending: signupLoading } = useUserSignup();
  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    // 🧠 Prepare and sanitize payload
    const payload = {
      name: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phoneNumber.replace(/\s+/g, "").trim(),
      password: data.password,
    };

    // 🚀 Trigger signup mutation
    signupMutate(payload, {
      onSuccess: (response: any) => {
        // 💾 Save token & redirect
        if (response?.token) {
          try {
            setLoginToken(response.token);

            toast.success("Welcome 🎉 Login successful!", {
              duration: 4000,
              style: {
                borderRadius: "10px",
                background: "#1e293b",
                color: "#fff",
                fontWeight: 500,
              },
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            });

            // ✅ Slight delay before redirect to avoid flicker
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1000);
          } catch (tokenErr) {
            toast.error("Session storage error. Please login again.", {
              duration: 4000,
              style: {
                borderRadius: "8px",
                background: "#7f1d1d",
                color: "#fff",
              },
            });
          }
        } else {
          toast.success("Signup completed successfully 🎉", {
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#1e293b",
              color: "#fff",
            },
          });
        }
      },

      onError: (err: any) => {
        // 🧾 Extract proper error message
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.";

        // 🛠️ Set field-level form error
        setError("root", { message: errorMessage });

        // ⚠️ Toast notification
        toast.error(errorMessage, {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#7f1d1d",
            color: "#fff",
            fontWeight: 500,
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        });
      },
    });
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <MainHeader
        title="Join Sh.shop"
        subtitle="Create your account and start growing your business today"
      />

      {/* Form Container */}
      <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
          <form
            className="space-y-4 sm:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Full name must be less than 50 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Full name can only contain letters and spaces",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number format",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        "Password must contain uppercase, lowercase, number and special character",
                    },
                  })}
                  className={`block w-full pl-10 pr-11 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Create a strong password"
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`block w-full pl-10 pr-11 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Confirm your password"
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
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 mt-1 flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="block text-sm text-slate-700 dark:text-slate-300 leading-5"
              >
                I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.terms.message}
              </p>
            )}

            {/* Server Error */}
            {errors.root && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.root.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                disabled={signupLoading}
                className="py-3.5 px-4"
              >
                {signupLoading ? (
                  <div className="flex items-center">
                    <ButtonLoader />
                    <span className="text-sm sm:text-base ml-2">
                      {" "}
                      Creating...{" "}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-sm sm:text-base">Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center"
              >
                Sign in now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info for Mobile */}
      <div className="mt-8 text-center sm:hidden">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          By creating an account, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}
