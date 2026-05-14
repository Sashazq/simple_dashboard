"use client";

import { Transaction } from "../types";
import { TransactionRow } from "./TransactionRow";
import { PaymentRetryState } from "@/app/features/payments/types";

interface TransactionTableProps {
  transactions: Transaction[];
  selectedIds: Set<string>;
  onSelectTransaction: (id: string) => void;
  retryStates?: Record<string, PaymentRetryState>;
}

export function TransactionTable({
  transactions,
  selectedIds,
  onSelectTransaction,
  retryStates = {},
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-12"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              isFailed={transaction.status === "Failed"}
              isSelected={selectedIds.has(transaction.id)}
              onSelect={onSelectTransaction}
              retryState={retryStates[transaction.id]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
