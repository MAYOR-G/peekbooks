import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

import { analyzeManuscriptFile } from "@/lib/manuscript";
import { SITE_CURRENCY } from "@/lib/submission-config";
import {
  assertRateLimit,
  getClientIp,
  hashOpaqueToken,
  jsonError,
  verifyTurnstileToken,
} from "@/lib/security";
import {
  createDraftSubmissionId,
  persistUploadedFile,
  saveSubmission,
} from "@/lib/submission-store";
import type { SubmissionRecord } from "@/lib/submission-types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    assertRateLimit(`manuscript:${ip}`, 4);

    const formData = await request.formData();
    const file = formData.get("file");
    const honeypot = formData.get("company");

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    await verifyTurnstileToken({
      token: String(formData.get("turnstileToken") ?? ""),
      ip,
    });

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please choose a manuscript file to continue." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const analysis = await analyzeManuscriptFile({
      fileName: file.name,
      sizeBytes: file.size,
      buffer,
    });

    const submissionId = createDraftSubmissionId();
    const draftToken = randomBytes(32).toString("hex");
    const persistedFile = await persistUploadedFile({
      submissionId,
      fileName: file.name,
      buffer,
      mimeType: analysis.mimeType,
    });

    const draftRecord: SubmissionRecord = {
      id: submissionId,
      draftAccessTokenHash: hashOpaqueToken(draftToken),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stage: "draft",
      paymentStatus: "unpaid",
      projectStatus: "pending",
      manuscript: {
        originalFileName: file.name,
        storedFileName: persistedFile.storedFileName,
        storagePath: persistedFile.storagePath,
        storageProvider: persistedFile.storageProvider,
        storageUrl: persistedFile.storageUrl,
        extension: analysis.extension,
        mimeType: analysis.mimeType,
        sizeBytes: analysis.sizeBytes,
        wordCount: analysis.wordCount,
        detectedWordCount: analysis.wordCount,
        finalWordCount: analysis.wordCount,
        wordCountAdjustmentNote: "",
      },
      customer: null,
      brief: null,
      pricing: null,
      payment: null,
      notifications: {
        customerSubmission: "pending",
        customerPayment: "pending",
        editor: "pending",
        lastError: null,
      },
    };

    await saveSubmission(draftRecord);

    return NextResponse.json({
      submissionId,
      draftToken,
      currency: SITE_CURRENCY,
      manuscript: {
        fileName: draftRecord.manuscript.originalFileName,
        extension: draftRecord.manuscript.extension,
        sizeBytes: draftRecord.manuscript.sizeBytes,
        wordCount: draftRecord.manuscript.wordCount,
      },
    });
  } catch (error) {
    return jsonError(error, "We could not analyze that manuscript right now.");
  }
}
