"use client";

import { motion, Variants, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2, ShieldCheck, Clock, Award, UploadCloud, FileEdit,
  Microscope, Globe2, BookOpen, Quote, Fingerprint, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EDITOR_FIELDS } from "@/lib/editor-fields";
import { generateFAQSchema, generateOrganizationSchema, generateProfessionalServiceSchema, generateWebsiteSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const foldRevealVariants: Variants = {
  hidden: { opacity: 0, rotateY: 90, x: -50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100, damping: 20 }
  })
};

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=82"
];

const SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85";

const SUPPORTING_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

const EXPERT_SECTION_IMAGE =
  "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=82";

const HERO_SERVICE_WORDS = [
  "Proofreading",
  "Editing",
  "Academic editing",
  "Non-academic editing",
  "Scientific editing",
  "Business editing",
  "Formatting",
  "Translation",
  "Transcribing",
  "Writing support",
];

const EXPERT_FIELD_LABELS = [
  "Astrophysics",
  "APA Reference Check",
  "Biology",
  "Chemistry",
  "Computing",
  "CV & Resume",
  "Economics",
  "Electrical Engineering",
  "Law",
  "Life Science",
  "Engineering",
  "Medicine",
  "Nursing",
  "Psychology",
  "Education",
  "Business",
  "Marketing",
  "Theology",
  "Philosophy",
  "Political Science",
];

const VISIBLE_EXPERT_CARDS = 10;

const HOME_FAQS = [
  {
    question: "How exactly is the word count calculated?",
    answer: "Your word count is based on the full visible content of your document as shown in your word processor. Tables, headings, footnotes, and references may be included when they require editorial review.",
  },
  {
    question: "Are there any minimum fees?",
    answer: "No minimum fee is shown in the pricing calculator. Final pricing depends on your chosen service, word count, turnaround, and any custom scope confirmed during submission.",
  },
  {
    question: "When and how do I pay?",
    answer: "After you submit your manuscript and confirm the quote, payment is completed through the secure payment flow. Editing begins after payment and project scope are confirmed.",
  },
  {
    question: "Does the price include reference formatting?",
    answer: "Standard editing can include light reference consistency checks. Extensive citation correction, bibliography restructuring, or journal-specific formatting may be quoted as an additional formatting service.",
  },
  {
    question: "Will an editor change my meaning or argument?",
    answer: "No. Editors improve the language, flow, and presentation of your document while protecting your intended meaning. If a sentence is unclear, the editor may leave a comment rather than guess what you meant.",
  },
  {
    question: "Can I request British or American English?",
    answer: "Yes. Tell us whether you prefer British English, American English, or a specific journal or university style. The editor will check spelling, punctuation, terminology, and formatting for that preference.",
  },
  {
    question: "What file types can I submit?",
    answer: "The submission flow is designed for editable documents such as DOCX and TXT. If you have a PDF, scanned file, or unusual format, contact support first so we can confirm the best workflow.",
  },
  {
    question: "Do you use AI instead of human editors?",
    answer: "No. PeekBooks Editors is built around human editorial review. Software may support basic checks, but judgment about clarity, tone, academic integrity, and author meaning stays with a human editor.",
  },
  {
    question: "Can you help if my deadline is close?",
    answer: "Often, yes. Choose the fastest available turnaround in the pricing or submission flow. Very large or complex documents may still need a custom review so the promised deadline remains realistic.",
  },
  {
    question: "What happens after I receive the edited file?",
    answer: "Review the tracked changes and editor comments carefully, accept the revisions you agree with, and ask support if a delivered edit within the agreed scope needs clarification.",
  },
];

export default function Home() {
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateProfessionalServiceSchema(),
    generateFAQSchema(HOME_FAQS),
  ];
  const whyRef = useRef(null);
  const isWhyInView = useInView(whyRef, { once: true, margin: "-100px" });

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentServiceWord, setCurrentServiceWord] = useState(0);
  const [expertFieldIndexes, setExpertFieldIndexes] = useState(
    Array.from({ length: VISIBLE_EXPERT_CARDS }, (_, index) => index),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceWord((prev) => (prev + 1) % HERO_SERVICE_WORDS.length);
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timers = Array.from({ length: VISIBLE_EXPERT_CARDS }, (_, slot) => {
      let interval: ReturnType<typeof setInterval> | null = null;
      const timeout = setTimeout(() => {
        interval = setInterval(() => {
          setExpertFieldIndexes((previous) => {
            const next = [...previous];
            next[slot] = (next[slot] + 7 + slot) % EXPERT_FIELD_LABELS.length;
            return next;
          });
        }, 2100 + slot * 90);
      }, slot * 180);

      return () => {
        clearTimeout(timeout);
        if (interval) {
          clearInterval(interval);
        }
      };
    });

    return () => timers.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full flex flex-col pt-32 pb-0 gap-24 sm:gap-32 relative">
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Global Royal Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-[120vh] -z-10 bg-primary/5">
          <Image
            src="/bg-royal.png"
            alt="Royal Abstract Background"
            fill
            className="object-cover opacity-[0.15] mix-blend-multiply pointer-events-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
        </div>

        {/* 1. Hero Section */}
        <section className="relative overflow-visible">
          <Container className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <motion.div
              initial={false}
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary font-serif leading-[1.15]">
                Professional proofreading, editing, and formatting for serious writing.
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                PeekBooks Editors helps researchers, authors, and professionals refine documents with human editorial care, clean formatting, and a private submission workflow.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="text-base h-14 px-8 shadow-lg hover:shadow-xl transition-all shadow-primary/20">
                  <Link href="/submit">Submit Manuscript</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 border-primary/20 hover:bg-primary/5">
                  <Link href="/pricing" className="text-primary">View Pricing</Link>
                </Button>
              </motion.div>
              <motion.div
                variants={fadeUpVariant}
                className="mt-1 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/10 bg-white/78 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Experts on
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={HERO_SERVICE_WORDS[currentServiceWord]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="font-serif text-xl font-semibold text-primary"
                  >
                    {HERO_SERVICE_WORDS[currentServiceWord]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Hero Images Slideshow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.2 }}
              className="w-full relative lg:ml-auto h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(30,58,138,0.25)] border border-white/20"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-[3rem] -z-10 transform -rotate-3" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <Image
                    src={HERO_IMAGES[currentHeroImage]}
                    alt="Professional editor reviewing manuscript"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div className="text-white">
                  <p className="font-bold text-lg mb-1 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> Human editorial review</p>
                  <p className="text-sm text-white/80">Proofreading, editing, and formatting handled with care.</p>
                </div>
                <div className="flex gap-2">
                  {HERO_IMAGES.map((_, i) => (
                    <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", currentHeroImage === i ? "w-6 bg-white" : "w-1.5 bg-white/40")} />
                  ))}
                </div>
              </div>
            </motion.div>

          </Container>
        </section>

        {/* 2. Trust Strip */}
        <section className="border-y border-border/60 bg-white/50 backdrop-blur-md py-6 shadow-xs relative z-10">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-90 mix-blend-luminosity">
              {[
                { icon: ShieldCheck, text: "Ethical boundaries" },
                { icon: CheckCircle2, text: "Private submission workflow" },
                { icon: Award, text: "Tracked changes" },
                { icon: Clock, text: "Scope-based delivery dates" },
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  key={item.text}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-5 w-5 text-primary opacity-80" />
                  <span className="text-sm font-semibold text-foreground/80 tracking-wide uppercase">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. Services at a Glance (Refined side-by-side layout) */}
        <section className="bg-background relative">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-[40vw] h-full bg-linear-to-bl from-primary/5 to-transparent -z-10 mix-blend-multiply" />

          <Container className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-primary">Our services at a glance</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Focused editorial services for authors who need clarity, polish, and professional presentation.</p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-6">

              {/* Massive Main Feature: Editing & Proofreading */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }}
                className="lg:col-span-8 flex flex-col h-full"
              >
                <Card className="flex flex-col lg:flex-row h-full overflow-hidden border-border/60 bg-white shadow-[0_24px_70px_-48px_rgba(15,23,42,0.45)] hover:shadow-[0_28px_80px_-45px_rgba(30,58,138,0.24)] transition-all duration-300">
                  {/* Left side: Content */}
                  <div className="p-8 sm:p-12 lg:w-[55%] flex flex-col justify-center bg-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <FileEdit size={32} className="text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold text-foreground font-serif leading-tight">Proofreading, editing, and formatting</h3>
                    </div>
                    
                    <p className="text-foreground/80 leading-relaxed mb-6 text-base">
                      Our core service blends careful proofreading, sentence-level editing, and clean formatting support so your document reads clearly and looks professionally prepared without losing your voice.
                    </p>

                    <div className="mb-8">
                      <h4 className="font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Includes:</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {["Grammar and punctuation", "Clarity and flow", "Document formatting", "Journal and style checks"].map(item => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-fit shadow-md">
                      <Link href="/submit">Start Editing Process</Link>
                    </Button>
                  </div>
                  
                  {/* Right side: Image */}
                  <div className="lg:w-[45%] relative min-h-[360px] lg:min-h-full">
                    <Image 
                      src={SERVICE_IMAGE}
                      alt="Editor marking up a manuscript at a desk"
                      fill 
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/18 bg-white/14 p-4 text-white backdrop-blur-md">
                      <p className="text-sm font-semibold">Detailed document review</p>
                      <p className="mt-1 text-xs leading-5 text-white/78">Tracked changes, formatting checks, and final polish.</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Stacked Side Cards */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="flex-1">
                  <Card className="h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all border-border/60 bg-white">
                    <div className="relative mb-5 h-32 overflow-hidden rounded-2xl">
                      <Image
                        src={SUPPORTING_SERVICE_IMAGE}
                        alt="Professional desk with laptop and editorial notes"
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <Globe2 size={30} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Translation</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed max-w-sm mb-4">
                      Executed by native linguists aware of academic conventions, preserving your exact meaning and transferring it fluently into English.
                    </p>
                    <Link href="/services" className="mt-auto text-primary font-bold text-sm hover:underline">Learn more &rarr;</Link>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1 }} className="flex-1">
                  <Card className="h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all border-border/60 bg-white">
                    <BookOpen size={30} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Formatting</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed max-w-sm mb-4">
                      Manual formatting checks for APA, MLA, Chicago, Harvard, OSCOLA, IEEE, journal-specific, and custom document requirements.
                    </p>
                    <Link href="/services" className="mt-auto text-primary font-bold text-sm hover:underline">Learn more &rarr;</Link>
                  </Card>
                </motion.div>
              </div>

            </div>
          </Container>
        </section>

        {/* 4. Our Editing Process */}
        <section className="bg-secondary/30 relative py-16 mt-8">
          <Container className="flex flex-col gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="space-y-4 max-w-3xl text-center"
            >
              <motion.h2 variants={fadeUpVariant} className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-primary">
                Our Editing Process
              </motion.h2>
            </motion.div>

            <div className="w-full max-w-5xl pt-4 pb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between relative gap-8 sm:gap-0">

                {/* Connecting Line (Desktop) */}
                <div className="hidden sm:block absolute top-[40px] left-[10%] right-[10%] h-[2px] border-b-2 border-dashed border-primary/30 -z-10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className="h-full bg-primary"
                  />
                </div>

                {[
                  { step: "01", icon: UploadCloud, title: "Upload document", desc: "Share securely." },
                  { step: "02", icon: FileEdit, title: "Editing and proofreading", desc: "Expert assessment." },
                  { step: "03", icon: ShieldCheck, title: "Quality check", desc: "Review against the agreed scope." },
                  { step: "04", icon: CheckCircle2, title: "Document delivered", desc: "Ready for author review." }
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.3 + 0.2, type: "spring" }}
                    className="flex flex-col items-center text-center gap-4 relative px-2 z-10 w-full sm:w-1/4"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="h-20 w-20 rounded-full bg-background border border-primary/20 shadow-xl flex items-center justify-center text-primary relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                        <item.icon size={32} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground mb-1 leading-tight">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Framework / Why Authors Choose Us (Folding Cards) */}
        <section className="relative mx-4 sm:mx-8 bg-background pb-12 pt-8 overflow-hidden" ref={whyRef}>
          <div className="absolute top-0 right-0 w-[50vw] h-full bg-linear-to-bl from-primary/5 to-transparent -z-10 rounded-3xl mix-blend-multiply" />
          <Container className="flex flex-col lg:flex-row items-center gap-16 relative z-10 py-12">

            <div className="flex-1 space-y-6 text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isWhyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-primary leading-tight"
              >
                Why authors choose <br /><span className="text-primary-hover">PeekBooks Editors</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isWhyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                The document type, requested service, language preference, submission requirements, and available delivery window are reviewed before the project scope is confirmed.
              </motion.p>
            </div>

            <div className="flex-1 w-full grid sm:grid-cols-2 gap-6 relative sm:pl-10">
              {[
                { icon: Fingerprint, title: "Human editorial judgment", desc: "Language decisions are reviewed in the context of the whole document." },
                { icon: Globe2, title: "British or American English", desc: "Authors can request a language variety or provide institution and journal instructions." },
                { icon: Microscope, title: "Defined editorial scope", desc: "The service level and document requirements are confirmed before editing begins." },
                { icon: Clock, title: "Realistic scheduling", desc: "Available delivery windows depend on word count, service level, and document condition." },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  custom={i}
                  variants={foldRevealVariants}
                  initial="hidden"
                  animate={isWhyInView ? "visible" : "hidden"}
                  style={{ transformOrigin: "left center" }}
                  className={cn(
                    "relative z-10",
                    i % 2 !== 0 ? "sm:mt-12" : ""
                  )}
                >
                  <Card className="bg-white/90 backdrop-blur-md border border-border shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(30,58,138,0.2)] transition-all duration-500 group h-full">
                    <CardHeader className="p-6">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                        <pillar.icon size={26} />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground leading-tight mb-2">
                        {pillar.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-foreground/80">
                        {pillar.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

          </Container>
        </section>

        {/* 6. Editorial support by document field */}
        <section className="relative overflow-hidden bg-[#f5f7fb] py-8 sm:py-10 lg:py-12">
          <div className="absolute inset-x-0 top-0 h-28 bg-[#17347f]" />
          <Container className="relative z-10 max-w-[1500px]">
            <div className="overflow-hidden rounded-[32px] border border-border/70 bg-white shadow-[0_34px_100px_-62px_rgba(15,23,42,0.55)]">
              <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(470px,0.92fr)]">
                <div className="relative min-h-[380px] overflow-hidden bg-primary sm:min-h-[470px] lg:min-h-[520px] xl:min-h-[540px]">
                  <Image
                    src={EXPERT_SECTION_IMAGE}
                    alt="Professional editor reviewing business documents"
                    fill
                    sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/78 via-primary/18 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/18 bg-white/14 p-5 text-white backdrop-blur-md">
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "Document", label: "Led scope" },
                        { value: "Human", label: "Review" },
                        { value: "Author", label: "Final control" },
                      ].map((item) => (
                        <div key={item.label} className="min-w-28">
                          <div className="font-serif text-2xl font-semibold">{item.value}</div>
                          <div className="text-[11px] uppercase tracking-[0.16em] text-white/68">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8 lg:p-9 xl:p-10">
                  <div className="max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Discipline-based matching
                    </div>
                    <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-[2.25rem] xl:text-[2.45rem]">
                      Editorial support matched to the work in front of it.
                    </h2>
                    <p className="text-sm leading-6 text-muted-foreground xl:text-base xl:leading-7">
                      PeekBooks Editors groups document fields by the type of editorial judgement the work may need: academic precision, professional clarity, terminology consistency, and formatting discipline. The team confirms whether the requested scope can be supported before work begins.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {EDITOR_FIELDS.slice(0, VISIBLE_EXPERT_CARDS).map((field, slot) => (
                      <div
                        key={field.name}
                        className="flex min-h-12 items-center gap-3 rounded-2xl border border-border/70 bg-secondary/35 px-3.5 py-2"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                          <field.icon size={17} strokeWidth={1.7} />
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${slot}-${EXPERT_FIELD_LABELS[expertFieldIndexes[slot]]}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="text-sm font-semibold text-foreground"
                          >
                            {EXPERT_FIELD_LABELS[expertFieldIndexes[slot]]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-4 rounded-[22px] border border-primary/10 bg-primary/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xl text-sm leading-5 text-muted-foreground">
                      If your field is not listed, submit your document anyway. The editorial team will review the scope and confirm the best match.
                    </p>
                    <Button asChild>
                      <Link href="/editors">
                        Meet Our Editors
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 7. Testimonials */}
        <section className="bg-background pt-16 relative overflow-visible">
          <div className="absolute top-0 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

          <Container className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-primary">See what our clients are saying</h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { text: "I am very pleased providing my thesis to PeekBooks Editors. They fixed all the awkward phrasing and made my research shine.", name: "Mary Jane", title: "Author" },
                { text: "The language review made our submission clearer and easier to follow. The editor’s comments were specific, practical, and respectful of the research.", name: "Prof. Patel", title: "Research author" },
                { text: "The team at PeekBooks Editors is exceptional. Their two-editor quality check discovered nuances I missed in my own data.", name: "Dr. L. Smith", title: "Researcher" },
              ].map((quote, i) => (
                <motion.div variants={fadeUpVariant} key={i}>
                  <Card className="h-full flex flex-col bg-white border-border hover:shadow-[0_20px_50px_-15px_rgba(30,58,138,0.15)] transition-all relative overflow-hidden rounded-2xl group cursor-default">
                    <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors transform group-hover:scale-110">
                      <Quote size={56} fill="currentColor" strokeWidth={0} />
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col justify-between relative z-10 pt-10">
                      <p className="text-foreground/80 leading-relaxed text-lg mb-8">&quot;{quote.text}&quot;</p>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg font-serif">
                          {quote.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground text-lg">{quote.name}</span>
                          <span className="text-sm text-primary font-medium tracking-wide uppercase">{quote.title}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* 8. FAQ Preview */}
        <section className="bg-background max-w-3xl mx-auto w-full px-4 sm:px-6 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-primary">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
            <Accordion type="single" collapsible className="w-full">
              {HOME_FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index + 1}`}
                  className="bg-white px-6 mb-4 rounded-xl border border-border shadow-xs hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* 8. Quality support section */}
        <section className="bg-background pb-12 pt-16 mt-8">
          <Container className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative rounded-3xl overflow-hidden bg-slate-50 border border-border shadow-xl p-8 sm:p-14 flex flex-col md:flex-row items-center gap-12"
            >
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110" />
                <div className="bg-linear-to-br from-primary to-blue-900 p-1.5 rounded-full shadow-2xl relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white border-4 border-white border-dashed p-8 rounded-full flex flex-col items-center justify-center h-48 w-48 shadow-inner">
                    <ShieldCheck size={56} className="text-primary mb-2 stroke-[1.5]" />
                    <span className="font-bold text-3xl font-serif text-primary text-center leading-none">Scope<br /><span className="text-sm uppercase tracking-widest font-sans opacity-80 mt-1 block">Support</span></span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-foreground/80 leading-relaxed text-lg relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-primary font-serif mb-6 leading-tight">Questions and corrections after delivery</h3>
                <p className="border-l-4 border-primary/30 pl-6 italic">
                  Review the tracked changes and editor comments before accepting revisions. Author decisions remain with you, especially where wording, evidence, or discipline-specific meaning needs confirmation.
                </p>
                <p className="pl-6">
                  If you have questions about delivered edits, contact us with
                  the file and specific issue. We will review concerns that fall
                  within the agreed service scope and explain or correct the
                  editorial work where appropriate.
                </p>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* 9. Art Integration & Final CTA */}
        <section className="relative mt-12 mx-4 sm:mx-8 mb-12 rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(30,58,138,0.5)] bg-primary">
          <Image
            src="/luxury-art.png"
            alt="Luxury Editorial Abstract"
            fill
            className="object-cover opacity-30 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-primary via-primary/90 to-blue-900/80 -z-0" />

          <Container className="relative z-10 flex flex-col items-center gap-10 py-32 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}
              className="space-y-6 flex flex-col items-center"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif max-w-3xl leading-tight">
                Prepare your document with PeekBooks Editors.
              </h2>
              <div className="flex items-center gap-2 text-primary-light/90 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-md">
                <ShieldCheck size={18} />
                <span className="text-sm uppercase tracking-widest font-bold">Private submission and clear editorial boundaries</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-6"
            >
              <Button size="lg" className="h-16 px-10 text-lg bg-white text-primary hover:bg-white/90 hover:scale-[1.02] transition-all shadow-2xl font-bold" asChild>
                <Link href="/submit">Submit Your Manuscript</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg bg-black/20 border-white/30 backdrop-blur-xs hover:bg-white/10 text-white transition-colors" asChild>
                <Link href="/pricing">Pricing Calculator</Link>
              </Button>
            </motion.div>
          </Container>
        </section>

      </main>

      <Footer />
    </>
  );
}
