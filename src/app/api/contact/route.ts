import { NextResponse } from "next/server";

import {
  createReplyId,
  createThreadId,
  addReplyToThread,
  listMessageThreads,
  persistContactUpload,
  saveMessageThread,
} from "@/lib/contact-store";
import type { MessageThread } from "@/lib/contact-types";
import { validateDocumentContent, validateSupportedDocument } from "@/lib/file-validation";
import { sendContactReceivedNotifications } from "@/lib/notifications";
import {
  PublicError,
  assertRateLimit,
  getClientIp,
  isValidEmail,
  jsonError,
  normalizeEmail,
  sanitizeText,
  verifyTurnstileToken,
} from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    assertRateLimit(`contact:${ip}`, 5);

    const formData = await request.formData();
    const honeypot = formData.get("company");

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    await verifyTurnstileToken({
      token: valueOf(formData.get("turnstileToken")),
      ip,
    });

    const name = sanitizeText(required(formData, "name"), 120);
    const email = normalizeEmail(required(formData, "email"));
    const subject = sanitizeText(required(formData, "subject"), 180);
    const message = sanitizeText(required(formData, "message"), 5000);
    const file = formData.get("file");

    if (!isValidEmail(email)) {
      throw new PublicError("Please enter a valid email address.");
    }

    if (message.length < 20) {
      throw new PublicError("Please add a little more detail to your message.");
    }

    const existingThread = (await listMessageThreads()).find(
      (thread) =>
        thread.senderEmail === email &&
        thread.status !== "closed" &&
        thread.subject.toLowerCase() === subject.toLowerCase(),
    );
    const threadId = existingThread?.id ?? createThreadId();
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
      });
    }

    const now = new Date().toISOString();
    const reply = {
      id: createReplyId(),
      createdAt: now,
      direction: "user" as const,
      senderName: name,
      senderEmail: email,
      message,
      attachment,
    };

    if (existingThread) {
      const thread = await addReplyToThread(threadId, reply);
      await sendContactReceivedNotifications(thread).catch(() => null);

      return NextResponse.json({
        ok: true,
        message: "Thanks. Your message has been added to the conversation.",
      });
    }

    const thread: MessageThread = {
      id: threadId,
      createdAt: now,
      updatedAt: now,
      status: "unread",
      subject,
      senderName: name,
      senderEmail: email,
      preview: message.slice(0, 180),
      replies: [reply],
    };

    await saveMessageThread(thread);
    await sendContactReceivedNotifications(thread).catch(() => null);

    return NextResponse.json({
      ok: true,
      message: "Thanks. Your message has been received by PeekBooks Editors.",
    });
  } catch (error) {
    return jsonError(error, "We could not send your message right now.");
  }
}

function required(formData: FormData, key: string) {
  const value = valueOf(formData.get(key));

  if (!value) {
    throw new PublicError("Please complete all required fields.");
  }

  return value;
}

function valueOf(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}
