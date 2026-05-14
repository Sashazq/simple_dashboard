"use client";

import { Button } from "@/app/shared/components/Button";

interface RetryButtonProps {
  selectedCount: number;
  isRetrying: boolean;
  onRetry: () => void;
}

export function RetryButton({
  selectedCount,
  isRetrying,
  onRetry,
}: RetryButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onRetry}
      disabled={selectedCount === 0 || isRetrying}
      isLoading={isRetrying}
    >
      Retry Selected ({selectedCount})
    </Button>
  );
}
