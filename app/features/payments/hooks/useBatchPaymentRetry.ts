"use client";

import { useState } from "react";
import { retryPayment } from "../lib/retryEngine";
import { PaymentRetryState } from "../types";

interface RetryStateMap {
  [transactionId: string]: PaymentRetryState;
}

export function useBatchPaymentRetry() {
  const [retryStates, setRetryStates] = useState<RetryStateMap>({});

  const retrySelected = async (transactionIds: string[]) => {
    // Initialize retry states
    const initialStates: RetryStateMap = {};
    transactionIds.forEach((id) => {
      initialStates[id] = {
        transactionId: id,
        isRetrying: true,
        newStatus: null,
      };
    });
    setRetryStates(initialStates);

    // Start concurrent retries
    const retryPromises = transactionIds.map(async (transactionId) => {
      const result = await retryPayment(transactionId);

      // Update individual row state
      setRetryStates((prev) => ({
        ...prev,
        [transactionId]: {
          transactionId,
          isRetrying: false,
          newStatus: result,
        },
      }));

      return { transactionId, newStatus: result };
    });

    // Wait for all retries to complete
    await Promise.all(retryPromises);
  };

  const getRetryState = (
    transactionId: string,
  ): PaymentRetryState | undefined => {
    return retryStates[transactionId];
  };

  const clearRetryStates = () => {
    setRetryStates({});
  };

  return {
    retrySelected,
    getRetryState,
    clearRetryStates,
  };
}
