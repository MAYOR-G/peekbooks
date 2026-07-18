import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addReplyToThread, createReplyId, persistContactUpload } from "@/lib/contact-store";
import { validateDocumentContent, validateSupportedDocument } from "@/lib/file-validation";
import { sendAdminReplyEmail } from "@/lib/notifications";
import { PublicError, jsonError, sanitizeText } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ threadId: string }> },
) {
  try {
    if (!(await isAdminAuthenticated())) {
      throw new PublicError("Unauthorized.", 401);
    }

    const { threadId } = await context.params;
    const formData = await request.formData();
    const message = sanitizeText(String(formData.get("message") ?? ""), 5000);
    const file = formData.get("file");

    if (message.length < 2) {
      throw new PublicError("Please enter a reply.");
    }

    let attachment = null;

    if (file instanceof File && file.size > 0) {
      validateSupportedDocument(file.name, file.size);
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = validateDocumentContent(file.name, buffer);
      attachment = await persistContactUpload({
        threadId,
        fileName: file.name,
        buffer,
        mimeType,
        purpose: "completed",
      });
    }

    const reply = {
      id: createReplyId(),
      createdAt: new Date().toISOString(),
      direction: "admin" as const,
      senderName: "PeekBooks Editors",
      senderEmail: process.env.EDITOR_NOTIFICATION_EMAIL ?? "admin@peekbookeditors.com",
      message,
      attachment,
    };

    const thread = await addReplyToThread(threadId, reply);
    await sendAdminReplyEmail(thread, reply).catch(() => null);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError(error, "Unable to send reply.");
  }
}
