import { NextResponse } from "next/server";

import {
  DOCUMENT_TYPE_OPTIONS,
  FORMATTING_OPTIONS,
  MANUSCRIPT_SERVICES,
  SITE_CURRENCY,
  TURNAROUND_OPTIONS,
  calculateQuote,
} from "@/lib/submission-config";
import { initializePaystackTransaction } from "@/lib/paystack";
import { readSubmission, saveSubmission } from "@/lib/submission-store";
import type { FormattingStyleId } from "@/lib/submission-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      submissionId?: string;
      fullName?: string;
      email?: string;
      institution?: string;
      country?: string;
      documentType?: string;
      academicField?: string;
      formattingStyle?: FormattingStyleId;
      serviceId?: string;
      turnaroundId?: string;
      notes?: string;
    };

    const validated = validateSubmissionPayload(payload);
    const record = await readSubmission(validated.submissionId);
    const quote = calculateQuote({
      wordCount: record.manuscript.wordCount,
      serviceId: validated.serviceId,
      turnaroundId: validated.turnaroundId,
    });

    const payment = await initializePaystackTransaction({
      email: validated.email,
      amount: quote.amount,
      metadata: {
        submissionId: record.id,
        wordCount: record.manuscript.wordCount,
        serviceId: validated.serviceId,
        turnaroundId: validated.turnaroundId,
      },
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
      serviceId: validated.serviceId,
      turnaroundId: validated.turnaroundId,
      notes: validated.notes,
    };
    record.pricing = {
      currency: SITE_CURRENCY,
      amount: quote.amount,
      baseAmount: quote.baseAmount,
      minimumApplied: quote.minimumApplied,
    };
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
    record.stage = "payment_pending";
    record.updatedAt = new Date().toISOString();

    await saveSubmission(record);

    return NextResponse.json({
      authorizationUrl: payment.authorization_url,
      reference: payment.reference,
      quote: {
        amount: quote.amount,
        baseAmount: quote.baseAmount,
        minimumApplied: quote.minimumApplied,
        currency: SITE_CURRENCY,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We could not start the payment process.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function validateSubmissionPayload(payload: {
  submissionId?: string;
  fullName?: string;
  email?: string;
  institution?: string;
  country?: string;
  documentType?: string;
  academicField?: string;
  formattingStyle?: FormattingStyleId;
  serviceId?: string;
  turnaroundId?: string;
  notes?: string;
}) {
  if (!payload.submissionId) {
    throw new Error("Missing manuscript submission id.");
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

  if (!MANUSCRIPT_SERVICES.some((service) => service.id === payload.serviceId)) {
    throw new Error("Please select an editorial service.");
  }

  if (!TURNAROUND_OPTIONS.some((option) => option.id === payload.turnaroundId)) {
    throw new Error("Please choose a turnaround option.");
  }

  return {
    submissionId: payload.submissionId,
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    institution: payload.institution?.trim() ?? "",
    country: payload.country?.trim() ?? "",
    documentType: payload.documentType,
    academicField: payload.academicField.trim(),
    formattingStyle: payload.formattingStyle,
    serviceId: payload.serviceId as (typeof MANUSCRIPT_SERVICES)[number]["id"],
    turnaroundId: payload.turnaroundId as (typeof TURNAROUND_OPTIONS)[number]["id"],
    notes: payload.notes?.trim() ?? "",
  };
}
