import { PublicError } from "@/lib/security";

export const SUPPORTED_DOCUMENT_EXTENSIONS = ["doc", "docx", "pdf", "txt", "rtf"] as const;
export const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_DOCX_ENTRY_COUNT = 2_000;
const MAX_DOCX_EXPANDED_SIZE_BYTES = 50 * 1024 * 1024;

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

export function validateDocumentContent(fileName: string, buffer: Buffer) {
  const extension = getFileExtension(fileName);

  if (extension === "docx") {
    if (!isZip(buffer)) {
      throw new PublicError("The DOCX file does not have a valid document container.");
    }
    validateDocxArchiveLimits(buffer);
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }

  if (extension === "doc") {
    const oleHeader = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    if (!buffer.subarray(0, oleHeader.length).equals(oleHeader)) {
      throw new PublicError("The DOC file signature does not match its extension.");
    }
    return "application/msword";
  }

  if (extension === "pdf") {
    if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
      throw new PublicError("The PDF file signature does not match its extension.");
    }
    return "application/pdf";
  }

  if (extension === "rtf") {
    if (!buffer.subarray(0, 5).toString("ascii").startsWith("{\\rtf")) {
      throw new PublicError("The RTF file signature does not match its extension.");
    }
    return "application/rtf";
  }

  if (extension === "txt") {
    if (buffer.includes(0)) {
      throw new PublicError("The TXT file appears to contain binary data.");
    }
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    } catch {
      throw new PublicError("The TXT file must use UTF-8 text encoding.");
    }
    return "text/plain";
  }

  throw new PublicError("The uploaded document type is not supported.");
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}

function isZip(buffer: Buffer) {
  const signature = buffer.subarray(0, 4).toString("hex");
  return ["504b0304", "504b0506", "504b0708"].includes(signature);
}

function validateDocxArchiveLimits(buffer: Buffer) {
  const centralDirectorySignature = Buffer.from([0x50, 0x4b, 0x01, 0x02]);
  let offset = 0;
  let entryCount = 0;
  let expandedSize = 0;

  while ((offset = buffer.indexOf(centralDirectorySignature, offset)) !== -1) {
    if (offset + 46 > buffer.length) break;

    entryCount += 1;
    expandedSize += buffer.readUInt32LE(offset + 24);

    if (
      entryCount > MAX_DOCX_ENTRY_COUNT ||
      expandedSize > MAX_DOCX_EXPANDED_SIZE_BYTES
    ) {
      throw new PublicError("The DOCX archive is too complex or expands beyond the safe limit.");
    }

    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    offset += 46 + nameLength + extraLength + commentLength;
  }

  if (entryCount === 0) {
    throw new PublicError("The DOCX archive does not contain a readable central directory.");
  }
}
