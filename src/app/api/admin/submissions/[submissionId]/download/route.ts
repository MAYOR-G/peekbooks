import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readSubmission, readSubmissionFile } from "@/lib/submission-store";
import { PublicError, attachmentContentDisposition, jsonError } from "@/lib/security";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ submissionId: string }> },
) {
  try {
    if (!(await isAdminAuthenticated())) {
      throw new PublicError("Unauthorized.", 401);
    }

    const { submissionId } = await context.params;
    const record = await readSubmission(submissionId);
    const buffer = await readSubmissionFile(record);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": record.manuscript.mimeType || "application/octet-stream",
        "Content-Disposition": attachmentContentDisposition(record.manuscript.originalFileName),
      },
    });
  } catch (error) {
    return jsonError(error, "Unable to download manuscript.");
  }
}
