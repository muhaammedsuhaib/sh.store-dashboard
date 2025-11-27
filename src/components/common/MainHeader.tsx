import { Link } from "react-router-dom";

const MainHeader = ({
  title = "Welcome back",
  subtitle = "Enter your phone number and password to access your account",
  logo = "/brand-images/logo.jpg",
}) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
          <Link
            to="/"
            className="w-12 h-12 rounded-lg flex items-center justify-center"
          >
            
          <img
            src={logo}
            alt="Sh.shop"
            className="w-10 h-10 rounded-lg object-cover"
          />
          </Link>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default MainHeader;
