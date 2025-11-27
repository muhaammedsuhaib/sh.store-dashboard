import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Filter, X } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  clearable?: boolean;
  clearLabel?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  icon = <Filter className="h-4 w-4" />,
  className = "",
  disabled = false,
  clearable = true,
  clearLabel = "Clear selection"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  const handleOptionSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening dropdown when clearing
    onValueChange("");
    setIsOpen(false);
    setSearchTerm("");
  };

  const hasValue = value && value !== "";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl 
          bg-white dark:bg-slate-800 text-slate-900 dark:text-white 
          hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon}
          <span className="truncate">
            {selectedOption?.label || placeholder}
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
            className={`h-4 w-4 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            } ${hasValue && clearable ? 'text-slate-400' : ''}`} 
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {/* Search Input */}
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

          {/* Options List */}
          <div className="py-1">
            {/* Clear Option */}
            {clearable && hasValue && (
              <button
                onClick={() => handleOptionSelect("")}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-b border-slate-200 dark:border-slate-700 flex items-center gap-2"
              >
                <X className="h-3 w-3" />
                {clearLabel}
              </button>
            )}

            {/* Filtered Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors
                    ${value === option.value
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;