import { Transaction, TransactionStatus } from "../types";

const statuses: TransactionStatus[] = [
  "Success",
  "Failed",
  "Success",
  "Success",
  "Failed",
  "Success",
];

function generateMockTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 15; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(baseDate);
    date.setDate(date.getDate() - daysAgo);

    // Distribute statuses with ~20% failure rate
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];

    transactions.push({
      id: `TXN-${String(i + 1).padStart(6, "0")}`,
      amount: Math.floor(Math.random() * 5000) + 100,
      date,
      status,
      currency: "USD",
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const mockTransactions = generateMockTransactions();
