export async function generateAndDownloadPDF(
  transactionId: string,
): Promise<void> {
  // Simulate 2-second PDF generation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Create a simple dummy PDF file
  const dummyContent = `Invoice for Transaction ${transactionId}`;
  const blob = new Blob([dummyContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${transactionId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
