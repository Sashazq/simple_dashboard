export type TransactionStatus = "Success" | "Failed" | "Pending";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  status: TransactionStatus;
  currency: string;
}

export interface RetryResult {
  transactionId: string;
  success: boolean;
  newStatus: TransactionStatus;
}

export interface TransactionRowState extends Transaction {
  isRetrying?: boolean;
}
