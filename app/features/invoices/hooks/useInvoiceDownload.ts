"use client";

import { useState } from "react";
import { generateAndDownloadPDF } from "../lib/pdfSimulator";
import { useNotification } from "@/app/features/notifications/hooks/useNotification";

interface UseInvoiceDownloadState {
  [transactionId: string]: boolean;
}

export function useInvoiceDownload() {
  const [loadingStates, setLoadingStates] = useState<UseInvoiceDownloadState>(
    {},
  );
  const { success, error } = useNotification();

  const downloadInvoice = async (transactionId: string) => {
    setLoadingStates((prev) => ({ ...prev, [transactionId]: true }));

    try {
      await generateAndDownloadPDF(transactionId);
      success("Invoice downloaded successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to download invoice";
      error(`Download failed: ${errorMessage}`);
      console.error("Download failed:", err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [transactionId]: false }));
    }
  };

  return {
    downloadInvoice,
    isLoading: (transactionId: string) => loadingStates[transactionId] ?? false,
  };
}
