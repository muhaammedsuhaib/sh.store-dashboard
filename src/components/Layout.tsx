import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Loader } from "./common/Loader";
import { useStaff } from "../api/staff/get_staff";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: staff = {} as any, isLoading: staffLoading } = useStaff();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add global CSS for animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-slideDown {
        animation: slideDown 0.2s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  if (staffLoading) {
    return <Loader text="Loading..." />;
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out min-h-screen
          ${sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-16"}
          ${sidebarOpen && isMobile ? "ml-0" : "ml-0"}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="font-semibold text-lg">
                  {" "}
                  {staff?.data?.shop?.name ?? ""}{" "}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {staff?.data?.name ?? ""}!
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Notifications"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {/* Profile image or first letter */}
                {staff?.data?.profile ? (
                  <img
                    src={staff.data.profile}
                    alt={staff.data.name || "Staff"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {staff?.data?.name?.charAt(0)?.toUpperCase() ?? "A"}
                    </span>
                  </div>
                )}

                {/* Staff details with ellipsis */}
                <div className="hidden sm:block max-w-[150px]">
                  <p
                    className="text-sm font-medium truncate"
                    title={staff?.data?.name ?? ""}
                  >
                    {staff?.data?.name ?? ""}
                  </p>
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400 uppercase truncate"
                    title={staff?.data?.role ?? ""}
                  >
                    {staff?.data?.role ?? ""}
                  </p>
                </div>
              </div>

              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content - Use Outlet for nested routes */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* This renders the child routes */}
          </div>
        </main>
      </div>
    </div>
  );
}
