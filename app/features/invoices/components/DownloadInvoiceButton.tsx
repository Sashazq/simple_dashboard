"use client";

import { Button } from "@/app/shared/components/Button";
import { LoadingSpinner } from "@/app/shared/components/LoadingSpinner";
import { useInvoiceDownload } from "../hooks/useInvoiceDownload";

interface DownloadInvoiceButtonProps {
  transactionId: string;
}

export function DownloadInvoiceButton({
  transactionId,
}: DownloadInvoiceButtonProps) {
  const { downloadInvoice, isLoading } = useInvoiceDownload();

  return (
    <Button
      variant="secondary"
      onClick={() => downloadInvoice(transactionId)}
      isLoading={isLoading(transactionId)}
      className="whitespace-nowrap"
    >
      {isLoading(transactionId) ? (
        <>
          <LoadingSpinner size="sm" className="inline mr-2" />
          Generating...
        </>
      ) : (
        "Download Invoice"
      )}
    </Button>
  );
}
