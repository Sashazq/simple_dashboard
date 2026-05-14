"use client";

import { useState, useEffect } from "react";
import { mockTransactions } from "../utils/mockData";
import { Transaction } from "../types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSelection = (transactionId: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId);
      } else {
        newSet.add(transactionId);
      }
      return newSet;
    });
  };

  const updateTransactionStatus = (
    transactionId: string,
    newStatus: "Success" | "Failed",
  ) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: newStatus } : t,
      ),
    );
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  return {
    transactions,
    selectedIds,
    toggleSelection,
    updateTransactionStatus,
    clearSelection,
  };
}
