import { useEffect, useState } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  logo?: string;
  logoSize?: number;
  className?: string;
  useDefaultLogo?: boolean;
}

const DEFAULT_LOGO_PATHS = ["/brand-images/logo.jpg"];

export function Loader({
  size = "md",
  text,
  fullScreen = false,
  overlay = false,
  logo,
  className = "",
  useDefaultLogo = true,
}: LoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [logoPath, setLogoPath] = useState<string | null>(null);

  // Auto-detect logo from public directory
  useEffect(() => {
    const findLogo = async () => {
      if (logo) {
        setLogoPath(logo);
        return;
      }

      if (!useDefaultLogo) {
        return;
      }

      let foundLogo = null;
      for (const path of DEFAULT_LOGO_PATHS) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(path);
            img.onerror = () => reject();
            img.src = path;
          });
          foundLogo = path;
          break;
        } catch (error) {
          continue;
        }
      }

      setLogoPath(foundLogo);
    };

    findLogo();
  }, [logo, useDefaultLogo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  };

  const logoSizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  // Perfect center alignment
  const containerClasses = `
    flex items-center justify-center w-screen h-screen absolute top-0 left-0
    ${fullScreen ? "fixed inset-0 w-screen h-screen z-50" : "w-full h-full"}
    ${
      overlay
        ? "absolute inset-0 bg-white dark:bg-slate-950 bg-opacity-90 dark:bg-opacity-90 z-40"
        : ""
    }
    ${className}
  `;

  const contentClasses = `
    flex flex-col items-center justify-center gap-4
    transition-all duration-500 ease-out
    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
  `;

  const spinnerRingClasses = `
    ${sizeClasses[size]}
    animate-spin rounded-full
    border-4 border-solid border-slate-200 dark:border-slate-700
    border-t-blue-600 dark:border-t-blue-400
    absolute
  `;

  return (
    <div className={containerClasses}>
      {/* Main Content */}
      <div className={contentClasses}>
        {/* Circular Loader with Static Logo in Center */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Ring */}
          <div className={spinnerRingClasses} />

          {/* Static Logo in Center */}
          {logoPath && (
            <div
              className={`${logoSizeClasses[size]} flex items-center justify-center z-10`}
            >
              <img
                src={logoPath}
                alt=""
                className="w-full h-full object-contain rounded-full"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          )}
        </div>

        {/* Text */}
        {text && (
          <div className="text-center mt-5 ">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Specialized Loader Components
export function PageLoader({
  customLogo,
  text = "Loading...",
  logoSize = 50,
}: {
  customLogo?: string;
  text?: string;
  logoSize?: number;
}) {
  return (
    <Loader
      fullScreen
      size="lg"
      text={text}
      logo={customLogo}
      logoSize={logoSize}
      className="bg-white dark:bg-slate-950"
      useDefaultLogo={!customLogo}
    />
  );
}

export function AppLoader() {
  return <PageLoader text="Initializing application..." logoSize={60} />;
}

export function AuthLoader() {
  return <PageLoader text="Authenticating..." logoSize={45} />;
}

export function ContentLoader({
  text = "Loading content...",
}: {
  text?: string;
}) {
  return <Loader size="md" text={text} />;
}

export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          size === "sm" ? "w-4 h-4" : "w-5 h-5"
        } animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}
      />
    </div>
  );
}

export function TableLoader({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-slate-200 dark:bg-slate-700 rounded flex-1"
            />
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="px-4 py-3">
            <div className="flex gap-4 items-center">
              {[...Array(5)].map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="h-3 bg-slate-100 dark:bg-slate-800 rounded flex-1"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Clean CSS - Only spin animation
const loaderStyles = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = loaderStyles;
  document.head.appendChild(styleSheet);
}
