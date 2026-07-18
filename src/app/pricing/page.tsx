"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Languages,
  Mic2,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MANUSCRIPT_SERVICES,
  TURNAROUND_OPTIONS,
  calculateQuote,
  formatCurrency,
  type ManuscriptServiceId,
  type TurnaroundId,
} from "@/lib/submission-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PRESET_WORDS = [1000, 2500, 5000, 10000, 25000];

const SERVICE_ICONS: Record<ManuscriptServiceId, typeof FileText> = {
  proofreading: FileText,
  editing: PenLine,
  "academic-editing": GraduationCap,
  "business-editing": BriefcaseBusiness,
  formatting: BookOpen,
  translation: Languages,
  transcribing: Mic2,
  "writing-support": Sparkles,
  "cv-resume": FileText,
  copywriting: PenLine,
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function PricingPage() {
  const [words, setWords] = useState<number>(5000);
  const [serviceId, setServiceId] = useState<ManuscriptServiceId>("editing");
  const [turnaroundId, setTurnaroundId] = useState<TurnaroundId>("28d");

  const selectedService = MANUSCRIPT_SERVICES.find(
    (service) => service.id === serviceId,
  ) ?? MANUSCRIPT_SERVICES[1];

  const selectedTurnaroundOption = TURNAROUND_OPTIONS.find(
    (turnaround) => turnaround.id === turnaroundId,
  ) ?? TURNAROUND_OPTIONS[TURNAROUND_OPTIONS.length - 1];

  const availableTurnarounds = useMemo(
    () =>
      TURNAROUND_OPTIONS.map((turnaround) => ({
        ...turnaround,
        unavailable:
          !!turnaround.maxWords &&
          words > turnaround.maxWords &&
          words <= 50000,
      })),
    [words],
  );

  const selectedTurnaroundUnavailable =
    !!selectedTurnaroundOption.maxWords &&
    words > selectedTurnaroundOption.maxWords &&
    words <= 50000;

  const selectedTurnaround = selectedTurnaroundUnavailable
    ? TURNAROUND_OPTIONS.find(
        (turnaround) => !turnaround.maxWords || words <= turnaround.maxWords,
      ) ?? selectedTurnaroundOption
    : selectedTurnaroundOption;

  const effectiveTurnaroundId = selectedTurnaround.id;

  const quote =
    words > 0 && words <= 50000
      ? calculateQuote({ wordCount: words, serviceId, turnaroundId: effectiveTurnaroundId })
      : null;

  const largeDocument = words > 50000;
  const SelectedIcon = SERVICE_ICONS[selectedService.id] ?? FileText;

  function updateTurnaround(nextTurnaroundId: TurnaroundId) {
    const nextTurnaround = TURNAROUND_OPTIONS.find(
      (turnaround) => turnaround.id === nextTurnaroundId,
    );

    if (
      nextTurnaround?.maxWords &&
      words > nextTurnaround.maxWords &&
      words <= 50000
    ) {
      return;
    }

    setTurnaroundId(nextTurnaroundId);
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full flex flex-col pt-32 pb-24 overflow-hidden">
        <section className="relative px-6 lg:px-8 mb-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.10),_transparent_60%)] pointer-events-none -z-10" />
          <Container className="max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Clear project estimate
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-foreground text-balance leading-tight">
                Pricing that follows the service you choose.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
                Select your service, word count, and turnaround to see a clean estimate before submitting your manuscript.
              </p>
            </motion.div>
          </Container>
        </section>

        <section id="calculator" className="relative z-10 mb-20">
          <Container className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <Card className="overflow-hidden rounded-[30px] border-border/50 bg-white shadow-[0_30px_90px_-60px_rgba(15,23,42,0.55)]">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="space-y-8 p-6 sm:p-10">
                    <div className="space-y-4">
                      <StepLabel number="1" label="Choose a service" />
                      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                        <div className="space-y-2">
                          <select
                            value={serviceId}
                            onChange={(event) =>
                              setServiceId(event.target.value as ManuscriptServiceId)
                            }
                            className="h-14 w-full rounded-2xl border border-border/80 bg-white px-4 text-base font-semibold text-foreground outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20"
                          >
                            {MANUSCRIPT_SERVICES.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.label}
                              </option>
                            ))}
                          </select>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {selectedService.description}
                          </p>
                        </div>
                        <div className="flex min-w-36 items-center gap-3 rounded-2xl border border-primary/10 bg-primary/[0.04] px-4 py-3 text-primary">
                          <SelectedIcon className="h-5 w-5" />
                          <span className="text-sm font-semibold">
                            {selectedService.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <StepLabel number="2" label="Enter word count" />
                        <div className="flex flex-wrap gap-2">
                          {PRESET_WORDS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setWords(preset)}
                              className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                            >
                              {preset.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <Input
                          type="number"
                          min={0}
                          step={100}
                          value={words || ""}
                          onChange={(event) =>
                            setWords(Math.max(0, Number(event.target.value) || 0))
                          }
                          className="h-16 rounded-2xl border-border/70 bg-secondary/35 pr-20 text-2xl font-bold focus-visible:ring-primary/25"
                          placeholder="5000"
                        />
                        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                          words
                        </span>
                      </div>

                      {largeDocument ? (
                        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                          Large documents above 50,000 words require a custom review. Submit your details and the team will confirm the best timeline and pricing.
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      <StepLabel number="3" label="Select turnaround" />
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {availableTurnarounds.map((turnaround) => {
                          const isActive = effectiveTurnaroundId === turnaround.id;

                          return (
                            <button
                              key={turnaround.id}
                              type="button"
                              disabled={turnaround.unavailable}
                              onClick={() => updateTurnaround(turnaround.id)}
                              className={cn(
                                "rounded-2xl border px-4 py-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                isActive
                                  ? "border-primary bg-primary text-white shadow-[0_18px_42px_-30px_rgba(30,58,138,0.72)]"
                                  : "border-border bg-white hover:border-primary/25 hover:bg-secondary/35",
                                turnaround.unavailable &&
                                  "cursor-not-allowed opacity-45 hover:border-border hover:bg-white",
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold">{turnaround.label}</span>
                                {isActive ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <Clock className="h-4 w-4 text-primary/70" />
                                )}
                              </div>
                              <p
                                className={cn(
                                  "mt-2 text-sm leading-5",
                                  isActive ? "text-white/78" : "text-muted-foreground",
                                )}
                              >
                                {turnaround.unavailable
                                  ? "Choose a longer timeline for this word count."
                                  : turnaround.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-between border-t border-border/50 bg-slate-50/80 p-6 sm:p-10 lg:border-l lg:border-t-0">
                    <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
                    <div className="relative z-10 space-y-8">
                      <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                          Estimated total
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${quote?.amount ?? "review"}-${serviceId}-${effectiveTurnaroundId}-${words}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="font-serif text-5xl font-semibold tracking-tight text-foreground"
                          >
                            {quote ? formatCurrency(quote.amount) : "Custom"}
                          </motion.div>
                        </AnimatePresence>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {quote
                            ? "Final pricing is confirmed during manuscript submission after word-count review."
                            : "Submit your manuscript for a tailored review and confirmed quote."}
                        </p>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-border/70 bg-white p-4">
                        <SummaryItem label="Service" value={selectedService.label} />
                        <SummaryItem
                          label="Word count"
                          value={words > 0 ? `${words.toLocaleString()} words` : "Enter word count"}
                        />
                        <SummaryItem
                          label="Turnaround"
                          value={`${selectedTurnaround.label} (${selectedTurnaround.days})`}
                        />
                      </div>

                      <ul className="space-y-3 text-sm leading-6 text-foreground/80">
                        {[
                          "Human editor review",
                          "Secure manuscript handling",
                          "Tracked changes where applicable",
                          "Service scope confirmed before work begins",
                        ].map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 mt-8 space-y-3">
                      <Button size="lg" className="h-14 w-full text-base font-bold" asChild>
                        <Link href="/submit">Submit Manuscript</Link>
                      </Button>
                      <p className="text-center text-xs leading-5 text-muted-foreground">
                        Payment is completed securely after submission.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>

        <section className="bg-slate-50 py-20 mb-20 border-y border-border/40">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center space-y-4 mb-12"
            >
              <motion.h2 variants={fadeUpVariant} className="text-3xl sm:text-4xl font-bold font-serif">
                Services available for quoting
              </motion.h2>
              <motion.p variants={fadeUpVariant} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every service in the submit flow is represented here, with clean descriptions and no public rate formulas.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {MANUSCRIPT_SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.id] ?? FileText;

                return (
                  <motion.div key={service.id} variants={fadeUpVariant}>
                    <Card className="h-full rounded-2xl border-border/70 bg-white p-5 transition-shadow hover:shadow-[0_20px_55px_-42px_rgba(15,23,42,0.5)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {service.label}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section className="mb-12">
          <Container className="max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about estimates and billing.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-bold text-lg">
                    How is the estimate calculated?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                    The estimate uses your selected service, confirmed word count, and turnaround window. The final quote is confirmed during submission after the manuscript details are reviewed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-bold text-lg">
                    Why do large documents require custom review?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                    Documents above 50,000 words can vary widely in scope, structure, and timeline. PeekBooks Editors reviews those projects manually so the quote and schedule are realistic. For a thesis that needs more than a final proofread, compare <Link href="/thesis-editing" className="font-semibold text-primary hover:underline">thesis editing</Link> before selecting a service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-bold text-lg">
                    When and how do I pay?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                    Payment is completed after you submit your manuscript and confirm your quote. Work begins after payment is confirmed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-bold text-lg">
                    Can I choose more than one service?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                    Yes. The submit manuscript flow allows combined services such as editing with formatting or translation with proofreading.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StepLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {number}
      </div>
      <h2 className="text-base font-bold tracking-wide text-foreground">{label}</h2>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}
