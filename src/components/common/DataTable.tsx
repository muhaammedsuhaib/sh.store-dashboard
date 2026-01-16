import React from "react";
import { ChevronDown } from "lucide-react";
import { Pagination } from "./Pagination";
import { TableLoader } from "./Loader";

/* ===================== TYPES ===================== */

export interface TableColumn<T> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;

  /** Responsive */
  hideOnMobile?: boolean;

  /** Styling */
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;

  /** Loading */
  loading?: boolean;

  /** Sorting */
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (key: any) => void;

  /** Pagination (optional) */
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;

  emptyState?: React.ReactNode;
}

/* ===================== COMPONENT ===================== */

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  sortBy,
  sortOrder,
  onSort,

  currentPage,
  totalItems,
  pageSize,
  onPageChange,

  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && onSort?.(col.key)}
                  className={`
                    px-4 py-3 text-left text-xs font-medium uppercase tracking-wider
                    text-slate-500 dark:text-slate-400
                    ${
                      col.sortable
                        ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        : ""
                    }
                    ${col.headerClassName || ""}
                  `}
                >
                  <div className="flex items-center gap-1">
                    {col.title}
                    {sortBy === col.key && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          sortOrder === "desc" ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {/* ---------- LOADING ---------- */}
            {loading && (
              <TableLoader rows={pageSize || 5} columns={columns.length} />
            )}

            {/* ---------- EMPTY ---------- */}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center">
                  {emptyState || (
                    <p className="text-slate-500 dark:text-slate-400">
                      No data available
                    </p>
                  )}
                </td>
              </tr>
            )}

            {!loading &&
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-4 text-sm text-slate-700 dark:text-slate-300 ${
                        col.className || ""
                      }`}
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {currentPage !== undefined &&
        totalItems !== undefined &&
        pageSize !== undefined &&
        onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        )}
    </div>
  );
}
