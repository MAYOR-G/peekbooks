import type {
  FormattingStyleId,
  ManuscriptServiceId,
  TurnaroundId,
} from "@/lib/submission-config";

export type SubmissionStage = "draft" | "payment_pending" | "paid";
export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed";
export type ProjectStatus = "pending" | "in_progress" | "completed";
export type NotificationState = "pending" | "sent" | "failed";

export interface SubmissionRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  stage: SubmissionStage;
  paymentStatus: PaymentStatus;
  projectStatus: ProjectStatus;
  manuscript: {
    originalFileName: string;
    storedFileName: string;
    storagePath: string;
    storageProvider: "filesystem" | "blob";
    storageUrl: string | null;
    extension: string;
    mimeType: string;
    sizeBytes: number;
    wordCount: number;
    detectedWordCount: number;
    finalWordCount: number;
    wordCountAdjustmentNote: string;
  };
  customer: {
    fullName: string;
    email: string;
    institution: string;
    country: string;
  } | null;
  brief: {
    documentType: string;
    academicField: string;
    formattingStyle: FormattingStyleId;
    customFormattingInstructions: string;
    languageStyle: string;
    serviceDetails: string;
    serviceId: ManuscriptServiceId;
    serviceIds: ManuscriptServiceId[];
    turnaroundId: TurnaroundId;
    notes: string;
  } | null;
  pricing: {
    currency: string;
    amount: number;
    baseAmount: number;
    minimumApplied: boolean;
  } | null;
  payment: {
    reference: string;
    authorizationUrl: string;
    accessCode: string;
    status: "initialized" | "success" | "failed" | "pending";
    paidAt: string | null;
    verifiedAt: string | null;
    channel: string | null;
    gatewayResponse: string | null;
    transactionId: string | null;
  } | null;
  notifications: {
    customerSubmission: NotificationState;
    customerPayment: NotificationState;
    editor: NotificationState;
    lastError: string | null;
  };
}

export interface AnalyzedManuscript {
  extension: string;
  mimeType: string;
  sizeBytes: number;
  wordCount: number;
}
