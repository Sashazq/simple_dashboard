"use client";

import { useEffect, useMemo, useState } from "react";
import { useTransactions } from "@/app/features/transactions/hooks/useTransactions";
import { useBatchPaymentRetry } from "@/app/features/payments/hooks/useBatchPaymentRetry";
import { useNotification } from "@/app/features/notifications/hooks/useNotification";
import { TransactionTable } from "@/app/features/transactions/components/TransactionTable";
import { RetryButton } from "@/app/features/payments/components/RetryButton";
import { PaymentRetryState } from "@/app/features/payments/types";

export default function TransactionsPage() {
  const {
    transactions,
    selectedIds,
    toggleSelection,
    updateTransactionStatus,
    clearSelection,
  } = useTransactions();
  const { retrySelected, getRetryState, clearRetryStates } =
    useBatchPaymentRetry();
  const { success } = useNotification();

  const [retryStates, setRetryStates] = useState<
    Record<string, PaymentRetryState>
  >({});
  const [isRetrying, setIsRetrying] = useState(false);

  const failedCount = useMemo(
    () => transactions.filter((t) => t.status === "Failed").length,
    [transactions],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      // Update retry states from the hook
      const newStates: Record<string, PaymentRetryState> = {};
      transactions.forEach((t) => {
        const state = getRetryState(t.id);
        if (state) {
          newStates[t.id] = state;
        }
      });
      setRetryStates(newStates);
    }, 100);

    return () => clearInterval(timer);
  }, [transactions, getRetryState]);

  const handleRetrySelected = async () => {
    const selectedArray = Array.from(selectedIds);

    setIsRetrying(true);
    clearRetryStates();
    setRetryStates({});

    await retrySelected(selectedArray);

    // Update transaction statuses based on retry results
    selectedArray.forEach((transactionId) => {
      const state = getRetryState(transactionId);
      if (state) {
        updateTransactionStatus(
          transactionId,
          state.newStatus as "Success" | "Failed",
        );
      }
    });

    setIsRetrying(false);
    clearSelection();
    success(`Retry completed for ${selectedArray.length} transaction(s)`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Payment History</h1>
        <p className="text-gray-600">
          Manage your transactions and retry failed payments
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>{failedCount}</strong> failed payment(s) available for retry
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <RetryButton
          selectedCount={selectedIds.size}
          isRetrying={isRetrying}
          onRetry={handleRetrySelected}
        />
        {selectedIds.size > 0 && (
          <span className="text-sm text-gray-600">
            {selectedIds.size} selected
          </span>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <TransactionTable
          transactions={transactions}
          selectedIds={selectedIds}
          onSelectTransaction={toggleSelection}
          retryStates={retryStates}
        />
      </div>
    </div>
  );
}
