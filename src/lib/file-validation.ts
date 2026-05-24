import { PublicError } from "@/lib/security";

export const SUPPORTED_DOCUMENT_EXTENSIONS = ["doc", "docx", "pdf", "txt", "rtf"] as const;
export const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;

export function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function validateSupportedDocument(fileName: string, sizeBytes: number) {
  const extension = getFileExtension(fileName);

  if (!SUPPORTED_DOCUMENT_EXTENSIONS.includes(extension as never)) {
    throw new PublicError("Please upload a DOC, DOCX, PDF, TXT, or RTF file.");
  }

  if (sizeBytes <= 0) {
    throw new PublicError("Please upload a readable file.");
  }

  if (sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) {
    throw new PublicError("Please upload a file smaller than 10 MB.");
  }
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}
