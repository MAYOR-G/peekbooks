import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { SubmissionRecord } from "@/lib/submission-types";

const STORAGE_ROOT =
  process.env.SUBMISSION_STORAGE_DIR ?? path.join(process.cwd(), "storage");
const MANUSCRIPTS_DIR = path.join(STORAGE_ROOT, "manuscripts");
const SUBMISSIONS_DIR = path.join(STORAGE_ROOT, "submissions");

export async function ensureSubmissionStorage() {
  await Promise.all([
    fs.mkdir(MANUSCRIPTS_DIR, { recursive: true }),
    fs.mkdir(SUBMISSIONS_DIR, { recursive: true }),
  ]);
}

export async function persistUploadedFile({
  submissionId,
  fileName,
  buffer,
}: {
  submissionId: string;
  fileName: string;
  buffer: Buffer;
}) {
  await ensureSubmissionStorage();

  const safeName = sanitizeFileName(fileName);
  const storedFileName = `${submissionId}-${safeName}`;
  const storagePath = path.join(MANUSCRIPTS_DIR, storedFileName);

  await fs.writeFile(storagePath, buffer);

  return {
    storedFileName,
    storagePath,
  };
}

export async function saveSubmission(record: SubmissionRecord) {
  await ensureSubmissionStorage();
  const submissionPath = path.join(SUBMISSIONS_DIR, `${record.id}.json`);
  await fs.writeFile(submissionPath, JSON.stringify(record, null, 2), "utf8");
}

export async function readSubmission(submissionId: string) {
  const submissionPath = path.join(SUBMISSIONS_DIR, `${submissionId}.json`);
  const file = await fs.readFile(submissionPath, "utf8");
  return JSON.parse(file) as SubmissionRecord;
}

export async function readSubmissionFile(record: SubmissionRecord) {
  return fs.readFile(record.manuscript.storagePath);
}

export async function submissionExists(submissionId: string) {
  try {
    await fs.access(path.join(SUBMISSIONS_DIR, `${submissionId}.json`));
    return true;
  } catch {
    return false;
  }
}

export function createDraftSubmissionId() {
  return `sub_${randomUUID()}`;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}
