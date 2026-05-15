"use client";

import { useState, useRef, useEffect } from "react";
import { retryPayment } from "../lib/retryEngine";
import { PaymentRetryState } from "../types";

interface RetryStateMap {
  [transactionId: string]: PaymentRetryState;
}

export function useBatchPaymentRetry() {
  const [retryStates, setRetryStates] = useState<RetryStateMap>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const retrySelected = async (
    transactionIds: string[],
  ): Promise<
    Array<{ transactionId: string; newStatus: "Success" | "Failed" }>
  > => {
    // Cancel any previous retry operation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this batch
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

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
      // Check if aborted before processing
      if (signal.aborted) {
        return null;
      }

      try {
        const result = await retryPayment(transactionId);

        // Only update state if not aborted
        if (!signal.aborted) {
          setRetryStates((prev) => ({
            ...prev,
            [transactionId]: {
              transactionId,
              isRetrying: false,
              newStatus: result,
            },
          }));
        }

        return { transactionId, newStatus: result };
      } catch (err) {
        // Handle any errors in individual retry
        if (!signal.aborted) {
          setRetryStates((prev) => ({
            ...prev,
            [transactionId]: {
              transactionId,
              isRetrying: false,
              newStatus: "Failed",
            },
          }));
        }
        console.error(`Retry failed for ${transactionId}:`, err);
        return null;
      }
    });

    // Wait for all retries to complete
    const results = await Promise.all(retryPromises);

    // Clear abort controller reference
    abortControllerRef.current = null;

    // Return results directly (not relying on state reads)
    return results.filter((r) => r !== null) as Array<{
      transactionId: string;
      newStatus: "Success" | "Failed";
    }>;
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
