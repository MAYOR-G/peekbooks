import { NextResponse } from "next/server";

import { analyzeManuscriptFile } from "@/lib/manuscript";
import { SITE_CURRENCY } from "@/lib/submission-config";
import {
  createDraftSubmissionId,
  persistUploadedFile,
  saveSubmission,
} from "@/lib/submission-store";
import type { SubmissionRecord } from "@/lib/submission-types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please choose a manuscript file to continue." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const analysis = await analyzeManuscriptFile({
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      buffer,
    });

    const submissionId = createDraftSubmissionId();
    const persistedFile = await persistUploadedFile({
      submissionId,
      fileName: file.name,
      buffer,
    });

    const draftRecord: SubmissionRecord = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stage: "draft",
      manuscript: {
        originalFileName: file.name,
        storedFileName: persistedFile.storedFileName,
        storagePath: persistedFile.storagePath,
        extension: analysis.extension,
        mimeType: analysis.mimeType,
        sizeBytes: analysis.sizeBytes,
        wordCount: analysis.wordCount,
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
      currency: SITE_CURRENCY,
      manuscript: {
        fileName: draftRecord.manuscript.originalFileName,
        extension: draftRecord.manuscript.extension,
        sizeBytes: draftRecord.manuscript.sizeBytes,
        wordCount: draftRecord.manuscript.wordCount,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We could not analyze that manuscript right now.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
