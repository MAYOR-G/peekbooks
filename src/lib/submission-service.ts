import { calculateQuote } from "@/lib/submission-config";
import { sendSubmissionNotifications } from "@/lib/notifications";
import {
  readSubmission,
  saveSubmission,
  submissionExists,
} from "@/lib/submission-store";
import { verifyPaystackTransaction } from "@/lib/paystack";
import type { SubmissionRecord } from "@/lib/submission-types";

export async function finalizeSubmissionFromReference(reference: string) {
  const verification = await verifyPaystackTransaction(reference);
  const metadata =
    typeof verification.metadata === "string"
      ? safeParseMetadata(verification.metadata)
      : verification.metadata;
  const submissionId = metadata?.submissionId;

  if (!submissionId) {
    throw new Error("Payment verification did not return a submission id.");
  }

  if (!(await submissionExists(submissionId))) {
    throw new Error("We could not find the manuscript submission for this payment.");
  }

  const record = await readSubmission(submissionId);

  if (!record.brief || !record.pricing || !record.payment) {
    throw new Error("Submission record is incomplete.");
  }

  const expectedQuote = calculateQuote({
    wordCount: record.manuscript.wordCount,
    serviceId: record.brief.serviceId,
    turnaroundId: record.brief.turnaroundId,
  });

  if (verification.status !== "success") {
    return {
      record,
      verified: false,
      amountMatches: false,
      message: "Payment has not been completed yet.",
    };
  }

  const amountMatches = verification.amount === Math.round(expectedQuote.amount * 100);

  if (!amountMatches) {
    throw new Error("Verified payment amount does not match the manuscript quote.");
  }

  const alreadyPaid =
    record.stage === "paid" && record.payment.status === "success";

  if (!alreadyPaid) {
    record.stage = "paid";
    record.pricing = {
      amount: expectedQuote.amount,
      baseAmount: expectedQuote.baseAmount,
      currency: verification.currency,
      minimumApplied: expectedQuote.minimumApplied,
    };
    record.payment = {
      ...record.payment,
      status: "success",
      paidAt: verification.paid_at,
      verifiedAt: new Date().toISOString(),
      channel: verification.channel,
      gatewayResponse: verification.gateway_response,
      transactionId: String(verification.id),
    };
    record.updatedAt = new Date().toISOString();

    await saveSubmission(record);
  }

  const finalizedRecord = await ensureNotifications(record);

  return {
    record: finalizedRecord,
    verified: true,
    amountMatches,
    message: "Payment verified successfully.",
  };
}

async function ensureNotifications(record: SubmissionRecord) {
  const allNotificationsSent =
    record.notifications.customerSubmission === "sent" &&
    record.notifications.customerPayment === "sent" &&
    record.notifications.editor === "sent";

  if (allNotificationsSent) {
    return record;
  }

  try {
    return await sendSubmissionNotifications(record);
  } catch (error) {
    record.notifications.lastError =
      error instanceof Error
        ? error.message
        : "Unable to send one or more notifications.";
    record.updatedAt = new Date().toISOString();
    await saveSubmission(record);
    return record;
  }
}

function safeParseMetadata(metadata: string) {
  try {
    return JSON.parse(metadata) as { submissionId?: string };
  } catch {
    return null;
  }
}
