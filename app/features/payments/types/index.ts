export interface PaymentRetryState {
  transactionId: string;
  isRetrying: boolean;
  newStatus: "Success" | "Failed" | null;
}
