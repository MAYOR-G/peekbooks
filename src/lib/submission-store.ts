import { put, get, head, list } from "@vercel/blob";
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
const SUBMISSION_ID_PATTERN =
  /^sub_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function ensureSubmissionStorage() {
  if (isBlobStorageEnabled()) {
    return;
  }

  await Promise.all([
    fs.mkdir(FILESYSTEM_MANUSCRIPTS_DIR, { recursive: true, mode: 0o700 }),
    fs.mkdir(FILESYSTEM_SUBMISSIONS_DIR, { recursive: true, mode: 0o700 }),
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
  assertValidSubmissionId(submissionId);
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
  assertPathWithin(FILESYSTEM_MANUSCRIPTS_DIR, storagePath);
  await fs.writeFile(storagePath, buffer, { mode: 0o600 });

  return {
    storedFileName,
    storagePath,
    storageProvider: "filesystem" as const,
    storageUrl: null,
  };
}

export async function saveSubmission(record: SubmissionRecord) {
  assertValidSubmissionId(record.id);
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
  assertPathWithin(FILESYSTEM_SUBMISSIONS_DIR, submissionPath);
  await fs.writeFile(submissionPath, payload, { encoding: "utf8", mode: 0o600 });
}

export async function readSubmission(submissionId: string) {
  assertValidSubmissionId(submissionId);
  if (isBlobStorageEnabled()) {
    const file = await readBlobText(getSubmissionBlobPath(submissionId));
    return normalizeSubmissionRecord(JSON.parse(file) as SubmissionRecord);
  }

  const submissionPath = path.join(FILESYSTEM_SUBMISSIONS_DIR, `${submissionId}.json`);
  assertPathWithin(FILESYSTEM_SUBMISSIONS_DIR, submissionPath);
  const file = await fs.readFile(submissionPath, "utf8");
  return normalizeSubmissionRecord(JSON.parse(file) as SubmissionRecord);
}

export async function listSubmissions() {
  if (isBlobStorageEnabled()) {
    const result = await list({ prefix: `${BLOB_SUBMISSIONS_PREFIX}/` });
    const records = await Promise.all(
      result.blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          const file = await readBlobText(blob.pathname);
          return normalizeSubmissionRecord(JSON.parse(file) as SubmissionRecord);
        }),
    );

    return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  await ensureSubmissionStorage();
  const files = await fs.readdir(FILESYSTEM_SUBMISSIONS_DIR);
  const records = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const content = await fs.readFile(path.join(FILESYSTEM_SUBMISSIONS_DIR, file), "utf8");
        return normalizeSubmissionRecord(JSON.parse(content) as SubmissionRecord);
      }),
  );

  return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function readSubmissionFile(record: SubmissionRecord) {
  const normalizedRecord = normalizeSubmissionRecord(record);

  if (normalizedRecord.manuscript.storageProvider === "blob") {
    return readBlobBuffer(normalizedRecord.manuscript.storagePath);
  }

  const storagePath = path.resolve(normalizedRecord.manuscript.storagePath);
  assertPathWithin(FILESYSTEM_MANUSCRIPTS_DIR, storagePath);
  return fs.readFile(storagePath);
}

export async function submissionExists(submissionId: string) {
  assertValidSubmissionId(submissionId);
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

export function assertValidSubmissionId(submissionId: string) {
  if (!SUBMISSION_ID_PATTERN.test(submissionId)) {
    throw new Error("Invalid manuscript submission id.");
  }
}

function isBlobStorageEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getSubmissionBlobPath(submissionId: string) {
  assertValidSubmissionId(submissionId);
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
  const detectedWordCount =
    record.manuscript.detectedWordCount ?? record.manuscript.wordCount;
  const finalWordCount =
    record.manuscript.finalWordCount ?? record.manuscript.wordCount;

  return {
    ...record,
    draftAccessTokenHash: record.draftAccessTokenHash ?? null,
    paymentStatus:
      record.paymentStatus ??
      (record.payment?.status === "success"
        ? "paid"
        : record.payment
          ? "pending"
          : "unpaid"),
    projectStatus: record.projectStatus ?? "pending",
    manuscript: {
      ...record.manuscript,
      detectedWordCount,
      finalWordCount,
      wordCount: finalWordCount,
      wordCountAdjustmentNote: record.manuscript.wordCountAdjustmentNote ?? "",
      storageProvider:
        record.manuscript.storageProvider ??
        inferStorageProvider(record.manuscript.storagePath),
      storageUrl: record.manuscript.storageUrl ?? null,
    },
    brief: record.brief
      ? {
          ...record.brief,
          customFormattingInstructions:
            record.brief.customFormattingInstructions ?? "",
          languageStyle: record.brief.languageStyle ?? "No preference",
          serviceDetails: record.brief.serviceDetails ?? "",
          serviceIds: record.brief.serviceIds ?? [record.brief.serviceId],
        }
      : null,
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

function assertPathWithin(root: string, candidate: string) {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);

  if (
    resolvedCandidate !== resolvedRoot &&
    !resolvedCandidate.startsWith(`${resolvedRoot}${path.sep}`)
  ) {
    throw new Error("Resolved storage path is outside the configured directory.");
  }
}
