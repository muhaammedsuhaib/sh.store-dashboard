// components/common/ErrorState.tsx
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  error: Error | string;
  onRetry?: () => void;
}

export function ErrorState({ title, error, onRetry }: ErrorStateProps) {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div className="flex items-center justify-center w-screen h-screen absolute top-0 left-0 bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {title || "Error"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {errorMessage || "Something went wrong"}
        </p>
        <Button onClick={onRetry} variant="primary" icon={RefreshCw}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
