"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FileEdit,
  Microscope,
  ShieldCheck,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EDITOR_FIELDS } from "@/lib/editor-fields";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const STANDARDS = [
  {
    icon: Microscope,
    title: "Discipline-aware review",
    description:
      "Editors are expected to understand the conventions and language expectations of the manuscript's field.",
  },
  {
    icon: FileEdit,
    title: "Author voice preserved",
    description:
      "Edits are made to strengthen readability and precision without flattening the author's meaning or tone.",
  },
  {
    icon: ShieldCheck,
    title: "Two-editor quality control",
    description:
      "Primary editorial review is reinforced by a second quality-focused pass for consistency and accuracy.",
  },
];

const PROCESS = [
  "Manuscripts are reviewed for subject fit before assignment.",
  "Editors are selected for strong academic or technical writing backgrounds.",
  "Tracked changes are maintained for transparency and author control.",
  "Quality review is part of the process, not an optional extra.",
];

export default function EditorsPage() {
  return (
    <>
      <Navbar />

      <main className="relative flex-1 overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.10),_transparent_60%)]" />

        <section className="pb-18">
          <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl space-y-6"
            >
              <motion.div variants={fadeUpVariant} className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Editors page
                </span>
                <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.45rem] lg:leading-[1.08]">
                  Meet the standards behind our editing.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  PEEKBOOKS works with seasoned academic and professional editors selected for subject familiarity, editorial judgement, and a process built around transparency.
                </p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/submit">Submit Manuscript</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUpVariant}
                className="grid gap-4 rounded-[28px] border border-border/70 bg-white p-5 shadow-[0_30px_80px_-58px_rgba(15,23,42,0.45)] sm:grid-cols-3"
              >
                {[
                  { value: `${EDITOR_FIELDS.length}+`, label: "discipline lanes" },
                  { value: "2-stage", label: "quality review" },
                  { value: "Tracked", label: "change visibility" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="font-serif text-2xl font-semibold text-foreground">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="rounded-[30px] border border-border/70 bg-white p-3 shadow-[0_34px_90px_-55px_rgba(15,23,42,0.48)]"
            >
              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src="/editor-2.png"
                  alt="Professional editorial review"
                  width={920}
                  height={1060}
                  className="h-[430px] w-full object-cover sm:h-[520px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/62 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="max-w-sm rounded-[22px] border border-white/14 bg-black/35 p-5 text-white backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                      Editorial handling
                    </p>
                    <p className="mt-2 text-base leading-7 text-white/90">
                      A serious editorial service needs stronger matching, cleaner judgement, and more disciplined review than a generic language pass.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        <section className="pb-18">
          <Container className="space-y-10">
            <SectionHeader
              eyebrow="Quality standards"
              title="Editors are selected against a clear quality bar."
              description="The page now explains the standards more clearly and with more structure, instead of reading like a simple checklist."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {STANDARDS.map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[28px] border-border/70 bg-white py-0 shadow-[0_24px_70px_-58px_rgba(15,23,42,0.45)]"
                >
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/80 py-18">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Selection approach"
                title="How editorial assignment is treated."
                description="This gives the editors page more substance and trust than a generic standards list."
                align="left"
              />
              <div className="rounded-[26px] border border-border/70 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                    <UserRoundSearch className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Editorial assignment is framed around fit, not just availability. That means closer attention to subject area, manuscript type, and the level of editorial intervention required.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-border/70 bg-white p-7 shadow-[0_28px_80px_-60px_rgba(15,23,42,0.45)]">
              <div className="space-y-4">
                {PROCESS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 border-b border-border/70 pb-4 last:border-b-0 last:pb-0"
                  >
                    <CheckCircle2 className="mt-1 h-4.5 w-4.5 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-foreground/85">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-18 pt-18">
          <Container className="space-y-10">
            <SectionHeader
              eyebrow="Field coverage"
              title="Examples of the disciplines and editorial lanes we support."
              description="This section now feels more structured and product-grade instead of looking like a plain icon wall."
            />

            <div className="rounded-[30px] border border-slate-900/85 bg-slate-950 p-6 text-white shadow-[0_36px_90px_-60px_rgba(15,23,42,0.82)] sm:p-8">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {EDITOR_FIELDS.map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.025, duration: 0.35, ease: "easeOut" }}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-5 text-center transition-all duration-250 hover:border-white/22 hover:bg-white/[0.08] hover:-translate-y-0.5"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/6 text-white/86 transition-colors duration-250 group-hover:bg-white/10 group-hover:text-white">
                      <field.icon size={22} strokeWidth={1.6} />
                    </div>
                    <div className="mt-4 text-sm font-semibold leading-5 text-white/92">
                      {field.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-14">
          <Container>
            <div className="overflow-hidden rounded-[34px] border border-primary/10 bg-primary px-6 py-12 text-white shadow-[0_34px_90px_-60px_rgba(30,58,138,0.82)] sm:px-10 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Clear and professional flow
                  </span>
                  <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                    Ready to submit your manuscript for expert review?
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-white/78">
                    Move from editor standards to the actual submission flow without friction. The goal is confidence, not clutter.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/92">
                    <Link href="/submit">Submit Manuscript</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/22 bg-transparent text-white hover:bg-white/10"
                  >
                    <Link href="/pricing">
                      View Pricing
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={
        align === "left"
          ? "max-w-2xl space-y-4 text-left"
          : "mx-auto max-w-3xl space-y-4 text-center"
      }
    >
      <motion.p
        variants={fadeUpVariant}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUpVariant}
        className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUpVariant} className="text-base leading-7 text-muted-foreground">
        {description}
      </motion.p>
    </motion.div>
  );
}
