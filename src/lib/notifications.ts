import { readSubmissionFile, saveSubmission } from "@/lib/submission-store";
import type { NotificationState, SubmissionRecord } from "@/lib/submission-types";
import { formatCurrency } from "@/lib/submission-config";

export async function sendSubmissionNotifications(record: SubmissionRecord) {
  if (!record.customer || !record.brief || !record.pricing || !record.payment) {
    throw new Error("Submission is missing required data for notifications.");
  }

  const manuscriptBuffer = await readSubmissionFile(record);
  const attachmentContent = manuscriptBuffer.toString("base64");

  const customerSubmissionState = await sendIfNeeded(
    record,
    "customerSubmission",
    {
      to: [record.customer.email],
      subject: "We have received your manuscript",
      html: buildCustomerSubmissionEmail(record),
      replyTo: getEditorEmail(),
    },
  );

  const customerPaymentState = await sendIfNeeded(record, "customerPayment", {
    to: [record.customer.email],
    subject: "Your PeekBooks payment receipt",
    html: buildCustomerPaymentEmail(record),
    replyTo: getEditorEmail(),
  });

  const editorState = await sendIfNeeded(record, "editor", {
    to: [getEditorEmail()],
    subject: `New paid manuscript submission: ${record.customer.fullName}`,
    html: buildEditorNotificationEmail(record),
    replyTo: record.customer.email,
    attachments: [
      {
        filename: record.manuscript.originalFileName,
        content: attachmentContent,
      },
    ],
  });

  record.notifications.customerSubmission = customerSubmissionState;
  record.notifications.customerPayment = customerPaymentState;
  record.notifications.editor = editorState;
  record.notifications.lastError =
    customerSubmissionState === "failed" ||
    customerPaymentState === "failed" ||
    editorState === "failed"
      ? "One or more emails failed to send."
      : null;
  record.updatedAt = new Date().toISOString();

  await saveSubmission(record);

  return record.notifications;
}

async function sendIfNeeded(
  record: SubmissionRecord,
  key: keyof SubmissionRecord["notifications"] & "customerSubmission" | "customerPayment" | "editor",
  payload: SendEmailPayload,
): Promise<NotificationState> {
  if (record.notifications[key] === "sent") {
    return "sent";
  }

  try {
    await sendEmail(payload);
    return "sent";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    record.notifications.lastError = message;
    return "failed";
  }
}

interface SendEmailPayload {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

async function sendEmail(payload: SendEmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getResendApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getSenderEmail(),
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo,
      attachments: payload.attachments,
    }),
    cache: "no-store",
  });

  const result = (await response.json()) as {
    id?: string;
    error?: {
      message?: string;
    };
  };

  if (!response.ok || !result.id) {
    throw new Error(result.error?.message || "Unable to send email via Resend.");
  }
}

function buildCustomerSubmissionEmail(record: SubmissionRecord) {
  const editorEmail = getEditorEmail();

  return renderEmailLayout({
    title: "Your manuscript is safely in our queue",
    intro: `Hello ${record.customer?.fullName},`,
    body: `This confirms that PeekBooks has received your manuscript and payment. Our editorial team will review the brief and contact you shortly with the next step in the process.`,
    items: [
      `Service: ${getServiceLabel(record)}`,
      `Turnaround: ${getTurnaroundLabel(record)}`,
      `Detected word count: ${record.manuscript.wordCount.toLocaleString()} words`,
      `Reference: ${record.payment?.reference}`,
    ],
    closing:
      `If you need to add context before we begin, reply to this email and your message will go to our editorial inbox at ${editorEmail}.`,
  });
}

function buildCustomerPaymentEmail(record: SubmissionRecord) {
  const editorEmail = getEditorEmail();

  return renderEmailLayout({
    title: "Your payment receipt",
    intro: `Hello ${record.customer?.fullName},`,
    body: `Your payment has been confirmed. Keep the details below for your records.`,
    items: [
      `Amount paid: ${formatCurrency(record.pricing?.amount ?? 0, record.pricing?.currency)}`,
      `Payment reference: ${record.payment?.reference}`,
      `Payment channel: ${record.payment?.channel ?? "Paystack"}`,
      `Paid at: ${record.payment?.paidAt ? new Date(record.payment.paidAt).toLocaleString("en-US") : "Pending confirmation"}`,
    ],
    closing:
      `A member of our editorial team will contact you shortly with your assigned turnaround window and any clarifications, if needed. If you reply to this email, your message will be routed to ${editorEmail}.`,
  });
}

function buildEditorNotificationEmail(record: SubmissionRecord) {
  return renderEmailLayout({
    title: "New paid manuscript submission",
    intro: "A customer has completed a manuscript submission and payment.",
    body: "The manuscript file is attached to this email. Key details are below.",
    items: [
      `Customer: ${record.customer?.fullName}`,
      `Email: ${record.customer?.email}`,
      `Institution: ${record.customer?.institution || "Not provided"}`,
      `Country: ${record.customer?.country || "Not provided"}`,
      `Document type: ${record.brief?.documentType}`,
      `Academic field: ${record.brief?.academicField}`,
      `Formatting: ${record.brief?.formattingStyle}`,
      `Service: ${getServiceLabel(record)}`,
      `Turnaround: ${getTurnaroundLabel(record)}`,
      `Word count: ${record.manuscript.wordCount.toLocaleString()} words`,
      `File: ${record.manuscript.originalFileName} (${formatBytes(record.manuscript.sizeBytes)})`,
      `Amount paid: ${formatCurrency(record.pricing?.amount ?? 0, record.pricing?.currency)}`,
      `Payment reference: ${record.payment?.reference}`,
      `Payment channel: ${record.payment?.channel ?? "Paystack"}`,
      `Notes: ${record.brief?.notes || "No additional notes"}`,
    ],
    closing:
      "Reply directly to the customer when you are ready to begin the editorial review.",
  });
}

function renderEmailLayout({
  title,
  intro,
  body,
  items,
  closing,
}: {
  title: string;
  intro: string;
  body: string;
  items: string[];
  closing: string;
}) {
  const listMarkup = items
    .map(
      (item) =>
        `<li style="margin:0 0 10px;color:#334155;line-height:1.6;">${escapeHtml(item)}</li>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:32px;color:#0f172a;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:28px 32px;border-bottom:1px solid #e2e8f0;background:#eff6ff;">
          <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#1d4ed8;font-weight:700;">PeekBooks</div>
          <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-family:'Times New Roman',serif;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px;color:#0f172a;line-height:1.7;">${escapeHtml(intro)}</p>
          <p style="margin:0 0 20px;color:#334155;line-height:1.7;">${escapeHtml(body)}</p>
          <ul style="padding-left:20px;margin:0 0 24px;">${listMarkup}</ul>
          <p style="margin:0;color:#334155;line-height:1.7;">${escapeHtml(closing)}</p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getServiceLabel(record: SubmissionRecord) {
  return record.brief?.serviceId.replaceAll("-", " ") ?? "Unknown";
}

function getTurnaroundLabel(record: SubmissionRecord) {
  return record.brief?.turnaroundId.replaceAll("-", " ") ?? "Unknown";
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return apiKey;
}

function getSenderEmail() {
  const senderEmail = process.env.RESEND_FROM_EMAIL;

  if (!senderEmail) {
    throw new Error("Missing RESEND_FROM_EMAIL environment variable.");
  }

  return senderEmail;
}

function getEditorEmail() {
  const editorEmail = process.env.EDITOR_NOTIFICATION_EMAIL;

  if (!editorEmail) {
    throw new Error("Missing EDITOR_NOTIFICATION_EMAIL environment variable.");
  }

  return editorEmail;
}
