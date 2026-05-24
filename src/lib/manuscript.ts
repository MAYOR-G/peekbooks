import mammoth from "mammoth";

import {
  countWordsFromText,
} from "@/lib/submission-config";
import {
  getFileExtension,
  validateSupportedDocument,
} from "@/lib/file-validation";
import type { AnalyzedManuscript } from "@/lib/submission-types";

export async function analyzeManuscriptFile({
  fileName,
  mimeType,
  sizeBytes,
  buffer,
}: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  buffer: Buffer;
}) {
  validateManuscript(fileName, sizeBytes);

  const extension = getFileExtension(fileName);
  let textContent = "";

  if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    textContent = result.value;
  } else if (extension === "txt") {
    textContent = new TextDecoder("utf-8").decode(buffer);
  } else if (extension === "rtf") {
    textContent = extractRtfText(buffer);
  } else if (extension === "pdf") {
    textContent = extractPlainTextFallback(buffer);
  } else if (extension === "doc") {
    textContent = extractPlainTextFallback(buffer);
  }

  const wordCount = countWordsFromText(textContent);

  if (wordCount === 0) {
    throw new Error(
      "We could not detect readable text in that file. Please upload a document with selectable text or enter a corrected word count after upload.",
    );
  }

  const analysis: AnalyzedManuscript = {
    extension,
    mimeType,
    sizeBytes,
    wordCount,
  };

  return analysis;
}

export function validateManuscript(fileName: string, sizeBytes: number) {
  validateSupportedDocument(fileName, sizeBytes);
}

function extractRtfText(buffer: Buffer) {
  return new TextDecoder("utf-8")
    .decode(buffer)
    .replace(/\\'[0-9a-fA-F]{2}/g, " ")
    .replace(/\\[a-zA-Z]+\d* ?/g, " ")
    .replace(/[{}]/g, " ");
}

function extractPlainTextFallback(buffer: Buffer) {
  return buffer
    .toString("utf8")
    .replace(/[^\x20-\x7E\s]/g, " ")
    .replace(/\s+/g, " ");
}
