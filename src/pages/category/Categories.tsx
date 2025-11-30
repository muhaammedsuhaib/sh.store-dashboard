import { useState, useEffect, useMemo, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Folder,
  Tag,
  ChevronDown,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { Pagination } from "../../components/common/Pagination";
import Modal from "../../components/common/Modal";
import { toast } from "react-hot-toast";
import { useCategories } from "../../api/category/get_categories";
import { useUpdateCategory } from "../../api/category";
import { Loader } from "../../components/common/Loader";
import { ErrorState } from "../../components/common/ErrorState";
import Dropdown from "../../components/common/Dropdown";

// Types
interface Category {
  _id: string;
  name: string;
  description: string;
  images: string[];
  parent: string | null;
  shop: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

export default function Categories() {
  const navigate = useNavigate();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const { mutate: updateCategory, isPending: updateCategoryLoading } =
    useUpdateCategory();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [parentFilter, setParentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "created_at" | "updated_at">(
    "name"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Set categories from API data
  useEffect(() => {
    if (categoriesData?.data) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData]);

  // Flatten categories for filtering and searching
  const flattenCategories = (cats: Category[]): Category[] => {
    return cats.reduce((acc: Category[], category) => {
      acc.push(category);
      if (category.children && category.children.length > 0) {
        acc.push(...flattenCategories(category.children));
      }
      return acc;
    }, []);
  };

  const allCategories = useMemo(
    () => flattenCategories(categories),
    [categories]
  );

  // Get parent categories (categories with no parent)
  const parentCategories = useMemo(
    () => categories.filter((cat) => cat.parent === null),
    [categories]
  );

  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    const filtered = allCategories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category.is_active) ||
        (statusFilter === "inactive" && !category.is_active);

      const matchesParent =
        parentFilter === "all" ||
        (parentFilter === "null" && category.parent === null) ||
        (parentFilter === "subcategories" && category.parent !== null) ||
        category.parent === parentFilter;

      return matchesSearch && matchesStatus && matchesParent;
    });

    // Sort the filtered categories
    return filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      // Convert dates to timestamps for proper comparison
      if (sortBy === "created_at" || sortBy === "updated_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [
    allCategories,
    searchTerm,
    statusFilter,
    parentFilter,
    sortBy,
    sortOrder,
  ]);

  // Pagination
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedCategories.slice(startIndex, endIndex);
  }, [filteredAndSortedCategories, currentPage, pageSize]);

  // Handle sort
  const handleSort = (field: "name" | "created_at" | "updated_at") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Navigate to create category
  const handleCreateCategory = () => {
    navigate("/category/new");
  };

  // Navigate to edit category
  const handleEditCategory = (category: Category) => {
    navigate(`/category/edit/${category._id}`);
  };

  // Active or inactive category
  const handleSoftDelete = () => {
    if (!selectedCategory) return;
    const formData = new FormData();

    formData.append("id", selectedCategory?._id);
    formData.append("is_active", String(!selectedCategory?.is_active));

    updateCategory(formData, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        toast.success(
          `Category ${
            !selectedCategory.is_active ? "activated" : "deactivated"
          } successfully! 🎉`
        );
        refetchCategories();
      },
      onError: (err: any) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          `Failed to ${
            selectedCategory?.is_active ? "deactivate" : "activate"
          } category. Please try again.`;
        toast.error(errorMessage);
      },
    });
  };

  // Restore category
  const handleRestore = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === categoryId
          ? { ...cat, is_active: true, is_deleted: false }
          : cat
      )
    );

    toast.success("Category restored successfully!");
  };

  // Open delete modal
  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Handle search and filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: "all" | "active" | "inactive") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleParentFilterChange = (value: string) => {
    setParentFilter(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  // Recursive function to render categories with children
  const renderCategoryWithChildren = (
    category: Category,
    level: number = 0
  ): JSX.Element[] => {
    const isParent = category.children && category.children.length > 0;
    const parentCategory = category.parent
      ? allCategories.find((cat) => cat._id === category.parent)
      : null;
    const isExpanded = expandedCategories.has(category._id);

    const elements: JSX.Element[] = [];

    // Add current category row
    elements.push(
      <tr
        key={category._id}
        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center ${
                isParent ? "cursor-pointer" : ""
              }`}
              onClick={() => isParent && toggleCategory(category._id)}
            >
              <div
                className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                style={{ marginLeft: `${level * 20}px` }}
              >
                <Folder className="h-5 w-5 text-slate-500" />
              </div>
              {isParent && (
                <ChevronDown
                  className={`h-4 w-4 ml-1 transform transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="font-medium text-slate-900 dark:text-white">
            {category.name}
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 max-w-48 truncate">
            {category.description || "—"}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
          {parentCategory ? parentCategory.name : "—"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            {category.images.length > 0 ? (
              <>
                <ImageIcon className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {category.images.length}
                </span>
              </>
            ) : (
              <span className="text-sm text-slate-400">No images</span>
            )}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              category.is_active
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {category.is_active ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditCategory(category)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              title="Edit category"
            >
              <Edit className="h-4 w-4" />
            </button>
            {category.is_active ? (
              <button
                onClick={() => openDeleteModal(category)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Deactivate category"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => handleRestore(category._id)}
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors p-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                title="Restore category"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
          </div>
        </td>
      </tr>
    );

    // Add children if expanded
    if (isParent && isExpanded && category.children) {
      category.children.forEach((child) => {
        elements.push(...renderCategoryWithChildren(child, level + 1));
      });
    }

    return elements;
  };

  // Render flat categories for the table (filtered and paginated)
  const renderCategoryRows = () => {
    if (paginatedCategories.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="px-4 py-8 text-center">
            <div className="text-center py-8">
              <Folder className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No categories found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {searchTerm || statusFilter !== "all" || parentFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No categories have been created yet"}
              </p>
              {(searchTerm ||
                statusFilter !== "all" ||
                parentFilter !== "all") && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setParentFilter("all");
                  }}
                  variant="secondary"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </td>
        </tr>
      );
    }

    return paginatedCategories.map((category) => (
      <tr
        key={category._id}
        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <Folder className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="font-medium text-slate-900 dark:text-white">
            {category.name}
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 max-w-48 truncate">
            {category.description || "—"}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
          {category.parent
            ? allCategories.find((cat) => cat._id === category.parent)?.name ||
              "—"
            : "—"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            {category.images.length > 0 ? (
              <>
                <ImageIcon className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {category.images.length}
                </span>
              </>
            ) : (
              <span className="text-sm text-slate-400">No images</span>
            )}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              category.is_active
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {category.is_active ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditCategory(category)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              title="Edit category"
            >
              <Edit className="h-4 w-4" />
            </button>
            {category.is_active ? (
              <button
                onClick={() => openDeleteModal(category)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Deactivate category"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => openDeleteModal(category)}
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors p-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                title="Restore category"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  // Stats
  const stats = useMemo(() => {
    const totalCategories = allCategories.length;
    const activeCategories = allCategories.filter((c) => c.is_active).length;
    const parentCategoriesCount = categories.filter(
      (cat) => cat.parent === null
    ).length;
    const subcategoriesCount = allCategories.filter(
      (cat) => cat.parent !== null
    ).length;

    return {
      totalCategories,
      activeCategories,
      parentCategoriesCount,
      subcategoriesCount,
    };
  }, [allCategories, categories]);

  // Loading state
  if (isLoadingCategories) {
    return <Loader text="Loading categories..." />;
  }

  // Error state
  if (categoriesError) {
    return (
      <ErrorState
        error={categoriesError}
        onRetry={() => refetchCategories()}
        title="Failed to load categories"
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Categories
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your product categories and organization
            </p>
          </div>
          <Button onClick={handleCreateCategory} variant="primary" icon={Plus}>
            Add Category
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Categories
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalCategories}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Categories
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.activeCategories}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Tag className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Parent Categories
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.parentCategoriesCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <Folder className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Subcategories
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.subcategoriesCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                <Tag className="h-6 w-6 text-violet-600 dark:text-violet-400" />
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
                    placeholder="Search categories..."
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

                {/* <select
                  value={parentFilter}
                  onChange={(e) => handleParentFilterChange(e.target.value)}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Types</option>
                  <option value="null">Parent Categories</option>
                  <option value="subcategories">Subcategories</option>
                  {parentCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      Children of {category.name}
                    </option>
                  ))}
                </select> */}
                <Dropdown
                  options={[
                    { value: "all", label: "All Types" },
                    { value: "null", label: "Parent Categories" },
                    { value: "subcategories", label: "Subcategories" },
                    ...parentCategories.map((category) => ({
                      value: category._id,
                      label: `Children of ${category.name}`,
                    })),
                  ]}
                  value={parentFilter}
                  onValueChange={handleParentFilterChange}
                  placeholder="Filter by type"
                  searchPlaceholder="Search filter options..."
                  className="min-w-[100px]"
                  clearable={false}
                />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="name">Sort by Name</option>
                  <option value="created_at">Sort by Created</option>
                  <option value="updated_at">Sort by Updated</option>
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

            {/* Refresh Button */}
            <Button
              onClick={() => refetchCategories()}
              variant="secondary"
              icon={RefreshCw}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Icon
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Name
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
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Images
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
                {renderCategoryRows()}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAndSortedCategories.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedCategory && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title={
              selectedCategory?.is_active
                ? "Deactivate Category"
                : "Activate Category"
            }
            size="md"
          >
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Are you sure you want to{" "}
                {selectedCategory?.is_active ? "deactivate" : "activate"} the
                category "
                <span className="inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedCategory?.name}
                </span>
                "?{" "}
                {selectedCategory?.is_active
                  ? "This will make it unavailable for new products."
                  : "This will make it available for new products."}
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                  disabled={updateCategoryLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSoftDelete}
                  variant={selectedCategory?.is_active ? "danger" : "success"}
                  className="flex-1"
                  disabled={updateCategoryLoading}
                >
                  {updateCategoryLoading ? (
                    <>
                      {/* <Loader className="h-4 w-4 animate-spin mr-2" /> */}
                      {selectedCategory?.is_active
                        ? "Deactivating..."
                        : "Activating..."}
                    </>
                  ) : selectedCategory?.is_active ? (
                    "Deactivate"
                  ) : (
                    "Activate"
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
