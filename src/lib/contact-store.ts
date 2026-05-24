import { put, get, list } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import { sanitizeFileName } from "@/lib/file-validation";
import type { MessageReply, MessageThread, StoredUpload } from "@/lib/contact-types";

const STORAGE_ROOT = process.env.SUBMISSION_STORAGE_DIR ?? path.join(process.cwd(), "storage");
const MESSAGES_DIR = path.join(STORAGE_ROOT, "messages");
const CONTACT_FILES_DIR = path.join(STORAGE_ROOT, "contact-attachments");
const COMPLETED_FILES_DIR = path.join(STORAGE_ROOT, "completed-files");
const BLOB_MESSAGES_PREFIX = "messages";
const BLOB_CONTACT_FILES_PREFIX = "contact-attachments";
const BLOB_COMPLETED_FILES_PREFIX = "completed-files";

export function createThreadId() {
  return `msg_${randomUUID()}`;
}

export function createReplyId() {
  return `reply_${randomUUID()}`;
}

export async function saveMessageThread(thread: MessageThread) {
  const payload = JSON.stringify(thread, null, 2);

  if (isBlobStorageEnabled()) {
    await put(getMessageBlobPath(thread.id), payload, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }

  await ensureMessageStorage();
  await fs.writeFile(path.join(MESSAGES_DIR, `${thread.id}.json`), payload, "utf8");
}

export async function readMessageThread(threadId: string) {
  if (isBlobStorageEnabled()) {
    const file = await readBlobText(getMessageBlobPath(threadId));
    return JSON.parse(file) as MessageThread;
  }

  const file = await fs.readFile(path.join(MESSAGES_DIR, `${threadId}.json`), "utf8");
  return JSON.parse(file) as MessageThread;
}

export async function listMessageThreads() {
  if (isBlobStorageEnabled()) {
    const result = await list({ prefix: `${BLOB_MESSAGES_PREFIX}/` });
    const threads = await Promise.all(
      result.blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          const file = await readBlobText(blob.pathname);
          return JSON.parse(file) as MessageThread;
        }),
    );

    return threads.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  await ensureMessageStorage();
  const files = await fs.readdir(MESSAGES_DIR);
  const threads = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const content = await fs.readFile(path.join(MESSAGES_DIR, file), "utf8");
        return JSON.parse(content) as MessageThread;
      }),
  );

  return threads.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function addReplyToThread(threadId: string, reply: MessageReply) {
  const thread = await readMessageThread(threadId);
  thread.replies.push(reply);
  thread.updatedAt = reply.createdAt;
  thread.preview = reply.message.slice(0, 180);
  thread.status = reply.direction === "user" ? "unread" : "open";
  await saveMessageThread(thread);
  return thread;
}

export async function persistContactUpload({
  threadId,
  fileName,
  buffer,
  mimeType,
  purpose = "contact",
}: {
  threadId: string;
  fileName: string;
  buffer: Buffer;
  mimeType: string;
  purpose?: "contact" | "completed";
}): Promise<StoredUpload> {
  const safeName = sanitizeFileName(fileName);
  const storedFileName = `${threadId}-${randomUUID()}-${safeName}`;
  const prefix = purpose === "completed" ? BLOB_COMPLETED_FILES_PREFIX : BLOB_CONTACT_FILES_PREFIX;
  const localDir = purpose === "completed" ? COMPLETED_FILES_DIR : CONTACT_FILES_DIR;

  if (isBlobStorageEnabled()) {
    const pathname = `${prefix}/${storedFileName}`;
    const blob = await put(pathname, buffer, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: mimeType || "application/octet-stream",
    });

    return {
      originalFileName: fileName,
      storedFileName,
      storagePath: blob.pathname,
      storageProvider: "blob",
      storageUrl: blob.url,
      extension: safeName.split(".").pop() ?? "",
      mimeType,
      sizeBytes: buffer.byteLength,
    };
  }

  await fs.mkdir(localDir, { recursive: true });
  const storagePath = path.join(localDir, storedFileName);
  await fs.writeFile(storagePath, buffer);

  return {
    originalFileName: fileName,
    storedFileName,
    storagePath,
    storageProvider: "filesystem",
    storageUrl: null,
    extension: safeName.split(".").pop() ?? "",
    mimeType,
    sizeBytes: buffer.byteLength,
  };
}

export async function readStoredUpload(upload: StoredUpload) {
  if (upload.storageProvider === "blob") {
    const response = await get(upload.storagePath, { access: "private" });

    if (!response || response.statusCode !== 200 || !response.stream) {
      throw new Error("Unable to read stored upload.");
    }

    const arrayBuffer = await new Response(response.stream).arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  return fs.readFile(upload.storagePath);
}

async function ensureMessageStorage() {
  await fs.mkdir(MESSAGES_DIR, { recursive: true });
}

function isBlobStorageEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getMessageBlobPath(threadId: string) {
  return `${BLOB_MESSAGES_PREFIX}/${threadId}.json`;
}

async function readBlobText(pathname: string) {
  const response = await get(pathname, { access: "private" });

  if (!response || response.statusCode !== 200 || !response.stream) {
    throw new Error(`Unable to read blob text for ${pathname}.`);
  }

  return new Response(response.stream).text();
}
