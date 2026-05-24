export const SITE_CURRENCY =
  process.env.NEXT_PUBLIC_SITE_CURRENCY?.toUpperCase() ?? "USD";
export const BASE_PRICING_CURRENCY = "USD";
export const USD_TO_NGN_RATE = Number(process.env.USD_TO_NGN_RATE ?? "1500");

export const MAX_MANUSCRIPT_SIZE_BYTES = 10 * 1024 * 1024;

export const SUPPORTED_MANUSCRIPT_EXTENSIONS = ["doc", "docx", "pdf", "txt", "rtf"] as const;

export const FORMATTING_OPTIONS = [
  { id: "none", label: "None / standard consistency" },
  { id: "apa", label: "APA (7th edition)" },
  { id: "mla", label: "MLA" },
  { id: "chicago", label: "Chicago Manual of Style" },
  { id: "harvard", label: "Harvard referencing" },
  { id: "oscola", label: "OSCOLA" },
  { id: "ieee", label: "IEEE" },
  { id: "vancouver", label: "Vancouver" },
  { id: "turabian", label: "Turabian" },
  { id: "journal-specific", label: "Journal-specific instructions" },
  { id: "custom", label: "Custom formatting" },
] as const;

export const LANGUAGE_STYLE_OPTIONS = [
  "No preference",
  "American English",
  "British English",
  "Canadian English",
  "Australian English",
  "Academic tone",
  "Business tone",
  "Clear and simple tone",
  "Journal-specific tone",
] as const;

export const TRANSCRIPTION_LANGUAGE_OPTIONS = [
  "English",
  "French",
  "Spanish",
  "Japanese",
  "Other",
] as const;

export const DOCUMENT_TYPE_OPTIONS = [
  "Academic Paper",
  "Thesis / Dissertation",
  "Journal Article",
  "Research Proposal",
  "Business Document",
  "CV / Résumé",
  "Book / Manuscript",
  "Report",
  "Personal Statement",
  "Statement of Purpose",
  "Grant Proposal",
  "Coursework / Essay",
  "Other",
] as const;

export const MANUSCRIPT_SERVICES = [
  {
    id: "proofreading",
    label: "Proofreading",
    description: "Grammar, punctuation, spelling, and consistency polishing.",
    ratePerWord: 0.03,
    turnaroundNote: "Best when the draft is already structurally sound.",
  },
  {
    id: "editing",
    label: "Editing",
    description: "Sentence-level clarity, tone, flow, and editorial corrections.",
    ratePerWord: 0.03,
    turnaroundNote: "Recommended for most academic and professional manuscripts.",
  },
  {
    id: "academic-editing",
    label: "Academic Editing",
    description: "Discipline-aware editing for scholarly papers, theses, and journals.",
    ratePerWord: 0.03,
    turnaroundNote: "Best for research, dissertations, and peer-review submissions.",
  },
  {
    id: "business-editing",
    label: "Business Editing",
    description: "Precise editing for reports, proposals, profiles, and executive documents.",
    ratePerWord: 0.03,
    turnaroundNote: "Ideal for professional and institutional documents.",
  },
  {
    id: "formatting",
    label: "Formatting",
    description: "Reference, style, layout, and journal guideline formatting.",
    ratePerWord: 0.04,
    turnaroundNote: "Choose a formatting style or provide custom requirements.",
  },
  {
    id: "translation",
    label: "Translation",
    description: "Careful language translation with editorial review.",
    ratePerWord: 0.055,
    turnaroundNote: "Timeline may vary based on language pair and document length.",
  },
  {
    id: "transcribing",
    label: "Transcribing",
    description: "Clear written transcripts from audio or dictated content.",
    ratePerWord: 0.025,
    turnaroundNote: "A team member may confirm audio quality before final pricing.",
  },
  {
    id: "writing-support",
    label: "Writing Support",
    description: "Structured writing guidance and editorial development support.",
    fixedAmount: 450,
    turnaroundNote: "Package-based support; final scope may be confirmed by email.",
  },
  {
    id: "cv-resume",
    label: "CV / Résumé",
    description: "Sharper professional profile, résumé, and CV editing.",
    fixedAmount: 120,
    turnaroundNote: "Package pricing for career documents.",
  },
  {
    id: "copywriting",
    label: "Copywriting",
    description: "Professional copy support for web, brand, and business materials.",
    fixedAmount: 350,
    turnaroundNote: "Package pricing; final scope may be confirmed after review.",
  },
] as const;

export const TURNAROUND_OPTIONS = [
  {
    id: "24h",
    label: "24 hours",
    days: "24 hours",
    multiplier: 1.85,
    maxWords: 5000,
    description: "Only available for concise documents under 5,000 words.",
  },
  {
    id: "48h",
    label: "48 hours",
    days: "48 hours",
    multiplier: 1.6,
    maxWords: 10000,
    description: "Fast editorial scheduling for smaller documents.",
  },
  {
    id: "3d",
    label: "3 days",
    days: "3 days",
    multiplier: 1.4,
    maxWords: 10000,
    description: "Expedited editing for shorter papers and urgent submissions.",
  },
  {
    id: "7d",
    label: "7 days",
    days: "7 days",
    multiplier: 1.25,
    maxWords: 30000,
    description: "A balanced rush option for medium-length manuscripts.",
  },
  {
    id: "14d",
    label: "14 days",
    days: "14 days",
    multiplier: 1.1,
    maxWords: 30000,
    description: "Recommended for substantial academic and business documents.",
  },
  {
    id: "28d",
    label: "28 days",
    days: "28 days",
    multiplier: 1,
    maxWords: 50000,
    description: "Best for full manuscripts and longer projects.",
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

  const baseAmountBeforeTurnaround =
    "fixedAmount" in service ? service.fixedAmount : wordCount * service.ratePerWord;
  const multipliedAmountUsd = baseAmountBeforeTurnaround * turnaround.multiplier;
  const amount = roundCurrency(
    convertUsdAmount(multipliedAmountUsd, SITE_CURRENCY),
  );

  return {
    amount,
    baseAmount: roundCurrency(convertUsdAmount(baseAmountBeforeTurnaround, SITE_CURRENCY)),
    service,
    turnaround,
    minimumApplied: false,
  };
}

export function calculateMultiServiceQuote({
  wordCount,
  serviceIds,
  turnaroundId,
}: {
  wordCount: number;
  serviceIds: ManuscriptServiceId[];
  turnaroundId: TurnaroundId;
}) {
  const selectedServiceIds = serviceIds.length > 0 ? serviceIds : ["editing" as ManuscriptServiceId];
  const quotes = selectedServiceIds.map((serviceId) =>
    calculateQuote({ wordCount, serviceId, turnaroundId }),
  );
  const amount = roundCurrency(quotes.reduce((total, quote) => total + quote.amount, 0));
  const baseAmount = roundCurrency(
    quotes.reduce((total, quote) => total + quote.baseAmount, 0),
  );

  return {
    amount,
    baseAmount,
    services: quotes.map((quote) => quote.service),
    turnaround: quotes[0]?.turnaround ?? getTurnaroundById(turnaroundId),
    minimumApplied: false,
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
