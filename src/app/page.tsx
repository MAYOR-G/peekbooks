"use client";

import { motion, Variants, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2, ShieldCheck, Clock, Award, UploadCloud, FileEdit,
  Microscope, Globe2, BookOpen, Quote, Fingerprint, Activity,
  Mountain, Cpu, Lightbulb, Hexagon, Compass, ArrowUpRight
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

const LOGOS = [
  { name: "Nature", icon: Mountain },
  { name: "The Lancet", icon: Activity },
  { name: "IEEE", icon: Cpu },
  { name: "Elsevier", icon: Hexagon },
  { name: "Oxford Press", icon: BookOpen },
  { name: "Stanford Med", icon: Compass },
  { name: "Science", icon: Lightbulb },
];

const HERO_IMAGES = [
  "/editor-1.png",
  "/editor-2.png",
  "/editor-3.png"
];

export default function Home() {
  const whyRef = useRef(null);
  const isWhyInView = useInView(whyRef, { once: true, margin: "-100px" });

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full flex flex-col pt-32 pb-0 gap-24 sm:gap-32 relative">

        {/* Global Royal Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-[120vh] -z-10 bg-primary/5">
          <Image
            src="/bg-royal.png"
            alt="Royal Abstract Background"
            fill
            className="object-cover opacity-[0.15] mix-blend-multiply pointer-events-none"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
        </div>

        {/* 1. Hero Section */}
        <section className="relative overflow-visible">
          <Container className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary font-serif leading-[1.15]">
                Professional proofreading & editing by award-winning experts.
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                Need proofreading, editing, or translation? Join thousands of researchers who trust PEEKBOOKS. Our team of experts is available 24/7.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="text-base h-14 px-8 shadow-lg hover:shadow-xl transition-all shadow-primary/20">
                  <Link href="/submit">Submit Manuscript</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 border-primary/20 hover:bg-primary/5">
                  <Link href="/pricing" className="text-primary">View Pricing</Link>
                </Button>
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
                    alt="Expert Editor at Work"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div className="text-white">
                  <p className="font-bold text-lg mb-1 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> Human Editors</p>
                  <p className="text-sm text-white/80">Every document is personally reviewed by experts.</p>
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
                { icon: CheckCircle2, text: "100% Confidential" },
                { icon: Award, text: "Tracked changes" },
                { icon: Clock, text: "On-time delivery guaranteed" },
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
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Providing a tailored experience with specialized disciplines to ensure your academic work shines.</p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-6">

              {/* Massive Main Feature: Editing & Proofreading */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }}
                className="lg:col-span-8 flex flex-col h-full"
              >
                <Card className="flex flex-col lg:flex-row h-full overflow-hidden border-border/60 hover:shadow-[0_20px_40px_-15px_rgba(30,58,138,0.15)] transition-all duration-300">
                  {/* Left big color block */}
                  <div className="bg-primary/5 p-8 sm:p-12 lg:w-1/2 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <FileEdit size={48} className="text-primary mb-6 drop-shadow-sm" />
                    <h3 className="text-3xl font-bold text-primary mb-4 font-serif leading-tight">Editing and Proofreading</h3>
                    <p className="text-foreground/80 leading-relaxed mb-8 text-base">
                      Our flagship service. Our comprehensive English editing ensures your text will satisfy the strict standards of peer review. We handle surface-level polish and deeper structural adjustments while preserving your authorship.
                    </p>
                    <Button className="w-fit">Start Edition Process</Button>
                  </div>
                  {/* Additional info side */}
                  <div className="p-8 sm:p-12 lg:w-1/2 bg-white flex flex-col justify-center">
                    <h4 className="font-bold text-lg mb-4 text-foreground">Includes:</h4>
                    <ul className="space-y-4">
                      {["Punctuation, grammar, vocabulary", "Clarity and flow adjustments", "Consistency check (British vs American)", "Adherence to journal guidelines"].map(item => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Stacked Side Cards */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="flex-1">
                  <Card className="h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all border-border/60 bg-white">
                    <Globe2 size={32} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Translation</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed max-w-sm mb-4">
                      Executed by native linguists aware of academic conventions, preserving your exact meaning and transferring it fluently into English.
                    </p>
                    <Link href="/services" className="mt-auto text-primary font-bold text-sm hover:underline">Learn more &rarr;</Link>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1 }} className="flex-1">
                  <Card className="h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all border-border/60 bg-white">
                    <BookOpen size={32} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3 font-serif">Formatting Check</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed max-w-sm mb-4">
                      Automated and manual formatting checks to ensure compliance with specific journal requirements or specific university guidelines.
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
                  { step: "03", icon: ShieldCheck, title: "Quality check", desc: "Two-editor review." },
                  { step: "04", icon: CheckCircle2, title: "Document delivered", desc: "Ready to publish." }
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
                Why Authors choose <br /><span className="text-primary-hover">PEEKBOOKS</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isWhyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                We do not compromise on quality. Our platform is distinguished by an elite roster of editors, an unyielding two-tier quality check, and guaranteed deadlines.
              </motion.p>
            </div>

            <div className="flex-1 w-full grid sm:grid-cols-2 gap-6 relative sm:pl-10">
              {[
                { icon: Fingerprint, title: "First-class English experts", desc: "Editors selected via rigorous testing." },
                { icon: Globe2, title: "Native English editors", desc: "Fluent editors from the US, UK, Canada, & Australia." },
                { icon: Microscope, title: "Two-editor QA system", desc: "Every document undergoes duplicate senior review." },
                { icon: Clock, title: "Guaranteed on-time", desc: "We strictly adhere to deadlines, on-time, every time." },
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

        {/* 6. Expert editors from your field */}
        <section className="relative overflow-hidden bg-[#163278] py-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="absolute inset-y-0 right-0 w-[38%] bg-linear-to-l from-white/8 to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-3xl space-y-5"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Discipline-based matching
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-white leading-[1.08]">
                  Expert editors from your field
                </h2>
                <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/78">
                  Our experts are matched strictly to their academic disciplines. Your text will be edited by a published expert who speaks your discipline&apos;s language.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {[
                  { value: `${EDITOR_FIELDS.length}+`, label: "specialisms covered" },
                  { value: "2-stage", label: "quality review" },
                  { value: "Human", label: "editor assignment" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/12 bg-white/7 px-5 py-5 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-semibold font-serif text-white">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/65">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 sm:p-7 backdrop-blur-sm shadow-[0_30px_90px_-55px_rgba(0,0,0,0.55)]">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {EDITOR_FIELDS.map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.03, duration: 0.35, ease: "easeOut" }}
                    className="group rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-5 text-center transition-all duration-250 hover:border-white/22 hover:bg-white/[0.09] hover:-translate-y-0.5"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/6 text-white/88 transition-colors duration-250 group-hover:bg-white/10 group-hover:text-white">
                      <field.icon size={22} strokeWidth={1.6} />
                    </div>
                    <div className="mt-4 text-sm font-semibold leading-5 text-white/92">
                      {field.name}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-white/68">
                  Matching is handled with subject sensitivity so technical meaning, tone, and context are preserved more accurately across different manuscript types.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/18 bg-white/8 text-white hover:bg-white/14 hover:border-white/24"
                >
                  <Link href="/editors">
                    Meet Our Editors
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
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
                { text: "I am very pleased providing my thesis to PEEKBOOKS. They fixed all the awkward phrasing and made my research shine.", name: "Mary Jane", title: "Author" },
                { text: "This service really helped me to be successfully published in top international tier-1 journals. Outstanding work.", name: "Prof. Patel", title: "Cambridge" },
                { text: "The team at PEEKBOOKS is exceptional. Their two-editor quality check discovered nuances I missed in my own data.", name: "Dr. L. Smith", title: "Researcher" }
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

        {/* 8. Trusted by Marquee (Moving Logos - FIXED FOR PROPER CSS LOOPING) */}
        <section className="py-16 bg-slate-50 border-y border-border/50 overflow-hidden relative shadow-inner mt-12">
          <Container className="mb-10">
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/80">We Are Trusted By Top Journals & Institutions</h2>
          </Container>

          <div className="flex w-full overflow-hidden relative group">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex shrink-0 min-w-full items-center justify-around gap-24 px-12 pause-on-hover animate-[marquee_35s_linear_infinite]">
              {LOGOS.map((logo, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/40 hover:text-primary transition-all duration-300 hover:scale-105 cursor-pointer select-none filter grayscale hover:grayscale-0">
                  <logo.icon size={40} strokeWidth={1.5} />
                  <span className="font-serif font-bold text-3xl whitespace-nowrap tracking-tight">{logo.name}</span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 min-w-full items-center justify-around gap-24 px-12 pause-on-hover animate-[marquee_35s_linear_infinite]" aria-hidden="true">
              {LOGOS.map((logo, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/40 hover:text-primary transition-all duration-300 hover:scale-105 cursor-pointer select-none filter grayscale hover:grayscale-0">
                  <logo.icon size={40} strokeWidth={1.5} />
                  <span className="font-serif font-bold text-3xl whitespace-nowrap tracking-tight">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ Preview */}
        <section className="bg-background max-w-3xl mx-auto w-full px-4 sm:px-6 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-primary">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="bg-white px-6 mb-4 rounded-xl border border-border shadow-xs hover:border-primary/30 transition-colors">
                <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-primary transition-colors py-6">Do you write or ghostwrite content?</AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6">
                  No. PEEKBOOKS does not write, ghostwrite, or generate content; it refines language and preserves authorship. We uphold strict editorial ethics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white px-6 mb-4 rounded-xl border border-border shadow-xs hover:border-primary/30 transition-colors">
                <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-primary transition-colors py-6">Will I see the changes you made?</AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6">
                  Yes. Every completed job is returned with a &quot;Tracked Changes&quot; document so you have complete transparency over exactly what modifications were suggested.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white px-6 mb-4 rounded-xl border border-border shadow-xs hover:border-primary/30 transition-colors">
                <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:text-primary transition-colors py-6">Is my document kept confidential?</AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6">
                  Absolutely. We handle all manuscripts under strict confidentiality and ethical editing boundaries.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </section>

        {/* 10. Guarantee Section */}
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
                    <span className="font-bold text-3xl font-serif text-primary text-center leading-none">100%<br /><span className="text-sm uppercase tracking-widest font-sans opacity-80 mt-1 block">Guarantee</span></span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-foreground/80 leading-relaxed text-lg relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-primary font-serif mb-6 leading-tight">The PEEKBOOKS <br />100% Satisfaction Guarantee</h3>
                <p className="border-l-4 border-primary/30 pl-6 italic">
                  The edited manuscript you receive goes through a rigorous quality control check by our senior editors. If you are unsatisfied with the quality of the edit, we will revise your manuscript for free.
                </p>
                <p className="pl-6">
                  Furthermore, if your document is ever rejected by a journal specifically because of English language errors after we have edited it (without further alterations from your side), we will take full responsibility and re-edit it to perfection without additional charges.
                </p>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* 11. Art Integration & Final CTA */}
        <section className="relative mt-12 mx-4 sm:mx-8 mb-12 rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(30,58,138,0.5)] bg-primary">
          <Image
            src="/luxury-art.png"
            alt="Luxury Editorial Abstract"
            fill
            className="object-cover opacity-30 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-tr from-primary via-primary/90 to-blue-900/80 -z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay z-0"></div>

          <Container className="relative z-10 flex flex-col items-center gap-10 py-32 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}
              className="space-y-6 flex flex-col items-center"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif max-w-3xl leading-tight">
                Join the thousands of highly cited researchers using PEEKBOOKS.
              </h2>
              <div className="flex items-center gap-2 text-primary-light/90 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-md">
                <ShieldCheck size={18} />
                <span className="text-sm uppercase tracking-widest font-bold">100% Confidential & Ethical</span>
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
