import { useEffect, useState } from "react";
import {
  //   TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  CreditCard,
  AlertCircle,
  //   Calendar,
  ArrowUp,
  ArrowDown,
  //   MoreVertical,
  //   Eye,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";

// Types
interface StatsCard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ComponentType<any>;
  color: "blue" | "emerald" | "violet" | "amber";
}

interface RecentOrder {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  trend: "up" | "down";
}

interface ChartData {
  labels: string[];
  revenue: number[];
  orders: number[];
  customers: number[];
}

// Mock data
const statsCards: StatsCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 12.5,
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: 8.2,
    trend: "up",
    icon: ShoppingCart,
    color: "emerald",
  },
  {
    title: "Total Customers",
    value: "892",
    change: -2.1,
    trend: "down",
    icon: Users,
    color: "violet",
  },
  {
    title: "Products Sold",
    value: "5,678",
    change: 15.3,
    trend: "up",
    icon: Package,
    color: "amber",
  },
];

const recentOrders: RecentOrder[] = [
  {
    id: 1,
    customer: "John Smith",
    product: "Wireless Headphones",
    amount: 129.99,
    status: "completed",
    date: "2024-01-23",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    product: "Smart Watch",
    amount: 199.99,
    status: "pending",
    date: "2024-01-23",
  },
  {
    id: 3,
    customer: "Mike Wilson",
    product: "Mechanical Keyboard",
    amount: 89.99,
    status: "completed",
    date: "2024-01-22",
  },
  {
    id: 4,
    customer: "Emily Davis",
    product: "Fitness Tracker",
    amount: 79.99,
    status: "cancelled",
    date: "2024-01-22",
  },
  {
    id: 5,
    customer: "David Brown",
    product: "Gaming Mouse",
    amount: 49.99,
    status: "completed",
    date: "2024-01-21",
  },
];

const topProducts: TopProduct[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    sales: 234,
    revenue: 30234.66,
    trend: "up",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    sales: 189,
    revenue: 37799.11,
    trend: "up",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    sales: 156,
    revenue: 14039.44,
    trend: "down",
  },
  {
    id: 4,
    name: "Fitness Tracker Pro",
    sales: 143,
    revenue: 11439.57,
    trend: "up",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    sales: 128,
    revenue: 10239.36,
    trend: "up",
  },
];

const chartData: ChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  revenue: [
    12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000,
    45000,
  ],
  orders: [400, 600, 500, 800, 700, 900, 850, 1100, 1000, 1200, 1150, 1300],
  customers: [300, 450, 400, 600, 550, 700, 650, 800, 750, 900, 850, 950],
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: RecentOrder["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  const getColorClasses = (color: StatsCard["color"]) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          icon: "text-blue-600 dark:text-blue-400",
        };
      case "emerald":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          icon: "text-emerald-600 dark:text-emerald-400",
        };
      case "violet":
        return {
          bg: "bg-violet-100 dark:bg-violet-900/30",
          icon: "text-violet-600 dark:text-violet-400",
        };
      case "amber":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          icon: "text-amber-600 dark:text-amber-400",
        };
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-900/30",
          icon: "text-slate-600 dark:text-slate-400",
        };
    }
  };

  const SimpleChart = ({
    data,
    color = "blue",
  }: {
    data: number[];
    color?: string;
  }) => {
    const maxValue = Math.max(...data);
    // const colorClass = `bg-${color}-500`;

    return (
      <div className="flex items-end justify-between h-16 gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className={`flex-1 rounded-t transition-all duration-300 ${
              color === "blue"
                ? "bg-blue-500"
                : color === "emerald"
                ? "bg-emerald-500"
                : color === "violet"
                ? "bg-violet-500"
                : "bg-amber-500"
            }`}
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <Loader text="Loading..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="year">Last year</option>
            </select>
            <Button variant="primary" icon={Download}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = getColorClasses(card.color);

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {card.value}
                    </p>
                    <div
                      className={`flex items-center gap-1 mt-2 text-sm ${
                        card.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {card.trend === "up" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span>
                        {card.trend === "up" ? "+" : ""}
                        {card.change}% from last period
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${colorClasses.icon}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Revenue Overview
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Filter}>
                  Filter
                </Button>
              </div>
            </div>
            <div className="h-64">
              <SimpleChart data={chartData.revenue} color="blue" />
              <div className="flex justify-between mt-4">
                {chartData.labels.map((label, index) => (
                  <div
                    key={index}
                    className="text-xs text-slate-500 dark:text-slate-500"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  $
                  {chartData.revenue[
                    chartData.revenue.length - 1
                  ].toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Current Revenue
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {chartData.orders[chartData.orders.length - 1]}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Current Orders
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {chartData.customers[chartData.customers.length - 1]}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  New Customers
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Top Products
              </h3>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {product.sales} sales
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        product.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {product.trend === "up" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{product.trend === "up" ? "+" : ""}12.5%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Orders
              </h3>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider py-3">
                      Customer
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider py-3">
                      Product
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider py-3">
                      Amount
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                    >
                      <td className="py-3">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {order.customer}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-slate-900 dark:text-white">
                        {order.product}
                      </td>
                      <td className="py-3 font-medium text-slate-900 dark:text-white">
                        ${order.amount}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats & Alerts */}
          <div className="space-y-6">
            {/* Inventory Alerts */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Inventory Alerts
                </h3>
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      Wireless Headphones
                    </div>
                    <div className="text-sm text-amber-600 dark:text-amber-400">
                      Low stock - 5 items left
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Restock
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      Smart Watch Series 5
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400">
                      Out of stock
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Restock
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 dark:text-white">
                      New order #1234 received
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      2 minutes ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 dark:text-white">
                      New customer registration
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      1 hour ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 dark:text-white">
                      Product "Gaming Mouse" updated
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      3 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  98.2%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Payment Success Rate
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  2.3
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Avg. Order Value
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  4.8/5
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
