import type { ReactNode } from "react";

interface QuickTipProps {
  title?: string;
  tips?: string[];
  icon?: string;
  variant?: "blue" | "green" | "amber" | "purple";
  className?: string;
  children?: ReactNode;
}

const QuickTip = ({
  title = " Quick Tip",
  tips = [],
  icon = "💡",
  variant = "blue",
  className = "",
  children,
}: QuickTipProps) => {
  const variants = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      title: "text-blue-900 dark:text-blue-100",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      title: "text-green-900 dark:text-green-100",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-200",
      title: "text-amber-900 dark:text-amber-100",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-800 dark:text-purple-200",
      title: "text-purple-900 dark:text-purple-100",
    },
  };

  const colors = variants[variant];

  return (
    <div
      className={`mt-8 ${colors.bg} ${colors.border} border rounded-2xl p-6 ${className}`}
    >
      <h3 className={`font-semibold ${colors.title} mb-2`}>
        {icon} {title}
      </h3>

      {children || (
        <ul className={`text-sm ${colors.text} space-y-1`}>
          {tips.map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuickTip;
