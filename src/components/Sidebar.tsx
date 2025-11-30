import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  // Home,
  X,
  Package,
  ShoppingCart,
  Users,
  LineChart,
  // Settings as SettingsIcon,
  Store,
  Boxes,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type NavItem =
  | {
      title: string;
      icon: any;
      hasDropdown: false;
      to: string;
      badge?: number;
    }
  | {
      title: string;
      icon: any;
      hasDropdown: true;
      dropdownItems: {
        label: string;
        to: string;
        badge?: number;
      }[];
    };

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isExpanded = isOpen || isHovering;

  const navItems: NavItem[] = [
    // add pos
    {
      title: "Dashboard",
      icon: LineChart,
      hasDropdown: false,
      to: "/dashboard",
      // badge: 5,
    },
    {
      title: "POS",
      icon: Store,
      hasDropdown: false,
      to: "/pos",
    },
    {
      // title: "Orders",
      // icon: ShoppingCart,
      // hasDropdown: false,
      // // dropdownItems: [
      // //   { label: "All Orders", to: "/orders", badge: 24 },
      // //   { label: "Pending", to: "/orders/pending", badge: 8 },
      // //   { label: "Completed", to: "/orders/completed" },
      // //   { label: "Cancelled", to: "/orders/cancelled" },
      // // ],
      title: "Orders",
      icon: ShoppingCart,
      hasDropdown: false,
      to: "/orders",
      // badge: 5,
    },
    // {
    //   title: "Customer Management",
    //   icon: Users,
    //   hasDropdown: false,
    //   to: "/customers",
    // },
    {
      title: "Customers",
      icon: Users,
      hasDropdown: false,
      to: "/customers",
      // dropdownItems: [
      //   { label: "Customer List", to: "/customers", badge: 156 },
      //   { label: "Debt", to: "/customers/debt" },
      //   // { label: "Segments", to: "/customers/segments" },
      //   // { label: "Reviews", to: "/customers/reviews" },
      // ],
    },

    {
      title: "Products",
      icon: Package,
      hasDropdown: true,
      dropdownItems: [
        { label: "All Products", to: "/products", badge: 12 },
        { label: "Add Product", to: "/products/new" },
        // { label: "Categories", to: "/products/categories", badge: 3 },
        // { label: "Inventory", to: "/products/inventory" },
      ],
    },
    {
      title: "Categories",
      icon: Boxes,
      hasDropdown: true,
      dropdownItems: [
        { label: "All categories", to: "/categories", badge: 12 },
        { label: "Add category", to: "/category/new" },
        { label: "", to: "/category/edit" },
      ],
    },
    // {
    //   title: "Settings",
    //   icon: SettingsIcon,
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { label: "General", to: "/settings" },
    //     { label: "Security", to: "/settings/security" },
    //     { label: "Notifications", to: "/settings/notifications" },
    //     { label: "Billing", to: "/settings/billing" },
    //   ],
    // },
  ];

  // Auto-open dropdown that contains current route
  useEffect(() => {
    for (const item of navItems) {
      if (item.hasDropdown) {
        const match = item.dropdownItems.some(
          (dropdownItem) =>
            location.pathname === dropdownItem.to ||
            location.pathname.startsWith(dropdownItem.to + "/")
        );
        if (match) {
          setActiveDropdown(item.title);
          return;
        }
      }
    }
    setActiveDropdown("");
  }, [location.pathname]);

  // Close sidebar when clicking on mobile
  const handleNavigation = (to: string) => {
    navigate(to);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector("aside");
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const renderBadge = (count?: number) => {
    if (!count) return null;
    return (
      <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
        {count > 99 ? "99+" : count}
      </span>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isExpanded ? "w-64" : "w-16"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-300 `}>
              <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                <img
                  src="/brand-images/logo.jpg"
                  alt="Sh.shop"
                  className="w-6 h-6 rounded"
                />
              </div>
              <h1
                className={`ml-3 font-bold text-xl text-slate-900 dark:text-white whitespace-nowrap  ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                Sh.shop
              </h1>
            </div>

            {isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = item.hasDropdown
              ? item.dropdownItems.some(
                  (dropdownItem) =>
                    location.pathname === dropdownItem.to ||
                    location.pathname.startsWith(dropdownItem.to + "/")
                )
              : location.pathname === item.to ||
                location.pathname.startsWith(item.to + "/");

            const Icon = item.icon;

            return (
              <div key={item.title} className="mb-1">
                {/* Main Nav Item */}
                <div
                  className={`
                    mx-2 rounded-lg transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <div
                    className="flex items-center justify-between p-3"
                    onClick={() => {
                      if (item.hasDropdown && isExpanded) {
                        setActiveDropdown(
                          activeDropdown === item.title ? "" : item.title
                        );
                      } else if (!item.hasDropdown) {
                        handleNavigation(item.to);
                      } else if (!isExpanded) {
                        handleNavigation(item.dropdownItems[0].to);
                      }
                    }}
                  >
                    <div className="flex items-center min-w-0">
                      <Icon
                        size={20}
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />

                      <span
                        className={`
                          ml-3 font-medium whitespace-nowrap transition-all duration-300
                          ${
                            isExpanded
                              ? "opacity-100 max-w-full"
                              : "opacity-0 max-w-0"
                          }
                        `}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!item.hasDropdown && renderBadge(item.badge)}

                      {item.hasDropdown && isExpanded && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.title ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                {item.hasDropdown &&
                  isExpanded &&
                  activeDropdown === item.title && (
                    <div className="mt-1 ml-4 overflow-hidden animate-slideDown">
                      {item.dropdownItems.map((dropdownItem) => {
                        const isDropdownItemActive =
                          location.pathname === dropdownItem.to;
                        return (
                          <div
                            key={dropdownItem.label}
                            className={`
                            mx-2 rounded-lg transition-all duration-200 cursor-pointer mb-1
                            ${
                              isDropdownItemActive
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }
                          `}
                            onClick={() => handleNavigation(dropdownItem.to)}
                          >
                            <div className="flex items-center justify-between p-2 pl-8">
                              <span className="text-sm font-medium whitespace-nowrap">
                                {dropdownItem.label}
                              </span>
                              {renderBadge(dropdownItem.badge)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>

        {/* User Profile (Optional) */}
        {/* {isExpanded && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  U
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  User Name
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        )} */}
      </aside>
    </>
  );
}
