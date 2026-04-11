"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DOCUMENT_TYPE_OPTIONS,
  FORMATTING_OPTIONS,
  MANUSCRIPT_SERVICES,
  MAX_MANUSCRIPT_SIZE_BYTES,
  TURNAROUND_OPTIONS,
  calculateQuote,
  formatCurrency,
  formatFileSize,
} from "@/lib/submission-config";

const STEPS = [
  { id: 1, name: "Details" },
  { id: 2, name: "Upload" },
  { id: 3, name: "Pricing" },
  { id: 4, name: "Payment" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

interface ManuscriptAnalysis {
  submissionId: string;
  manuscript: {
    fileName: string;
    extension: string;
    sizeBytes: number;
    wordCount: number;
  };
  currency: string;
}

interface FormState {
  documentType: string;
  academicField: string;
  formattingStyle: (typeof FORMATTING_OPTIONS)[number]["id"];
  notes: string;
  serviceId: (typeof MANUSCRIPT_SERVICES)[number]["id"];
  turnaroundId: (typeof TURNAROUND_OPTIONS)[number]["id"];
  fullName: string;
  email: string;
  institution: string;
  country: string;
  agreedToTerms: boolean;
}

const INITIAL_FORM: FormState = {
  documentType: DOCUMENT_TYPE_OPTIONS[0],
  academicField: "",
  formattingStyle: "none",
  notes: "",
  serviceId: "copy-editing",
  turnaroundId: "standard",
  fullName: "",
  email: "",
  institution: "",
  country: "",
  agreedToTerms: false,
};

export function SubmitForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ManuscriptAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [surfaceError, setSurfaceError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [redirectingToPaystack, setRedirectingToPaystack] = useState(false);

  const quote = analysis
    ? calculateQuote({
        wordCount: analysis.manuscript.wordCount,
        serviceId: form.serviceId,
        turnaroundId: form.turnaroundId,
      })
    : null;

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      if (!previous[key]) {
        return previous;
      }

      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function handleFileSelection(file: File | null) {
    setSelectedFile(file);
    setAnalysis(null);
    setSurfaceError(null);
  }

  async function analyzeFile(file: File) {
    setAnalyzing(true);
    setSurfaceError(null);

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/manuscripts/analyze", {
        method: "POST",
        body,
      });

      const payload = (await response.json()) as
        | {
            submissionId: string;
            manuscript: ManuscriptAnalysis["manuscript"];
            currency: string;
          }
        | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload ? payload.error : "Unable to analyze manuscript.",
        );
      }

      setAnalysis(payload);
      setCurrentStep(3);
    } catch (error) {
      setSurfaceError(
        error instanceof Error
          ? error.message
          : "We could not analyze that file right now.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleNext() {
    setSurfaceError(null);

    if (currentStep === 1) {
      const errors = validateDetailsStep(form);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!selectedFile) {
        setSurfaceError("Please upload your manuscript before continuing.");
        return;
      }

      if (!analysis) {
        await analyzeFile(selectedFile);
        return;
      }

      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      const errors = validatePricingStep(form, analysis);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      setCurrentStep(4);
      return;
    }

    await handlePaymentStart();
  }

  async function handlePaymentStart() {
    const errors = validatePaymentStep(form, analysis);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!analysis) {
      setSurfaceError("Please upload and analyze your manuscript first.");
      return;
    }

    setRedirectingToPaystack(true);
    setSurfaceError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: analysis.submissionId,
          fullName: form.fullName,
          email: form.email,
          institution: form.institution,
          country: form.country,
          documentType: form.documentType,
          academicField: form.academicField,
          formattingStyle: form.formattingStyle,
          serviceId: form.serviceId,
          turnaroundId: form.turnaroundId,
          notes: form.notes,
        }),
      });

      const payload = (await response.json()) as
        | { authorizationUrl: string }
        | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload ? payload.error : "Unable to initialize payment.",
        );
      }

      window.location.assign(payload.authorizationUrl);
    } catch (error) {
      setSurfaceError(
        error instanceof Error
          ? error.message
          : "We could not initialize the payment. Please try again.",
      );
      setRedirectingToPaystack(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="overflow-hidden rounded-[28px] border-border/70 bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
        <div className="border-b border-border/70 bg-[linear-gradient(180deg,rgba(239,246,255,0.92),rgba(255,255,255,0.98))] px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure submission
                </span>
                <div>
                  <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-[2.35rem]">
                    Submit Manuscript
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    A clean four-step submission flow with automatic word-count
                    detection, transparent pricing, and secure Paystack checkout.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-white/85 px-4 py-3 text-sm text-muted-foreground shadow-sm">
                <div className="font-medium text-foreground">Typical completion time</div>
                <div className="mt-1 flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  2 to 3 minutes
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {STEPS.map((step) => {
                const active = step.id === currentStep;
                const completed = step.id < currentStep;

                return (
                  <div key={step.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all",
                          completed && "border-primary bg-primary text-white",
                          active &&
                            "border-primary bg-primary text-white shadow-[0_10px_24px_-12px_rgba(30,58,138,0.55)]",
                          !active &&
                            !completed &&
                            "border-border bg-white text-muted-foreground",
                        )}
                      >
                        {completed ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Step {step.id}
                        </p>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            active || completed ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {step.name}
                        </p>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          completed || active ? "bg-primary" : "bg-transparent",
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <CardContent className="px-0">
          {surfaceError ? (
            <div className="mx-6 mt-6 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-4 text-sm text-destructive sm:mx-8">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{surfaceError}</p>
            </div>
          ) : null}

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
                className="space-y-8"
              >
                {currentStep === 1 ? (
                  <div className="space-y-8">
                    <SectionIntro
                      title="Tell us about the manuscript"
                      description="We use this information to route your manuscript to the right editor and pricing lane."
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FieldGroup
                        label="Document type"
                        error={fieldErrors.documentType}
                      >
                        <select
                          value={form.documentType}
                          onChange={(event) =>
                            updateForm("documentType", event.target.value)
                          }
                          className={selectClasses(fieldErrors.documentType)}
                        >
                          {DOCUMENT_TYPE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </FieldGroup>

                      <FieldGroup
                        label="Formatting style"
                        error={fieldErrors.formattingStyle}
                      >
                        <select
                          value={form.formattingStyle}
                          onChange={(event) =>
                            updateForm(
                              "formattingStyle",
                              event.target.value as FormState["formattingStyle"],
                            )
                          }
                          className={selectClasses(fieldErrors.formattingStyle)}
                        >
                          {FORMATTING_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FieldGroup>
                    </div>

                    <FieldGroup
                      label="Academic field or discipline"
                      hint="Use the closest field so we can route the manuscript appropriately."
                      error={fieldErrors.academicField}
                    >
                      <Input
                        value={form.academicField}
                        onChange={(event) =>
                          updateForm("academicField", event.target.value)
                        }
                        placeholder="Clinical medicine, law, economics, theology, engineering..."
                        className={inputClasses(fieldErrors.academicField)}
                      />
                    </FieldGroup>

                    <FieldGroup
                      label="Editor notes"
                      hint="Optional. Include journal instructions, deadline context, or editorial concerns."
                    >
                      <textarea
                        value={form.notes}
                        onChange={(event) => updateForm("notes", event.target.value)}
                        rows={5}
                        className={textareaClasses()}
                        placeholder="Add any context that will help the editor handle your manuscript well."
                      />
                    </FieldGroup>
                  </div>
                ) : null}

                {currentStep === 2 ? (
                  <div className="space-y-8">
                    <SectionIntro
                      title="Upload your manuscript"
                      description="For dependable automated word counts, upload a DOCX or TXT file. Legacy DOC files should be resaved as DOCX first."
                    />

                    <div
                      className={cn(
                        "rounded-[28px] border border-dashed px-6 py-10 text-center transition-colors sm:px-10",
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-border bg-secondary/40",
                      )}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(event) => {
                        event.preventDefault();
                        setDragActive(false);
                        handleFileSelection(event.dataTransfer.files[0] ?? null);
                      }}
                    >
                      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
                        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-sm">
                          <UploadCloud className="h-9 w-9 text-primary" />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold tracking-tight text-foreground">
                            Drag and drop your file here
                          </h3>
                          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                            Or browse manually from your device. Files remain private and are only used for your submission.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <Button
                            type="button"
                            size="lg"
                            onClick={() => fileInputRef.current?.click()}
                            className="min-w-[11rem]"
                          >
                            Choose file
                          </Button>
                          <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            DOCX or TXT only
                          </span>
                          <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Max {formatFileSize(MAX_MANUSCRIPT_SIZE_BYTES)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".docx,.txt"
                      className="hidden"
                      onChange={(event) =>
                        handleFileSelection(event.target.files?.[0] ?? null)
                      }
                    />

                    {selectedFile ? (
                      <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold text-foreground">
                              {selectedFile.name}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {formatFileSize(selectedFile.size)} • ready for word-count analysis
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {analysis ? (
                              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                analyzed
                              </span>
                            ) : null}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label="Remove selected file"
                              onClick={() => {
                                handleFileSelection(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {currentStep === 3 ? (
                  <div className="space-y-8">
                    <SectionIntro
                      title="Choose the service and turnaround"
                      description="The quote below is calculated directly from the detected manuscript word count."
                    />

                    {analysis ? (
                      <div className="rounded-[24px] border border-primary/10 bg-primary/[0.03] p-5 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Detected manuscript size
                            </p>
                            <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground">
                              {analysis.manuscript.wordCount.toLocaleString()} words
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {analysis.manuscript.fileName} • {formatFileSize(analysis.manuscript.sizeBytes)}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-sm">
                            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              Estimated total
                            </div>
                            <div className="mt-1 text-2xl font-semibold text-foreground">
                              {quote ? formatCurrency(quote.amount, analysis.currency) : "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Editorial service
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Select the level of intervention that matches the manuscript condition.
                          </p>
                        </div>
                        {fieldErrors.serviceId ? (
                          <p className="text-sm text-destructive">{fieldErrors.serviceId}</p>
                        ) : null}
                      </div>

                      <div className="grid gap-4 lg:grid-cols-3">
                        {MANUSCRIPT_SERVICES.map((service) => {
                          const selected = form.serviceId === service.id;

                          return (
                            <button
                              type="button"
                              key={service.id}
                              onClick={() => updateForm("serviceId", service.id)}
                              className={cn(
                                "rounded-[24px] border px-5 py-5 text-left transition-all",
                                selected
                                  ? "border-primary bg-primary text-white shadow-[0_18px_45px_-30px_rgba(30,58,138,0.65)]"
                                  : "border-border bg-white hover:border-primary/30 hover:bg-secondary/50",
                              )}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <span className="font-semibold">{service.label}</span>
                                {selected ? <CheckCircle2 className="h-4 w-4" /> : null}
                              </div>
                              <p
                                className={cn(
                                  "mt-3 text-sm leading-6",
                                  selected ? "text-white/80" : "text-muted-foreground",
                                )}
                              >
                                {service.description}
                              </p>
                              <div
                                className={cn(
                                  "mt-5 text-sm font-medium",
                                  selected ? "text-white" : "text-foreground",
                                )}
                              >
                                {formatCurrency(service.ratePerWord, analysis?.currency)} per word
                              </div>
                              <p
                                className={cn(
                                  "mt-2 text-xs leading-5",
                                  selected ? "text-white/75" : "text-muted-foreground",
                                )}
                              >
                                {service.turnaroundNote}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Turnaround speed
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Faster turnaround reserves earlier editorial capacity.
                          </p>
                        </div>
                        {fieldErrors.turnaroundId ? (
                          <p className="text-sm text-destructive">{fieldErrors.turnaroundId}</p>
                        ) : null}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {TURNAROUND_OPTIONS.map((option) => {
                          const selected = form.turnaroundId === option.id;

                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => updateForm("turnaroundId", option.id)}
                              className={cn(
                                "rounded-[24px] border px-5 py-5 text-left transition-all",
                                selected
                                  ? "border-primary bg-primary/7 shadow-[0_16px_40px_-34px_rgba(30,58,138,0.7)]"
                                  : "border-border bg-white hover:border-primary/20",
                              )}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <span className="font-semibold text-foreground">
                                  {option.label}
                                </span>
                                {selected ? (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                ) : null}
                              </div>
                              <div className="mt-2 text-sm font-medium text-primary">
                                {option.days}
                              </div>
                              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {option.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}

                {currentStep === 4 ? (
                  <div className="space-y-8">
                    <SectionIntro
                      title="Confirm your contact details"
                      description="After payment, you will receive both a submission confirmation and a payment receipt by email."
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FieldGroup label="Full name" error={fieldErrors.fullName}>
                        <Input
                          value={form.fullName}
                          onChange={(event) => updateForm("fullName", event.target.value)}
                          placeholder="Dr. Jane Smith"
                          className={inputClasses(fieldErrors.fullName)}
                        />
                      </FieldGroup>

                      <FieldGroup label="Email address" error={fieldErrors.email}>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(event) => updateForm("email", event.target.value)}
                          placeholder="jane.smith@university.edu"
                          className={inputClasses(fieldErrors.email)}
                        />
                      </FieldGroup>

                      <FieldGroup label="Institution or organization">
                        <Input
                          value={form.institution}
                          onChange={(event) =>
                            updateForm("institution", event.target.value)
                          }
                          placeholder="Optional"
                          className={inputClasses()}
                        />
                      </FieldGroup>

                      <FieldGroup label="Country">
                        <Input
                          value={form.country}
                          onChange={(event) => updateForm("country", event.target.value)}
                          placeholder="Optional"
                          className={inputClasses()}
                        />
                      </FieldGroup>
                    </div>

                    <div className="rounded-[24px] border border-border/70 bg-secondary/45 p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-foreground">
                            What happens next
                          </h3>
                          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                            <li>Payment is processed securely through Paystack.</li>
                            <li>Your confirmation and payment emails are sent through Resend.</li>
                            <li>The editor receives the manuscript and submission metadata immediately after payment is confirmed.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white px-4 py-4 text-sm leading-6 text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={form.agreedToTerms}
                        onChange={(event) =>
                          updateForm("agreedToTerms", event.target.checked)
                        }
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span>
                        I confirm that the uploaded manuscript is mine to submit and I understand that work begins after successful payment.
                        {fieldErrors.agreedToTerms ? (
                          <span className="mt-2 block text-destructive">
                            {fieldErrors.agreedToTerms}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>

        <div className="flex flex-col gap-3 border-t border-border/70 bg-slate-50/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={currentStep === 1 || redirectingToPaystack}
            onClick={() => setCurrentStep((step) => Math.max(1, step - 1) as StepId)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              {currentStep < 4
                ? "Your quote remains tied to the detected manuscript word count."
                : "You will be redirected to Paystack to complete payment securely."}
            </p>
            <Button
              type="button"
              size="lg"
              disabled={analyzing || redirectingToPaystack}
              onClick={handleNext}
            >
              {analyzing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Analyzing manuscript
                </>
              ) : redirectingToPaystack ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Redirecting to Paystack
                </>
              ) : currentStep === 4 ? (
                <>
                  Continue to payment
                  <ArrowUpRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="rounded-[28px] border-border/70 bg-white shadow-[0_28px_80px_-56px_rgba(15,23,42,0.45)]">
          <CardContent className="space-y-6 px-5 py-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Submission summary
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Your current quote
              </h2>
            </div>

            <SummaryRow
              label="Word count"
              value={
                analysis
                  ? `${analysis.manuscript.wordCount.toLocaleString()} words`
                  : "Awaiting upload"
              }
            />
            <SummaryRow
              label="Service"
              value={labelForService(form.serviceId)}
            />
            <SummaryRow
              label="Turnaround"
              value={labelForTurnaround(form.turnaroundId)}
            />
            <SummaryRow
              label="Estimated total"
              value={
                quote && analysis
                  ? formatCurrency(quote.amount, analysis.currency)
                  : "Upload to calculate"
              }
              emphasized
            />
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 bg-slate-950 text-white shadow-[0_28px_80px_-54px_rgba(15,23,42,0.65)]">
          <CardContent className="space-y-4 px-5 py-6">
            <h2 className="font-serif text-2xl font-semibold">Built for trust</h2>
            <ul className="space-y-3 text-sm leading-6 text-white/72">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                Automatic server-side word count detection before pricing.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                Secure Paystack checkout with verification and webhook support.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                Customer and editor notifications sent automatically after payment.
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function SectionIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

function FieldGroup({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {error ? <span className="text-xs text-destructive">{error}</span> : null}
      </div>
      {children}
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border/60 pb-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right text-sm font-medium text-foreground",
          emphasized && "text-lg font-semibold",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function validateDetailsStep(form: FormState) {
  const errors: Record<string, string> = {};

  if (!form.documentType) {
    errors.documentType = "Required";
  }

  if (!form.academicField.trim()) {
    errors.academicField = "Required";
  }

  if (!form.formattingStyle) {
    errors.formattingStyle = "Required";
  }

  return errors;
}

function validatePricingStep(form: FormState, analysis: ManuscriptAnalysis | null) {
  const errors: Record<string, string> = {};

  if (!analysis) {
    errors.analysis = "Please upload and analyze the manuscript first.";
  }

  if (!form.serviceId) {
    errors.serviceId = "Required";
  }

  if (!form.turnaroundId) {
    errors.turnaroundId = "Required";
  }

  return errors;
}

function validatePaymentStep(form: FormState, analysis: ManuscriptAnalysis | null) {
  const errors = validatePricingStep(form, analysis);

  if (!form.fullName.trim()) {
    errors.fullName = "Required";
  }

  if (!form.email.trim()) {
    errors.email = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email";
  }

  if (!form.agreedToTerms) {
    errors.agreedToTerms = "Please confirm before continuing.";
  }

  return errors;
}

function inputClasses(error?: string) {
  return cn(
    "h-12 rounded-2xl border-border/80 bg-white px-4 shadow-none",
    error && "border-destructive focus-visible:ring-destructive/20",
  );
}

function selectClasses(error?: string) {
  return cn(
    "flex h-12 w-full rounded-2xl border border-border/80 bg-white px-4 text-sm text-foreground shadow-none outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20",
    error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
  );
}

function textareaClasses() {
  return "min-h-32 w-full rounded-[22px] border border-border/80 bg-white px-4 py-3 text-sm text-foreground shadow-none outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20";
}

function labelForService(serviceId: FormState["serviceId"]) {
  return (
    MANUSCRIPT_SERVICES.find((service) => service.id === serviceId)?.label ??
    "Not selected"
  );
}

function labelForTurnaround(turnaroundId: FormState["turnaroundId"]) {
  const option = TURNAROUND_OPTIONS.find(
    (turnaroundOption) => turnaroundOption.id === turnaroundId,
  );

  if (!option) {
    return "Not selected";
  }

  return `${option.label} (${option.days})`;
}
