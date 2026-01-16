import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  bgColor = "bg-slate-100 dark:bg-slate-800/30",
  iconColor = "text-slate-600 dark:text-slate-400",
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
        >
          <span className={`${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
