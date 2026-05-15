"use client";

import { Transaction } from "../types";
import { formatCurrency, formatDateTime } from "../utils/formatters";
import { Checkbox } from "@/app/shared/components/Checkbox";
import { DownloadInvoiceButton } from "@/app/features/invoices/components/DownloadInvoiceButton";
import { RetryStatusIndicator } from "@/app/features/payments/components/RetryStatusIndicator";
import { PaymentRetryState } from "@/app/features/payments/types";

interface TransactionRowProps {
  transaction: Transaction;
  isFailed: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  retryState?: PaymentRetryState;
  isRetryInProgress?: boolean;
}

export function TransactionRow({
  transaction,
  isFailed,
  isSelected,
  onSelect,
  retryState,
  isRetryInProgress = false,
}: TransactionRowProps) {
  const statusClasses = {
    Success: "text-green-600 bg-green-50",
    Failed: "text-red-600 bg-red-50",
    Pending: "text-yellow-600 bg-yellow-50",
  };

  const showRetryUI =
    retryState && (retryState.isRetrying || retryState.newStatus);

  // Disable checkbox if ANY retry is in progress (not just this row)
  const isCheckboxDisabled = isRetryInProgress;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        {isFailed && !showRetryUI ? (
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(transaction.id)}
            disabled={isCheckboxDisabled}
          />
        ) : showRetryUI ? (
          <RetryStatusIndicator
            isRetrying={retryState.isRetrying}
            newStatus={retryState.newStatus}
          />
        ) : null}
      </td>
      <td className="px-6 py-4 font-mono text-sm">{transaction.id}</td>
      <td className="px-6 py-4">
        {formatCurrency(transaction.amount, transaction.currency)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDateTime(transaction.date)}
      </td>
      <td
        className={`px-6 py-4 font-medium ${statusClasses[transaction.status]}`}
      >
        {transaction.status}
      </td>
      <td className="px-6 py-4">
        <DownloadInvoiceButton
          transactionId={transaction.id}
          status={transaction.status}
        />
      </td>
    </tr>
  );
}
