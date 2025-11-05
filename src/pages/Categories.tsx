import { useState, useEffect } from "react";
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
  Upload,
  X,
  Loader,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Pagination } from "../components/common/Pagination";
import Modal from "../components/common/Modal";
import { toast } from "react-hot-toast";
import { useCategories } from "../api/category/get_categories";

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
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [parentFilter, setParentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "created_at" | "updated_at">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, "_id" | "created_at" | "updated_at" | "children">>({
    name: "",
    description: "",
    images: [],
    parent: null,
    shop: "shop1",
    is_active: true,
    is_deleted: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [imageUrls, setImageUrls] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // Set categories from API data
  useEffect(() => {
    if (categoriesData?.data) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData]);

  // Get all categories (flattened for filtering)
  const allCategories = categories.flatMap(cat => [cat, ...(cat.children || [])]);

  // Get parent categories for filter and dropdown
  const parentCategories = categories.filter(cat => cat.parent === null);

  // Filter and sort categories
  const filteredCategories = allCategories
    .filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || 
        (statusFilter === "active" ? category.is_active : !category.is_active);

      const matchesParent =
        parentFilter === "all" || 
        (parentFilter === "null" ? category.parent === null : category.parent === parentFilter);

      return matchesSearch && matchesStatus && matchesParent;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === "created_at" || sortBy === "updated_at") {
        aValue = new Date(a[sortBy]);
        bValue = new Date(b[sortBy]);
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
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

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
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Add new category
  const handleAddCategory = () => {
    // Process image URLs
    const processedUrls = processImageUrls();
    const allImages = [...processedUrls];

    const category: Category = {
      ...newCategory,
      images: allImages,
      _id: Math.random().toString(36).substr(2, 9), // Temporary ID for local state
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // If it's a subcategory, add to parent's children
    if (newCategory.parent) {
      setCategories(prev => 
        prev.map(cat => 
          cat._id === newCategory.parent 
            ? { 
                ...cat, 
                children: [...(cat.children || []), category] 
              }
            : cat
        )
      );
    } else {
      setCategories(prev => [...prev, category]);
    }

    setIsAddModalOpen(false);
    resetNewCategory();
    setCurrentPage(1);
    
    toast.success("Category added successfully!");
  };

  // Edit category
  const handleEditCategory = () => {
    if (!selectedCategory) return;

    const updatedCategory = {
      ...selectedCategory,
      updated_at: new Date().toISOString(),
    };

    setCategories(prev => 
      prev.map(cat => 
        cat._id === selectedCategory._id 
          ? updatedCategory 
          : cat
      )
    );

    setIsEditModalOpen(false);
    setSelectedCategory(null);
    
    toast.success("Category updated successfully!");
  };

  // Soft delete category
  const handleSoftDelete = () => {
    if (!selectedCategory) return;

    setCategories(prev =>
      prev.map(cat =>
        cat._id === selectedCategory._id
          ? { ...cat, is_active: false, is_deleted: true }
          : cat
      )
    );
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
    
    toast.success("Category deactivated successfully!");
  };

  // Restore category
  const handleRestore = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat._id === categoryId
          ? { ...cat, is_active: true, is_deleted: false }
          : cat
      )
    );
    
    toast.success("Category restored successfully!");
  };

  // Reset new category form
  const resetNewCategory = () => {
    setNewCategory({
      name: "",
      description: "",
      images: [],
      parent: null,
      shop: "shop1",
      is_active: true,
      is_deleted: false,
    });
    setImageUrls("");
    setUploadedImages([]);
  };

  // Open edit modal
  const openEditModal = (category: Category) => {
    setSelectedCategory({ ...category });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Handle image URL processing
  const processImageUrls = () => {
    if (!imageUrls.trim()) return [];

    const urls = imageUrls.split(',').map(url => url.trim()).filter(url => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    });

    return urls;
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      toast.error("Please select only image files");
    } else {
      setUploadedImages(prev => [...prev, ...imageFiles]);
      toast.success(`Added ${imageFiles.length} image file(s)`);
    }
    
    // Reset file input
    event.target.value = "";
  };

  // Remove uploaded image
  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    toast.success("Image removed");
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

  // Stats
  const totalCategories = allCategories.length;
  const activeCategories = allCategories.filter(c => c.is_active).length;
  const inactiveCategories = allCategories.filter(c => !c.is_active).length;
  const parentCategoriesCount = categories.filter(cat => cat.parent === null).length;
  const subcategoriesCount = allCategories.filter(cat => cat.parent !== null).length;

  // Loading state
  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (categoriesError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Failed to load categories
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {categoriesError.message || "Something went wrong"}
          </p>
          <Button onClick={() => refetchCategories()} variant="primary" icon={RefreshCw}>
            Try Again
          </Button>
        </div>
      </div>
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
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            icon={Plus}
          >
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
                  {totalCategories}
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
                  {activeCategories}
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
                  {parentCategoriesCount}
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
                  {subcategoriesCount}
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
                  onChange={(e) => handleStatusFilterChange(e.target.value as any)}
                  className="border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
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
                    Category
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
                {paginatedCategories.map((category) => {
                  const isParent = category.parent === null;
                  const parentCategory = isParent ? null : categories.find(cat => cat._id === category.parent);
                  const indentLevel = isParent ? 0 : 1;

                  return (
                    <tr
                      key={category._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`flex items-center ${isParent ? 'cursor-pointer' : ''}`}
                            onClick={() => isParent && toggleCategory(category._id)}
                          >
                            <div 
                              className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                              style={{ marginLeft: `${indentLevel * 20}px` }}
                            >
                              <Folder className="h-5 w-5 text-slate-500" />
                            </div>
                            {isParent && (
                              <ChevronDown
                                className={`h-4 w-4 ml-1 transform transition-transform ${
                                  expandedCategories.has(category._id) ? "rotate-180" : ""
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
                          {category.description}
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
                            onClick={() => openEditModal(category)}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {category.is_active ? (
                            <button
                              onClick={() => openDeleteModal(category)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(category._id)}
                              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors p-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredCategories.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No categories found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {categories.length === 0 
                  ? "No categories have been created yet" 
                  : "Try adjusting your search or filters"
                }
              </p>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              resetNewCategory();
            }}
            title="Add New Category"
            size="lg"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={newCategory.parent || ""}
                    onChange={(e) =>
                      setNewCategory({ 
                        ...newCategory, 
                        parent: e.target.value || null 
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">No Parent (Main Category)</option>
                    {parentCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter category description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Image URLs (comma separated)
                </label>
                <textarea
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload Images
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-slate-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>

                {/* Uploaded files preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Uploaded Files:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {uploadedImages.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2"
                        >
                          <ImageIcon className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 truncate max-w-32">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeUploadedImage(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={newCategory.is_active}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, is_active: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm text-slate-700 dark:text-slate-300">
                  Active Category
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetNewCategory();
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCategory}
                  variant="primary"
                  className="flex-1"
                  disabled={!newCategory.name.trim()}
                >
                  Add Category
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Category Modal */}
        {isEditModalOpen && selectedCategory && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Category"
            size="lg"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.name}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={selectedCategory.parent || ""}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        parent: e.target.value || null,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">No Parent (Main Category)</option>
                    {parentCategories
                      .filter(cat => cat._id !== selectedCategory._id)
                      .map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={selectedCategory.description}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit_is_active"
                  checked={selectedCategory.is_active}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      is_active: e.target.checked,
                    })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="edit_is_active" className="text-sm text-slate-700 dark:text-slate-300">
                  Active Category
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditCategory}
                  variant="primary"
                  className="flex-1"
                  disabled={!selectedCategory.name.trim()}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedCategory && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Deactivate Category"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Are you sure you want to deactivate the category "{selectedCategory.name}"? 
                This will make it unavailable for new products.
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