import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionButton,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0 ${className}`}
    >
      {/* Title & Subtitle */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Button */}
      {actionButton && <div className="shrink-0">{actionButton}</div>}
    </div>
  );
};

export default PageHeader;
