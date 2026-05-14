"use client";

import { LoadingSpinner } from "@/app/shared/components/LoadingSpinner";

interface RetryStatusIndicatorProps {
  isRetrying?: boolean;
  newStatus?: "Success" | "Failed" | null;
}

export function RetryStatusIndicator({
  isRetrying,
  newStatus,
}: RetryStatusIndicatorProps) {
  if (isRetrying) {
    return <LoadingSpinner size="sm" className="text-blue-600" />;
  }

  if (newStatus === "Success") {
    return <span className="text-green-600 font-medium">✓ Retried</span>;
  }

  if (newStatus === "Failed") {
    return <span className="text-red-600 font-medium">✗ Failed Again</span>;
  }

  return null;
}
