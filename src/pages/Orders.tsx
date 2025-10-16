import { useState } from "react";
import { Button } from "../components/common/Button";
import { Pagination } from "../components/common/Pagination";
import Modal from "../components/common/Modal";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  //   RefreshCw,
  Package,
  DollarSign,
  //   X,
} from "lucide-react";

// Types
interface Order {
  id: number;
  customer: string;
  email: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: number;
  date: string;
  items: number;
}

// Dummy data
const initialOrders: Order[] = [
  {
    id: 1001,
    customer: "John Smith",
    email: "john.smith@email.com",
    status: "pending",
    total: 120.5,
    date: "2024-06-01",
    items: 3,
  },
  {
    id: 1002,
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "shipped",
    total: 89.99,
    date: "2024-06-02",
    items: 2,
  },
  {
    id: 1003,
    customer: "Mike Wilson",
    email: "mike.wilson@email.com",
    status: "delivered",
    total: 250.0,
    date: "2024-06-03",
    items: 5,
  },
  {
    id: 1004,
    customer: "Emily Davis",
    email: "emily.davis@email.com",
    status: "cancelled",
    total: 0,
    date: "2024-06-04",
    items: 0,
  },
  {
    id: 1005,
    customer: "David Brown",
    email: "david.b@email.com",
    status: "pending",
    total: 75.25,
    date: "2024-06-05",
    items: 1,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "shipped" | "delivered" | "cancelled"
  >("all");
  const [sortBy, setSortBy] = useState<"customer" | "date" | "total">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Omit<Order, "id">>({
    customer: "",
    email: "",
    status: "pending",
    total: 0,
    date: new Date().toISOString().split("T")[0],
    items: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === "total") {
        aValue = a.total;
        bValue = b.total;
      }
      if (sortBy === "date") {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Sort handler
  const handleSort = (field: "customer" | "date" | "total") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Add order
  const handleAddOrder = () => {
    const order: Order = {
      ...newOrder,
      id: Math.max(...orders.map((o) => o.id), 1000) + 1,
    };
    setOrders((prev) => [...prev, order]);
    setIsAddModalOpen(false);
    resetNewOrder();
    setCurrentPage(1);
  };

  // Edit order
  const handleEditOrder = () => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? selectedOrder : order
      )
    );
    setIsEditModalOpen(false);
    setSelectedOrder(null);
  };

  // Delete order
  const handleDeleteOrder = () => {
    if (!selectedOrder) return;
    setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  // Reset new order form
  const resetNewOrder = () => {
    setNewOrder({
      customer: "",
      email: "",
      status: "pending",
      total: 0,
      date: new Date().toISOString().split("T")[0],
      items: 1,
    });
  };

  // Open edit modal
  const openEditModal = (order: Order) => {
    setSelectedOrder({ ...order });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="px-4 sm:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="customer">Sort by Customer</option>
                  <option value="date">Sort by Date</option>
                  <option value="total">Sort by Total</option>
                </select>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
            </div>
            {/* Add Order Button */}
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              icon={Plus}
            >
              Add Order
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("customer")}
                  >
                    <div className="flex items-center gap-1">
                      Customer
                      {sortBy === "customer" && (
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortBy === "date" && (
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Items
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("total")}
                  >
                    <div className="flex items-center gap-1">
                      Total
                      {sortBy === "total" && (
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {order.customer}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Order #{order.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {order.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {order.items}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : order.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(order)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(order)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredOrders.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Add Order Modal */}
        {isAddModalOpen && (
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              resetNewOrder();
            }}
            title="Add New Order"
            size="md"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={newOrder.customer}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customer: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newOrder.email}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newOrder.date}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Items
                </label>
                <input
                  type="number"
                  min={1}
                  value={newOrder.items}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, items: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Total ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={newOrder.total}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, total: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={newOrder.status}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      status: e.target.value as Order["status"],
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetNewOrder();
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddOrder}
                  variant="primary"
                  className="flex-1"
                >
                  Add Order
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Order Modal */}
        {isEditModalOpen && selectedOrder && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Order"
            size="md"
            showCloseButton={true}
            className="max-w-md"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={selectedOrder.customer}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      customer: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedOrder.email}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedOrder.date}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Items
                </label>
                <input
                  type="number"
                  min={1}
                  value={selectedOrder.items}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      items: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Total ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={selectedOrder.total}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      total: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value as Order["status"],
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditOrder}
                  variant="primary"
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedOrder && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Order"
            size="md"
            showCloseButton={true}
            className="max-w-md"
          >
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Are you sure you want to delete this order?
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteOrder}
                  variant="danger"
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
