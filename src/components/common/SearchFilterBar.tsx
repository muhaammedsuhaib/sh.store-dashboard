import React from "react";
import { Search } from "lucide-react";
import Dropdown from "./Dropdown";

/* ================= TYPES ================= */

export type FilterFieldType = "search" | "dropdown" | "custom";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  key: string;
  type: FilterFieldType;
  value: any;
  onChange: (value: any) => void;

  // Search
  placeholder?: string;
  debounce?: number;

  // Dropdown
  options?: FilterOption[];
  searchable?: boolean;
  clearable?: boolean;
  icon?: boolean | React.ReactNode;

  // Custom
  render?: React.ReactNode;

  className?: string;
}

interface SearchFilterBarProps {
  fields: FilterField[];
  action?: React.ReactNode;
  className?: string;
}

/* ================= COMPONENT ================= */

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  fields,
  action,
  className = "",
}) => {
  return (
    <section
      className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm ${className}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT : FILTERS */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {fields.map((field) => (
            <FieldRenderer key={field.key} field={field} />
          ))}
        </div>

        {/* RIGHT : ACTION */}
        {action && (
          <div className="flex items-center justify-end shrink-0">{action}</div>
        )}
      </div>
    </section>
  );
};

export default SearchFilterBar;

/* ================= FIELD RENDERER ================= */

const FieldRenderer = ({ field }: { field: FilterField }) => {
  switch (field.type) {
    /* 🔍 SEARCH */
    case "search":
      return (
        <div
          className={`relative flex-1 min-w-[220px] max-w-md ${
            field.className || ""
          }`}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder={field.placeholder || "Search..."}
            className="
              w-full pl-10 pr-4 py-3 rounded-xl border
              border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-white
              placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
            "
          />
        </div>
      );

    /* ⬇️ DROPDOWN */
    case "dropdown":
      return (
        <Dropdown
          options={field.options || []}
          value={field.value}
          onValueChange={field.onChange}
          searchable={field.searchable}
          clearable={field.clearable}
          icon={field.icon}
          className={field.className || "min-w-[140px]"}
        />
      );

    /* 🧩 CUSTOM */
    case "custom":
      return <div className={field.className}>{field.render}</div>;

    default:
      return null;
  }
};
