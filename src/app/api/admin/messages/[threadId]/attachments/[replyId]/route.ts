import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readMessageThread, readStoredUpload } from "@/lib/contact-store";
import { PublicError, attachmentContentDisposition, jsonError } from "@/lib/security";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ threadId: string; replyId: string }> },
) {
  try {
    if (!(await isAdminAuthenticated())) {
      throw new PublicError("Unauthorized.", 401);
    }

    const { threadId, replyId } = await context.params;
    const thread = await readMessageThread(threadId);
    const reply = thread.replies.find((item) => item.id === replyId);

    if (!reply?.attachment) {
      throw new PublicError("Attachment not found.", 404);
    }

    const buffer = await readStoredUpload(reply.attachment);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": reply.attachment.mimeType || "application/octet-stream",
        "Content-Disposition": attachmentContentDisposition(reply.attachment.originalFileName),
      },
    });
  } catch (error) {
    return jsonError(error, "Unable to download attachment.");
  }
}
