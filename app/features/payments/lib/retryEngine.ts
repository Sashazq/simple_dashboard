export async function retryPayment(
  transactionId: string,
): Promise<"Success" | "Failed"> {
  // Simulate random delay between 1-4 seconds
  const delay = Math.random() * 3000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // 20% failure rate
  const success = Math.random() > 0.2;
  return success ? "Success" : "Failed";
}
