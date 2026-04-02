export const SITE_CURRENCY =
  process.env.NEXT_PUBLIC_SITE_CURRENCY?.toUpperCase() ?? "USD";
export const BASE_PRICING_CURRENCY = "USD";
export const USD_TO_NGN_RATE = Number(process.env.USD_TO_NGN_RATE ?? "1500");

export const MINIMUM_ORDER_VALUE = 15;
export const MAX_MANUSCRIPT_SIZE_BYTES = 10 * 1024 * 1024;

export const SUPPORTED_MANUSCRIPT_EXTENSIONS = ["docx", "txt"] as const;

export const FORMATTING_OPTIONS = [
  { id: "none", label: "None / standard consistency" },
  { id: "apa", label: "APA (7th edition)" },
  { id: "mla", label: "MLA" },
  { id: "chicago", label: "Chicago Manual of Style" },
  { id: "harvard", label: "Harvard referencing" },
  { id: "journal-specific", label: "Journal-specific instructions" },
] as const;

export const DOCUMENT_TYPE_OPTIONS = [
  "Journal article",
  "Thesis or dissertation chapter",
  "Research proposal",
  "Grant application",
  "Book manuscript",
  "Essay or coursework",
  "Personal statement / admissions",
  "Business report / proposal",
  "Other",
] as const;

export const MANUSCRIPT_SERVICES = [
  {
    id: "proofreading",
    label: "Proofreading",
    description: "Grammar, punctuation, spelling, and consistency polishing.",
    ratePerWord: 0.018,
    turnaroundNote: "Best when the draft is already structurally sound.",
  },
  {
    id: "copy-editing",
    label: "Copy-editing",
    description: "Sentence-level clarity, tone, flow, and editorial corrections.",
    ratePerWord: 0.032,
    turnaroundNote: "Recommended for most academic and professional manuscripts.",
  },
  {
    id: "substantive-editing",
    label: "Substantive editing",
    description: "Deeper intervention for structure, coherence, and readability.",
    ratePerWord: 0.05,
    turnaroundNote: "Ideal for complex drafts that need stronger organization.",
  },
] as const;

export const TURNAROUND_OPTIONS = [
  {
    id: "standard",
    label: "Standard",
    days: "5 to 7 business days",
    multiplier: 1,
    description: "Balanced turnaround for most submissions.",
  },
  {
    id: "priority",
    label: "Priority",
    days: "2 to 3 business days",
    multiplier: 1.35,
    description: "Expedited editorial scheduling for tighter deadlines.",
  },
  {
    id: "express",
    label: "Express",
    days: "24 hours",
    multiplier: 1.75,
    description: "Reserved for urgent manuscripts that need immediate attention.",
  },
] as const;

export type ManuscriptServiceId = (typeof MANUSCRIPT_SERVICES)[number]["id"];
export type TurnaroundId = (typeof TURNAROUND_OPTIONS)[number]["id"];
export type FormattingStyleId = (typeof FORMATTING_OPTIONS)[number]["id"];

export function getServiceById(serviceId: ManuscriptServiceId) {
  return MANUSCRIPT_SERVICES.find((service) => service.id === serviceId);
}

export function getTurnaroundById(turnaroundId: TurnaroundId) {
  return TURNAROUND_OPTIONS.find((option) => option.id === turnaroundId);
}

export function calculateQuote({
  wordCount,
  serviceId,
  turnaroundId,
}: {
  wordCount: number;
  serviceId: ManuscriptServiceId;
  turnaroundId: TurnaroundId;
}) {
  const service = getServiceById(serviceId);
  const turnaround = getTurnaroundById(turnaroundId);

  if (!service || !turnaround) {
    throw new Error("Invalid service or turnaround selection.");
  }

  const baseAmountUsd = wordCount * service.ratePerWord;
  const multipliedAmountUsd = baseAmountUsd * turnaround.multiplier;
  const minimumOrderValue = convertUsdAmount(MINIMUM_ORDER_VALUE, SITE_CURRENCY);
  const amount = Math.max(
    minimumOrderValue,
    roundCurrency(convertUsdAmount(multipliedAmountUsd, SITE_CURRENCY)),
  );

  return {
    amount,
    baseAmount: roundCurrency(convertUsdAmount(baseAmountUsd, SITE_CURRENCY)),
    service,
    turnaround,
    minimumApplied:
      amount === minimumOrderValue &&
      convertUsdAmount(multipliedAmountUsd, SITE_CURRENCY) < minimumOrderValue,
  };
}

export function formatCurrency(amount: number, currency = SITE_CURRENCY) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function countWordsFromText(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(" ").length;
}

function roundCurrency(amount: number) {
  return Math.round(amount * 100) / 100;
}

function convertUsdAmount(amount: number, currency: string) {
  switch (currency) {
    case "USD":
      return amount;
    case "NGN":
      return amount * USD_TO_NGN_RATE;
    default:
      return amount;
  }
}
