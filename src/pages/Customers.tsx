import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Pagination } from "../components/common/Pagination";
import Modal from "../components/common/Modal";

// Types
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  lastOrder: string;
}

// Mock data with unique IDs
const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    joinDate: "2023-01-15",
    totalOrders: 12,
    totalSpent: 2450.0,
    status: "active",
    lastOrder: "2024-01-20",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave",
    city: "Los Angeles",
    joinDate: "2023-03-22",
    totalOrders: 8,
    totalSpent: 1200.5,
    status: "active",
    lastOrder: "2024-01-18",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd",
    city: "Chicago",
    joinDate: "2022-11-05",
    totalOrders: 25,
    totalSpent: 5800.75,
    status: "active",
    lastOrder: "2024-01-22",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St",
    city: "Miami",
    joinDate: "2023-07-14",
    totalOrders: 5,
    totalSpent: 750.25,
    status: "inactive",
    lastOrder: "2023-12-15",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.b@email.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Dr",
    city: "Seattle",
    joinDate: "2022-08-30",
    totalOrders: 18,
    totalSpent: 3200.0,
    status: "active",
    lastOrder: "2024-01-19",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 345-6789",
    address: "987 Cedar Ln",
    city: "Boston",
    joinDate: "2023-05-10",
    totalOrders: 15,
    totalSpent: 2100.0,
    status: "active",
    lastOrder: "2024-01-21",
  },
  {
    id: 7,
    name: "Robert Garcia",
    email: "robert.g@email.com",
    phone: "+1 (555) 765-4321",
    address: "246 Birch St",
    city: "Austin",
    joinDate: "2022-12-20",
    totalOrders: 22,
    totalSpent: 4300.5,
    status: "active",
    lastOrder: "2024-01-17",
  },
  {
    id: 8,
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    phone: "+1 (555) 234-8765",
    address: "135 Walnut Ave",
    city: "Denver",
    joinDate: "2023-09-05",
    totalOrders: 7,
    totalSpent: 950.0,
    status: "inactive",
    lastOrder: "2023-11-30",
  },
  {
    id: 9,
    name: "Michael Taylor",
    email: "michael.t@email.com",
    phone: "+1 (555) 567-8901",
    address: "864 Spruce Rd",
    city: "Portland",
    joinDate: "2023-02-28",
    totalOrders: 30,
    totalSpent: 7200.25,
    status: "active",
    lastOrder: "2024-01-23",
  },
  {
    id: 10,
    name: "Amanda Clark",
    email: "amanda.clark@email.com",
    phone: "+1 (555) 678-9012",
    address: "579 Hickory Dr",
    city: "Atlanta",
    joinDate: "2022-10-15",
    totalOrders: 11,
    totalSpent: 1800.75,
    status: "active",
    lastOrder: "2024-01-16",
  },
  {
    id: 11,
    name: "Christopher Hall",
    email: "chris.hall@email.com",
    phone: "+1 (555) 789-0123",
    address: "753 Magnolia St",
    city: "Phoenix",
    joinDate: "2023-04-12",
    totalOrders: 9,
    totalSpent: 1250.0,
    status: "inactive",
    lastOrder: "2023-12-20",
  },
  {
    id: 12,
    name: "Jessica White",
    email: "jessica.white@email.com",
    phone: "+1 (555) 890-1234",
    address: "942 Willow Way",
    city: "Dallas",
    joinDate: "2023-08-08",
    totalOrders: 14,
    totalSpent: 2900.5,
    status: "active",
    lastOrder: "2024-01-19",
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "joinDate" | "totalSpent">(
    "name"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [newCustomer, setNewCustomer] = useState<
    Omit<Customer, "id" | "totalOrders" | "totalSpent" | "lastOrder">
  >({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "active",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === "totalSpent") {
        aValue = a.totalSpent;
        bValue = b.totalSpent;
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
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (field: "name" | "joinDate" | "totalSpent") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Add new customer
  const handleAddCustomer = () => {
    const customer: Customer = {
      ...newCustomer,
      id: Math.max(...customers.map((c) => c.id)) + 1,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: "",
    };

    setCustomers((prev) => [...prev, customer]);
    setIsAddModalOpen(false);
    resetNewCustomer();
    setCurrentPage(1); // Reset to first page after adding
  };

  // Edit customer
  const handleEditCustomer = () => {
    if (!selectedCustomer) return;

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === selectedCustomer.id ? selectedCustomer : customer
      )
    );
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  // Soft delete customer
  const handleSoftDelete = () => {
    if (!selectedCustomer) return;

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, status: "inactive" as const }
          : customer
      )
    );
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  // Restore customer
  const handleRestore = (customerId: number) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: "active" as const }
          : customer
      )
    );
  };

  // Reset new customer form
  const resetNewCustomer = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    });
  };

  // Open edit modal
  const openEditModal = (customer: Customer) => {
    setSelectedCustomer({ ...customer });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  // Handle search and filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleStatusFilterChange = (value: "all" | "active" | "inactive") => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="px-4 sm:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalCustomers}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Customers
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeCustomers}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                <Mail className="h-6 w-6 text-violet-600 dark:text-violet-400" />
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
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilterChange(e.target.value as any)
                  }
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="name">Sort by Name</option>
                  <option value="joinDate">Sort by Join Date</option>
                  <option value="totalSpent">Sort by Total Spent</option>
                </select>

                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
            </div>

            {/* Add Customer Button */}
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              icon={Plus}
            >
              Add Customer
            </Button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Customer
                      {sortBy === "name" && (
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("joinDate")}
                  >
                    <div className="flex items-center gap-1">
                      Join Date
                      {sortBy === "joinDate" && (
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Orders
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("totalSpent")}
                  >
                    <div className="flex items-center gap-1">
                      Total Spent
                      {sortBy === "totalSpent" && (
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
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {customer.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          ID: {customer.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900 dark:text-white">
                        {customer.email}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900 dark:text-white">
                        {customer.city}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-32">
                        {customer.address}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {customer.totalOrders}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.status === "active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {customer.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(customer)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {customer.status === "active" ? (
                          <button
                            onClick={() => openDeleteModal(customer)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestore(customer.id)}
                            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors p-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
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
            totalItems={filteredCustomers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No customers found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Add Customer Modal */}
        {isAddModalOpen && (
          // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          //   <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 shadow-2xl">
          //     <div className="flex items-center justify-between mb-4">
          //       <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          //         Add New Customer
          //       </h3>
          //       <button
          //         onClick={() => {
          //           setIsAddModalOpen(false);
          //           resetNewCustomer();
          //         }}
          //         className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          //       >
          //         <X className="h-5 w-5" />
          //       </button>
          //     </div>

          //     <div className="space-y-4">
          //       <div>
          //         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          //           Full Name
          //         </label>
          //         <input
          //           type="text"
          //           value={newCustomer.name}
          //           onChange={(e) =>
          //             setNewCustomer({ ...newCustomer, name: e.target.value })
          //           }
          //           className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          //         />
          //       </div>

          //       <div>
          //         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          //           Email
          //         </label>
          //         <input
          //           type="email"
          //           value={newCustomer.email}
          //           onChange={(e) =>
          //             setNewCustomer({ ...newCustomer, email: e.target.value })
          //           }
          //           className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          //         />
          //       </div>

          //       <div>
          //         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          //           Phone
          //         </label>
          //         <input
          //           type="tel"
          //           value={newCustomer.phone}
          //           onChange={(e) =>
          //             setNewCustomer({ ...newCustomer, phone: e.target.value })
          //           }
          //           className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          //         />
          //       </div>

          //       <div>
          //         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          //           Address
          //         </label>
          //         <input
          //           type="text"
          //           value={newCustomer.address}
          //           onChange={(e) =>
          //             setNewCustomer({
          //               ...newCustomer,
          //               address: e.target.value,
          //             })
          //           }
          //           className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          //         />
          //       </div>

          //       <div>
          //         <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          //           City
          //         </label>
          //         <input
          //           type="text"
          //           value={newCustomer.city}
          //           onChange={(e) =>
          //             setNewCustomer({ ...newCustomer, city: e.target.value })
          //           }
          //           className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          //         />
          //       </div>

          //       <div className="flex gap-3">
          //         <Button
          //           onClick={() => {
          //             setIsAddModalOpen(false);
          //             resetNewCustomer();
          //           }}
          //           variant="secondary"
          //           className="flex-1"
          //         >
          //           Cancel
          //         </Button>
          //         <Button
          //           onClick={handleAddCustomer}
          //           variant="primary"
          //           className="flex-1"
          //         >
          //           Add Customer
          //         </Button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              resetNewCustomer();
            }}
            title="Add New Customer"
            size="md"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
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
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={newCustomer.city}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetNewCustomer();
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCustomer}
                  variant="primary"
                  className="flex-1"
                >
                  Add Customer
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Customer Modal */}
        {isEditModalOpen && selectedCustomer && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Customer"
            size="md"
            showCloseButton={true}
            className="max-w-md"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      name: e.target.value,
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
                  value={selectedCustomer.email}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={selectedCustomer.phone}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      phone: e.target.value,
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
                  value={selectedCustomer.status}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                  onClick={handleEditCustomer}
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
        {isDeleteModalOpen && selectedCustomer && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Deactivate Customer"
            size="md"
            showCloseButton={true}
            className="max-w-md"
          >
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Are you sure you want to deactivate this customer?
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
                  onClick={handleSoftDelete}
                  variant="danger"
                  className="flex-1"
                >
                  Deactivate
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
