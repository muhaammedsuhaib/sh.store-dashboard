import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Folder,
  Tag,
  RefreshCw,
  Image as ImageIcon,
  Eye,
  FilterX,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { toast } from "react-hot-toast";
import {
  useCategoryLabels,
  useCategoryStats,
  useUpdateCategory,
} from "../../api/category";
import { Loader } from "../../components/common/Loader";
import { ErrorState } from "../../components/common/ErrorState";
import type { Category } from "../../types/category";
import PageHeader from "../../components/common/PageHeader";
import StatsGrid from "../../components/common/StatsGrid";
import SearchFilterBar, {
  type FilterField,
} from "../../components/common/SearchFilterBar";
import { DataTable } from "../../components/common/DataTable";
import { ConfirmActionModal } from "../../components/common/ConfirmActionModal";
import { getParentCategories } from "../../utils/category.utils.ts";
import { useCategoryFilters } from "../../hooks/useCategoryFilters.ts";

export default function Categories() {
  const navigate = useNavigate();
  const {
    data: categoriesStats,
    isLoading: isLoadingCategoriesStats,
    error: categoriesStatsError,
    refetch: refetchCategoriesStats,
  } = useCategoryStats();
  const {
    data: CategoriesLabels,
    isLoading: isLoadingCategoriesLabels,
    error: categoriesLabelsError,
    refetch: refetchCategoriesLabels,
  } = useCategoryLabels();
  const { mutate: updateCategory, isPending: updateCategoryLoading } =
    useUpdateCategory();

  const {
    searchTerm,
    statusFilter,
    parentFilter,
    sortBy,
    sortOrder,
    currentPage,
    pageSize,
    categoriesData,
    isLoadingCategories,
    categoriesError,
    refetchCategories,
    handleSearchChange,
    handleStatusFilterChange,
    handleParentFilterChange,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleResetFilters,
  } = useCategoryFilters();

  const categories: Category[] = categoriesData?.data || [];
  const parentCategories = useMemo(
    () => getParentCategories(CategoriesLabels || []),
    [CategoriesLabels],
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCreateCategory = useCallback(() => {
    navigate("/category/new");
  }, [navigate]);

  const handleEditCategory = useCallback(
    (id: String) => {
      navigate(`/category/edit/${id}`);
    },
    [navigate],
  );

  const handleViewCategory = useCallback(
    (id: String) => {
      navigate(`/category/view/${id}`);
    },
    [navigate],
  );

  const handleSoftDelete = () => {
    if (!selectedCategory) return;
    const formData = new FormData();

    formData.append("id", selectedCategory?._id);
    formData.append("is_active", String(!selectedCategory?.is_active));
    formData.append(
      "existing_images",
      JSON.stringify(selectedCategory?.images ?? []),
    );

    updateCategory(formData, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        toast.success(
          `Category ${
            !selectedCategory.is_active ? "activated" : "deactivated"
          } successfully! `,
        );
        refetchCategoriesLabels();
        refetchCategoriesStats();
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

  // Open delete modal
  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Loading state
  if (isLoadingCategoriesStats || isLoadingCategoriesLabels) {
    return <Loader text="Loading categories..." />;
  }

  // Error states
  if (categoriesError) {
    return (
      <ErrorState
        error={categoriesError}
        onRetry={() => refetchCategories()}
        title="Failed to load categories"
      />
    );
  }
  if (categoriesStatsError) {
    return (
      <ErrorState
        error={categoriesStatsError}
        onRetry={() => refetchCategoriesStats()}
        title="Failed to load category states"
      />
    );
  }
  if (categoriesLabelsError) {
    return (
      <ErrorState
        error={categoriesLabelsError}
        onRetry={() => refetchCategoriesLabels()}
        title="Failed to load category labels"
      />
    );
  }
  const statsData = [
    {
      title: "Total Categories",
      value: categoriesStats?.total_categories_count ?? 0,
      icon: <Folder className="h-6 w-6" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Active Categories",
      value: categoriesStats?.active_categories_count ?? 0,
      icon: <Tag className="h-6 w-6" />,
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Parent Categories",
      value: categoriesStats?.parent_categories_count ?? 0,
      icon: <Folder className="h-6 w-6" />,
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Subcategories",
      value: categoriesStats?.subcategories_count ?? 0,
      icon: <Tag className="h-6 w-6" />,
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
  ];
  const filterFields: FilterField[] = [
    {
      key: "search",
      type: "search",
      value: searchTerm,
      onChange: handleSearchChange,
      placeholder: "Search categories...",
    },
    {
      key: "status",
      type: "dropdown",
      value: statusFilter,
      onChange: handleStatusFilterChange,
      searchable: false,
      clearable: false,
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
      icon: false,
    },
    {
      key: "parent",
      type: "dropdown",
      value: parentFilter,
      onChange: handleParentFilterChange,
      clearable: false,
      options: [
        { value: "all", label: "All Types" },
        { value: "null", label: "Parent Categories" },
        { value: "subcategories", label: "Subcategories" },
        ...parentCategories.map((c) => ({
          value: c._id,
          label: `Children of ${c.name}`,
        })),
      ],
    },
    {
      key: "sort",
      type: "dropdown",
      value: sortBy,
      onChange: (v: any) => handleSort(v),
      searchable: false,
      clearable: false,
      icon: false,
      options: [
        { value: "name", label: "Sort by Name" },
        { value: "created_at", label: "Sort by Created" },
        { value: "updated_at", label: "Sort by Updated" },
      ],
    },
    {
      key: "pageSize",
      type: "dropdown",
      value: String(pageSize),
      onChange: (v: any) => handlePageSizeChange(Number(v)),
      searchable: false,
      clearable: false,
      icon: false,
      options: [
        { value: "5", label: "5 per page" },
        { value: "10", label: "10 per page" },
        { value: "25", label: "25 per page" },
        { value: "50", label: "50 per page" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <PageHeader
          title="Categories"
          subtitle="Manage your product categories and organization"
          actionButton={
            <Button
              title="Add new category"
              onClick={handleCreateCategory}
              variant="primary"
              icon={Plus}
            >
              Add Category
            </Button>
          }
        />
        {/* Stats Cards */}
        <StatsGrid stats={statsData} />

        {/* Search and Filters */}
        <SearchFilterBar
          fields={filterFields}
          action={
            <div className="flex items-center gap-2">
              {/* Clear Filter */}
              <button
                onClick={handleResetFilters}
                title="Clear filters"
                className="
                       p-2 rounded-lg
                       border border-red-200
                       text-red-600
                       hover:bg-red-50 hover:text-red-700
                       dark:border-red-800/40
                       dark:text-red-400
                       dark:hover:bg-red-900/20 dark:hover:text-red-300
                       active:scale-95
                       transition
                       "
              >
                <FilterX className="w-5 h-5" />
              </button>

              {/* Refresh */}
              <button
                onClick={() => refetchCategories()}
                title="Refresh"
                className="
                    p-2 rounded-lg
                    border border-blue-200
                    text-blue-600
                    hover:bg-blue-50 hover:text-blue-700
                    dark:border-blue-800/40
                    dark:text-blue-400
                    dark:hover:bg-blue-900/20 dark:hover:text-blue-300
                    active:scale-95
                    transition
                   "
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          }
        />

        <DataTable
          loading={isLoadingCategories}
          columns={[
            {
              key: "icon",
              title: "Icon",
              render: () => (
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <Folder className="h-5 w-5 text-slate-500" />
                </div>
              ),
            },
            {
              key: "name",
              title: "Name",
              sortable: true,
              render: (row) => (
                <span
                  title={row.name}
                  className="block max-w-[220px]  truncate  font-medium text-slate-900 dark:text-white"
                >
                  {row.name}
                </span>
              ),
            },
            {
              key: "description",
              title: "Description",
              hideOnMobile: true,
              render: (row) => (
                <span
                  title={row.description}
                  className="truncate max-w-48 block"
                >
                  {row.description || "—"}
                </span>
              ),
            },
            {
              key: "parent",
              title: "Parent",
              hideOnMobile: true,
              render: (row) => {
                const parentName = row.parent
                  ? categories.find((cat) => cat._id === row.parent)?.name ||
                    "—"
                  : "—";

                return (
                  <span title={parentName} className="truncate max-w-48 block">
                    {parentName}
                  </span>
                );
              },
            },
            {
              key: "images",
              title: "Images",
              hideOnMobile: true,
              render: (row) => (
                <span className="truncate max-w-48 block items-center gap-1">
                  {(row?.images ?? []).length > 0 ? (
                    <>
                      <ImageIcon className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {row?.images?.length}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-slate-400">No images</span>
                  )}
                </span>
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (row) => (
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    row.is_active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {row.is_active ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              key: "actions",
              title: "Actions",
              render: (row) => (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="View category"
                    onClick={() => handleViewCategory(row?._id)}
                    className="p-1 rounded-lg transition-colors
                 text-green-600 hover:text-green-700 hover:bg-green-50
                 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
                  >
                    <Eye className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    title="Edit category"
                    onClick={() => handleEditCategory(row._id)}
                    className="p-1 rounded-lg transition-colors
                 text-blue-600 hover:text-blue-700 hover:bg-blue-50
                 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    title={
                      row.is_active ? "Deactivate category" : "Restore category"
                    }
                    onClick={() => openDeleteModal(row)}
                    className={`p-1 rounded-lg transition-colors ${
                      row.is_active
                        ? "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                        : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/20"
                    }`}
                  >
                    {row.is_active ? (
                      <Trash2 className="h-4 w-4" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ),
            },
          ]}
          data={categories}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          keyExtractor={(row) => row._id}
          //pagination
          currentPage={currentPage}
          totalItems={categoriesData?.pagination?.total}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          emptyState={
            <div className="flex flex-col items-center justify-center h-full py-8">
              <Folder className="h-12 w-12 text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No categories found
              </p>
              <Button
                className="mt-4"
                onClick={handleResetFilters}
                variant="secondary"
              >
                Clear filters
              </Button>
            </div>
          }
        />
        {/* Active And Inactive Confirmation Modal */}
        <ConfirmActionModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleSoftDelete}
          loading={updateCategoryLoading}
          title={
            selectedCategory?.is_active
              ? "Deactivate Category"
              : "Activate Category"
          }
          confirmText={selectedCategory?.is_active ? "Deactivate" : "Activate"}
          confirmVariant={selectedCategory?.is_active ? "danger" : "success"}
          description={
            <>
              Are you sure you want to{" "}
              {selectedCategory?.is_active ? "deactivate" : "activate"} the
              category{" "}
              <span
                title={selectedCategory?.name}
                className="font-semibold max-w-[200px] inline-block truncate"
              >
                "{selectedCategory?.name}"
              </span>
              ?{" "}
              {selectedCategory?.is_active
                ? "This will make it unavailable for new products."
                : "This will make it available for new products."}
            </>
          }
        />
      </div>
    </div>
  );
}
