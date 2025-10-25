import { useForm } from "react-hook-form";
import { Eye, EyeOff, Smartphone, Lock, ArrowRight } from "lucide-react";
import { ButtonLoader } from "../components/common/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserLogin } from "../api/auth";
import { setLoginToken } from "../utils/helper";
import toast from "react-hot-toast";
import { Button } from "../components/common/Button";
import MainHeader from "../components/common/MainHeader";

// Define form data type
interface SignInFormData {
  phoneNumber: string;
  password: string;
  rememberMe: boolean;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  // React Query mutation hook
  const { mutate: loginMutate, isPending: loginLoading } = useUserLogin();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    // 🧠 Prepare and sanitize payload
    const payload = {
      phone: data.phoneNumber.replace(/\s+/g, "").trim(),
      password: data.password,
      remember_me: data.rememberMe,
    };

    // 🚀 Trigger signup mutation
    loginMutate(payload, {
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
          toast.success("Login completed successfully 🎉", {
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
        title="Welcome back"
        subtitle="Enter your phone number and password to access your account"
      />
      {/* Form Container */}
      <div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 px-4 sm:px-8 shadow-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800">
          <form
            className="space-y-5 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    validate: {
                      validPhone: (value) => {
                        const digitsOnly = value.replace(/\D/g, "");
                        return (
                          digitsOnly.length >= 10 ||
                          "Please enter a valid phone number"
                        );
                      },
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-11 py-3 text-slate-900 dark:text-white placeholder-slate-500 bg-white dark:bg-slate-800 border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-transparent"
                  } rounded-xl focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Enter your password"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Server Error */}
            {errors.root && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  {errors.root.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              {/* <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loginLoading ? (
                  <div className="flex items-center">
                    <ButtonLoader />
                    <span className="text-sm sm:text-base ml-2">
                      Signing in...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base">Sign in</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button> */}
              <Button
                type="submit"
                fullWidth
                disabled={loginLoading}
                className="py-3.5 px-4"
              >
                {loginLoading ? (
                  <div className="flex items-center">
                    <ButtonLoader />
                    <span className="text-sm sm:text-base ml-2">
                      {" "}
                      Signing in...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-sm sm:text-base">Sign in</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Divider - Uncomment if you want social login */}
          {/*
          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2 hidden sm:inline">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="ml-2 hidden sm:inline">Twitter</span>
              </button>
            </div>
          </div>
          */}

          {/* Sign Up Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center"
              >
                Sign up now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info for Mobile */}
      <div className="mt-8 text-center sm:hidden">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Need help?{" "}
          <Link
            to="/support"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
