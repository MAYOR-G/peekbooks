import { put, get, head } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { SubmissionRecord } from "@/lib/submission-types";

const FILESYSTEM_STORAGE_ROOT =
  process.env.SUBMISSION_STORAGE_DIR ?? path.join(process.cwd(), "storage");
const FILESYSTEM_MANUSCRIPTS_DIR = path.join(FILESYSTEM_STORAGE_ROOT, "manuscripts");
const FILESYSTEM_SUBMISSIONS_DIR = path.join(FILESYSTEM_STORAGE_ROOT, "submissions");
const BLOB_MANUSCRIPTS_PREFIX = "manuscripts";
const BLOB_SUBMISSIONS_PREFIX = "submissions";

export async function ensureSubmissionStorage() {
  if (isBlobStorageEnabled()) {
    return;
  }

  await Promise.all([
    fs.mkdir(FILESYSTEM_MANUSCRIPTS_DIR, { recursive: true }),
    fs.mkdir(FILESYSTEM_SUBMISSIONS_DIR, { recursive: true }),
  ]);
}

export async function persistUploadedFile({
  submissionId,
  fileName,
  buffer,
  mimeType,
}: {
  submissionId: string;
  fileName: string;
  buffer: Buffer;
  mimeType: string;
}) {
  const safeName = sanitizeFileName(fileName);
  const storedFileName = `${submissionId}-${safeName}`;

  if (isBlobStorageEnabled()) {
    const pathname = `${BLOB_MANUSCRIPTS_PREFIX}/${storedFileName}`;
    const blob = await put(pathname, buffer, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: mimeType || "application/octet-stream",
    });

    return {
      storedFileName,
      storagePath: blob.pathname,
      storageProvider: "blob" as const,
      storageUrl: blob.url,
    };
  }

  await ensureSubmissionStorage();

  const storagePath = path.join(FILESYSTEM_MANUSCRIPTS_DIR, storedFileName);
  await fs.writeFile(storagePath, buffer);

  return {
    storedFileName,
    storagePath,
    storageProvider: "filesystem" as const,
    storageUrl: null,
  };
}

export async function saveSubmission(record: SubmissionRecord) {
  const normalizedRecord = normalizeSubmissionRecord(record);
  const payload = JSON.stringify(normalizedRecord, null, 2);

  if (isBlobStorageEnabled()) {
    await put(getSubmissionBlobPath(normalizedRecord.id), payload, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }

  await ensureSubmissionStorage();
  const submissionPath = path.join(FILESYSTEM_SUBMISSIONS_DIR, `${normalizedRecord.id}.json`);
  await fs.writeFile(submissionPath, payload, "utf8");
}

export async function readSubmission(submissionId: string) {
  if (isBlobStorageEnabled()) {
    const file = await readBlobText(getSubmissionBlobPath(submissionId));
    return normalizeSubmissionRecord(JSON.parse(file) as SubmissionRecord);
  }

  const submissionPath = path.join(FILESYSTEM_SUBMISSIONS_DIR, `${submissionId}.json`);
  const file = await fs.readFile(submissionPath, "utf8");
  return normalizeSubmissionRecord(JSON.parse(file) as SubmissionRecord);
}

export async function readSubmissionFile(record: SubmissionRecord) {
  const normalizedRecord = normalizeSubmissionRecord(record);

  if (normalizedRecord.manuscript.storageProvider === "blob") {
    return readBlobBuffer(normalizedRecord.manuscript.storagePath);
  }

  return fs.readFile(normalizedRecord.manuscript.storagePath);
}

export async function submissionExists(submissionId: string) {
  if (isBlobStorageEnabled()) {
    try {
      await head(getSubmissionBlobPath(submissionId));
      return true;
    } catch {
      return false;
    }
  }

  try {
    await fs.access(path.join(FILESYSTEM_SUBMISSIONS_DIR, `${submissionId}.json`));
    return true;
  } catch {
    return false;
  }
}

export function createDraftSubmissionId() {
  return `sub_${randomUUID()}`;
}

function isBlobStorageEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getSubmissionBlobPath(submissionId: string) {
  return `${BLOB_SUBMISSIONS_PREFIX}/${submissionId}.json`;
}

async function readBlobText(pathname: string) {
  const response = await get(pathname, {
    access: "private",
  });

  if (!response || response.statusCode !== 200 || !response.stream) {
    throw new Error(`Unable to read blob text for ${pathname}.`);
  }

  return new Response(response.stream).text();
}

async function readBlobBuffer(pathname: string) {
  const response = await get(pathname, {
    access: "private",
  });

  if (!response || response.statusCode !== 200 || !response.stream) {
    throw new Error(`Unable to read blob file for ${pathname}.`);
  }

  const arrayBuffer = await new Response(response.stream).arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function normalizeSubmissionRecord(record: SubmissionRecord) {
  return {
    ...record,
    manuscript: {
      ...record.manuscript,
      storageProvider:
        record.manuscript.storageProvider ??
        inferStorageProvider(record.manuscript.storagePath),
      storageUrl: record.manuscript.storageUrl ?? null,
    },
  };
}

function inferStorageProvider(storagePath: string) {
  if (storagePath.startsWith(`${BLOB_MANUSCRIPTS_PREFIX}/`)) {
    return "blob" as const;
  }

  return "filesystem" as const;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}
