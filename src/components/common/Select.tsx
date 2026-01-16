import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

interface SelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  clearLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select option",
  label,
  disabled = false,
  className = "",
  icon,
  clearable = true,
  clearLabel = "Clear selection",
  searchable = true,
  searchPlaceholder = "Search...",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const hasValue = value !== "" && value !== null && value !== undefined;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filtered options based on search
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (val: string | number) => {
    onChange(val);
    setOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect("");
  };

  return (
    <div className={`relative w-full ${className}`} ref={wrapperRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`
          flex items-center justify-between gap-2
          w-full px-4 py-2 rounded-2xl
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-600
          text-slate-900 dark:text-white text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon && <span>{icon}</span>}
          <span className={selected ? "" : "text-slate-400 truncate"}>
            {selected?.label || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1 ml-2">
          {clearable && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors"
              title={clearLabel}
            >
              <X className="h-3 w-3 text-red-500 dark:text-slate-400" />
            </button>
          )}
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg max-h-60 overflow-y-auto transition-all duration-200">
          {searchable && (
            <div className="p-2 border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="py-1">
            {clearable && hasValue && (
              <button
                onClick={() => handleSelect("")}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-b border-slate-200 dark:border-slate-700 flex items-center gap-2"
              >
                <X className="h-3 w-3" /> {clearLabel}
              </button>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`
                      w-full text-left px-4 py-2 rounded-xl text-sm
                      transition-colors duration-150
                      ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
