"use client";

import { Button } from "@/app/shared/components/Button";
import { LoadingSpinner } from "@/app/shared/components/LoadingSpinner";
import { useInvoiceDownload } from "../hooks/useInvoiceDownload";
import { TransactionStatus } from "@/app/features/transactions/types";

interface DownloadInvoiceButtonProps {
  transactionId: string;
  status: TransactionStatus;
}

export function DownloadInvoiceButton({
  transactionId,
  status,
}: DownloadInvoiceButtonProps) {
  const { downloadInvoice, isLoading } = useInvoiceDownload();

  const isDisabled = status !== "Success";
  const isLoadingState = isLoading(transactionId);

  const getButtonText = () => {
    if (isLoadingState) {
      return (
        <>
          <LoadingSpinner size="sm" className="inline mr-2" />
          Generating...
        </>
      );
    }
    if (isDisabled) {
      return "Not Available";
    }
    return "Download Invoice";
  };

  const getTooltip = () => {
    if (status === "Failed") {
      return "Invoice only available for successful transactions";
    }
    if (status === "Pending") {
      return "Invoice will be available after payment completes";
    }
    return "";
  };

  return (
    <div title={getTooltip()}>
      <Button
        variant="secondary"
        onClick={() => downloadInvoice(transactionId)}
        isLoading={isLoadingState}
        disabled={isDisabled || isLoadingState}
        className="whitespace-nowrap"
      >
        {getButtonText()}
      </Button>
    </div>
  );
}
