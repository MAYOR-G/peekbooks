import mammoth from "mammoth";

import {
  MAX_MANUSCRIPT_SIZE_BYTES,
  SUPPORTED_MANUSCRIPT_EXTENSIONS,
  countWordsFromText,
} from "@/lib/submission-config";
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
  }

  const wordCount = countWordsFromText(textContent);

  if (wordCount === 0) {
    throw new Error(
      "We could not detect readable text in that file. Please upload a DOCX or TXT manuscript with selectable text.",
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

export function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function validateManuscript(fileName: string, sizeBytes: number) {
  const extension = getFileExtension(fileName);

  if (!SUPPORTED_MANUSCRIPT_EXTENSIONS.includes(extension as never)) {
    throw new Error(
      "Supported manuscript formats are DOCX and TXT. Older DOC files need to be resaved as DOCX before submission.",
    );
  }

  if (sizeBytes > MAX_MANUSCRIPT_SIZE_BYTES) {
    throw new Error("Please upload a file smaller than 10 MB.");
  }
}
