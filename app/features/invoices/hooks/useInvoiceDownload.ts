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
  const { success } = useNotification();

  const downloadInvoice = async (transactionId: string) => {
    setLoadingStates((prev) => ({ ...prev, [transactionId]: true }));

    try {
      await generateAndDownloadPDF(transactionId);
      success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [transactionId]: false }));
    }
  };

  return {
    downloadInvoice,
    isLoading: (transactionId: string) => loadingStates[transactionId] ?? false,
  };
}
