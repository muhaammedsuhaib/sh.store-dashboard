import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../api/category/get_categories";
import { useDebouncedValue } from "./useDebouncedValue";

// Types
type StatusFilter = "all" | "active" | "inactive";
type SortBy = "name" | "created_at" | "updated_at";
type SortOrder = "asc" | "desc";

export const useCategoryFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state synced with URL
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    (searchParams.get("status") as StatusFilter) || "all"
  );
  const [parentFilter, setParentFilter] = useState<string>(
    searchParams.get("parent") || "all"
  );
  const [sortBy, setSortBy] = useState<SortBy>(
    (searchParams.get("sortBy") as SortBy) || "name"
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get("sortOrder") as SortOrder) || "asc"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 5
  );

  // Debounced search
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  // Sync state -> URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (parentFilter !== "all") params.set("parent", parentFilter);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (currentPage !== 1) params.set("page", currentPage.toString());
    if (pageSize !== 5) params.set("pageSize", pageSize.toString());
    setSearchParams(params, { replace: true });
  }, [
    debouncedSearchTerm,
    statusFilter,
    parentFilter,
    sortBy,
    sortOrder,
    currentPage,
    pageSize,
  ]);

  // Fetch categories from API
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories({
    search: debouncedSearchTerm,
    status: statusFilter,
    parent: parentFilter,
    sortBy,
    sortOrder,
    page: currentPage,
    pageSize,
  });

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleStatusFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  const handleParentFilterChange = (value: string) => {
    setParentFilter(value);
    setCurrentPage(1);
  };
  const handleSort = (field: SortBy) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  //reset
  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setParentFilter("all");
    setSortBy("name");
    setSortOrder("asc");
    setCurrentPage(1);
    setPageSize(5);

    // Clear URL params
    setSearchParams({}, { replace: true });
  };
  return {
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
  };
};
