import { NextResponse } from "next/server";

import {
  DOCUMENT_TYPE_OPTIONS,
  FORMATTING_OPTIONS,
  LANGUAGE_STYLE_OPTIONS,
  MANUSCRIPT_SERVICES,
  SITE_CURRENCY,
  TRANSCRIPTION_LANGUAGE_OPTIONS,
  TURNAROUND_OPTIONS,
  calculateMultiServiceQuote,
} from "@/lib/submission-config";
import { initializePaystackTransaction } from "@/lib/paystack";
import { readSubmission, saveSubmission } from "@/lib/submission-store";
import { sendUnpaidSubmissionNotifications } from "@/lib/notifications";
import {
  PublicError,
  assertRateLimit,
  getClientIp,
  hashOpaqueToken,
  jsonError,
  safeCompare,
  sanitizeText,
  verifyTurnstileToken,
} from "@/lib/security";
import type { FormattingStyleId } from "@/lib/submission-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    assertRateLimit(`submission:${ip}`, 4);

    const payload = (await request.json()) as {
      submissionId?: string;
      draftToken?: string;
      fullName?: string;
      email?: string;
      institution?: string;
      country?: string;
      documentType?: string;
      academicField?: string;
      formattingStyle?: FormattingStyleId;
      customFormattingInstructions?: string;
      languageStyle?: string;
      serviceDetails?: string;
      serviceId?: string;
      serviceIds?: string[];
      turnaroundId?: string;
      notes?: string;
      finalWordCount?: number;
      wordCountAdjustmentNote?: string;
      turnstileToken?: string;
      company?: string;
    };

    if (payload.company) {
      return NextResponse.json({ ok: true });
    }

    await verifyTurnstileToken({ token: payload.turnstileToken, ip });

    const validated = validateSubmissionPayload(payload);
    const record = await readSubmission(validated.submissionId);

    if (
      !record.draftAccessTokenHash ||
      !safeCompare(hashOpaqueToken(validated.draftToken), record.draftAccessTokenHash)
    ) {
      throw new PublicError("This manuscript draft is not authorized for this session.", 403);
    }

    if (record.stage !== "draft" || record.paymentStatus !== "unpaid" || record.payment) {
      throw new PublicError("This manuscript submission has already been finalized or sent to payment.", 409);
    }

    record.draftAccessTokenHash = null;
    const finalWordCount = validated.finalWordCount;
    const quote = calculateMultiServiceQuote({
      wordCount: finalWordCount,
      serviceIds: validated.serviceIds,
      turnaroundId: validated.turnaroundId,
    });

    record.customer = {
      fullName: validated.fullName,
      email: validated.email,
      institution: validated.institution,
      country: validated.country,
    };
    record.brief = {
      documentType: validated.documentType,
      academicField: validated.academicField,
      formattingStyle: validated.formattingStyle,
      customFormattingInstructions: validated.customFormattingInstructions,
      languageStyle: validated.languageStyle,
      serviceDetails: validated.serviceDetails,
      serviceId: validated.serviceId,
      serviceIds: validated.serviceIds,
      turnaroundId: validated.turnaroundId,
      notes: validated.notes,
    };
    record.pricing = {
      currency: SITE_CURRENCY,
      amount: quote.amount,
      baseAmount: quote.baseAmount,
      minimumApplied: quote.minimumApplied,
    };
    record.manuscript.detectedWordCount =
      record.manuscript.detectedWordCount ?? record.manuscript.wordCount;
    record.manuscript.finalWordCount = finalWordCount;
    record.manuscript.wordCount = finalWordCount;
    record.manuscript.wordCountAdjustmentNote = validated.wordCountAdjustmentNote;
    record.payment = null;
    record.stage = "payment_pending";
    record.paymentStatus = "unpaid";
    record.projectStatus = "pending";
    record.updatedAt = new Date().toISOString();

    await saveSubmission(record);
    await sendUnpaidSubmissionNotifications(record).catch(async (error) => {
      record.notifications.lastError =
        error instanceof Error ? error.message : "Unable to send submission emails.";
      await saveSubmission(record);
    });

    if (quote.amount <= 0 || finalWordCount > 50000) {
      return NextResponse.json({
        authorizationUrl: null,
        submissionId: record.id,
        paymentStatus: record.paymentStatus,
        customReview: finalWordCount > 50000,
        quote: {
          amount: quote.amount,
          baseAmount: quote.baseAmount,
          minimumApplied: quote.minimumApplied,
          currency: SITE_CURRENCY,
        },
      });
    }

    try {
      const payment = await initializePaystackTransaction({
        email: validated.email,
        amount: quote.amount,
        metadata: {
          submissionId: record.id,
          wordCount: finalWordCount,
          serviceId: validated.serviceId,
          serviceIds: validated.serviceIds.join(","),
          turnaroundId: validated.turnaroundId,
        },
      });

      record.payment = {
        reference: payment.reference,
        authorizationUrl: payment.authorization_url,
        accessCode: payment.access_code,
        status: "initialized",
        paidAt: null,
        verifiedAt: null,
        channel: null,
        gatewayResponse: null,
        transactionId: null,
      };
      record.paymentStatus = "pending";
      record.updatedAt = new Date().toISOString();
      await saveSubmission(record);

      return NextResponse.json({
        authorizationUrl: payment.authorization_url,
        submissionId: record.id,
        paymentStatus: record.paymentStatus,
        quote: {
          amount: quote.amount,
          baseAmount: quote.baseAmount,
          minimumApplied: quote.minimumApplied,
          currency: SITE_CURRENCY,
        },
      });
    } catch {
      return NextResponse.json({
        authorizationUrl: null,
        submissionId: record.id,
        paymentStatus: "unpaid",
        message:
          "Your manuscript was saved, but payment could not be started. Our team will follow up with next steps.",
        quote: {
          amount: quote.amount,
          baseAmount: quote.baseAmount,
          minimumApplied: quote.minimumApplied,
          currency: SITE_CURRENCY,
        },
      });
    }
  } catch (error) {
    return jsonError(error, "We could not save the manuscript submission.");
  }
}

function validateSubmissionPayload(payload: {
  submissionId?: string;
  draftToken?: string;
  fullName?: string;
  email?: string;
  institution?: string;
  country?: string;
  documentType?: string;
  academicField?: string;
  formattingStyle?: FormattingStyleId;
  customFormattingInstructions?: string;
  languageStyle?: string;
  serviceDetails?: string;
  serviceId?: string;
  serviceIds?: string[];
  turnaroundId?: string;
  notes?: string;
  finalWordCount?: number;
  wordCountAdjustmentNote?: string;
}) {
  if (!payload.submissionId) {
    throw new Error("Missing manuscript submission id.");
  }

  if (!payload.draftToken || !/^[a-f0-9]{64}$/i.test(payload.draftToken)) {
    throw new PublicError("This manuscript draft is missing its secure session token.", 403);
  }

  if (!payload.fullName?.trim()) {
    throw new Error("Please enter your full name.");
  }

  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!payload.documentType || !DOCUMENT_TYPE_OPTIONS.includes(payload.documentType as never)) {
    throw new Error("Please choose your manuscript type.");
  }

  if (!payload.academicField?.trim()) {
    throw new Error("Please enter the manuscript field or discipline.");
  }

  if (
    !payload.formattingStyle ||
    !FORMATTING_OPTIONS.some((option) => option.id === payload.formattingStyle)
  ) {
    throw new Error("Please choose the required formatting style.");
  }

  const serviceIds =
    payload.serviceIds?.length
      ? payload.serviceIds
      : payload.serviceId
        ? [payload.serviceId]
        : [];

  if (
    serviceIds.length === 0 ||
    serviceIds.some((serviceId) => !MANUSCRIPT_SERVICES.some((service) => service.id === serviceId))
  ) {
    throw new Error("Please select an editorial service.");
  }

  if (!TURNAROUND_OPTIONS.some((option) => option.id === payload.turnaroundId)) {
    throw new Error("Please choose a turnaround option.");
  }

  const finalWordCount = Number(payload.finalWordCount);

  if (!Number.isFinite(finalWordCount) || finalWordCount < 1 || finalWordCount > 500000) {
    throw new PublicError("Please enter a valid final word count.");
  }

  const turnaround = TURNAROUND_OPTIONS.find((option) => option.id === payload.turnaroundId);

  if (turnaround?.maxWords && finalWordCount > turnaround.maxWords && finalWordCount <= 50000) {
    throw new PublicError("Please choose a longer turnaround for this word count.");
  }

  if (
    payload.languageStyle &&
    !LANGUAGE_STYLE_OPTIONS.includes(payload.languageStyle as never)
  ) {
    throw new Error("Please choose a valid language or style preference.");
  }

  if (
    serviceIds.includes("transcribing") &&
    payload.serviceDetails &&
    !TRANSCRIPTION_LANGUAGE_OPTIONS.includes(payload.serviceDetails as never) &&
    !payload.serviceDetails.startsWith("Other:")
  ) {
    throw new Error("Please choose a valid transcription language.");
  }

  return {
    submissionId: payload.submissionId,
    draftToken: payload.draftToken,
    fullName: sanitizeText(payload.fullName, 120),
    email: payload.email.trim().toLowerCase(),
    institution: sanitizeText(payload.institution ?? "", 160),
    country: sanitizeText(payload.country ?? "", 100),
    documentType: payload.documentType,
    academicField: sanitizeText(payload.academicField, 180),
    formattingStyle: payload.formattingStyle,
    customFormattingInstructions: sanitizeText(payload.customFormattingInstructions ?? "", 1000),
    languageStyle: payload.languageStyle || "No preference",
    serviceDetails: sanitizeText(payload.serviceDetails ?? "", 300),
    serviceId: serviceIds[0] as (typeof MANUSCRIPT_SERVICES)[number]["id"],
    serviceIds: serviceIds as Array<(typeof MANUSCRIPT_SERVICES)[number]["id"]>,
    turnaroundId: payload.turnaroundId as (typeof TURNAROUND_OPTIONS)[number]["id"],
    notes: sanitizeText(payload.notes ?? "", 4000),
    finalWordCount: Math.round(finalWordCount),
    wordCountAdjustmentNote: sanitizeText(payload.wordCountAdjustmentNote ?? "", 1000),
  };
}
