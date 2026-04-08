"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    CheckCircle2,
    FileText,
    GraduationCap,
    Languages,
    ShieldCheck,
    Clock,
    Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const SERVICES = [
    { id: "proofreading", label: "Proofreading", basePrice: 0.02, icon: FileText, desc: "Grammar, spelling & typos." },
    { id: "editing", label: "Editing", basePrice: 0.035, icon: GraduationCap, desc: "Structure, flow & clarity." },
    { id: "translation", label: "Translation", basePrice: 0.05, icon: Languages, desc: "Academic localization." },
];

const TURNAROUNDS = [
    { id: "standard", label: "Standard", multiplier: 1, days: "5-7 days", icon: Clock },
    { id: "priority", label: "Priority", multiplier: 1.5, days: "2-3 days", icon: Zap },
    { id: "express", label: "Express", multiplier: 2, days: "24 hours", icon: Zap },
];

const PRESET_WORDS = [500, 2000, 5000, 10000];

// Animation variants
const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PricingPage() {
    const [words, setWords] = useState<number>(2000);
    const [service, setService] = useState(SERVICES[1]); // Default to Editing
    const [turnaround, setTurnaround] = useState(TURNAROUNDS[0]);

    const estimatedPrice = words * service.basePrice * turnaround.multiplier;

    return (
        <>
            <Navbar />

            <main className="flex-1 w-full flex flex-col pt-32 pb-24 overflow-hidden">

                {/* 1. Premium Hero Section */}
                <section className="relative px-6 lg:px-8 mb-16">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none -z-10" />
                    <Container className="max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <span className="inline-block py-1.5 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                Clear & Predictable
                            </span>
                            <h1 className="text-5xl sm:text-6xl font-extrabold font-serif tracking-tight text-foreground text-balance leading-tight">
                                Premium Editing. <br className="hidden sm:block" /> Totally Transparent Pricing.
                            </h1>
                            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light text-balance">
                                No hidden fees, no required subscriptions. Pay exactly for what your manuscript needs, when you need it.
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* 2. Enhanced Interactive Calculator */}
                <section id="calculator" className="relative z-10 mb-24">
                    <Container className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        >
                            <Card className="border-border/40 shadow-2xl shadow-primary/5 overflow-hidden bg-background/60 backdrop-blur-xl">
                                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border/30">

                                    {/* Left Column: Inputs */}
                                    <div className="lg:col-span-3 p-8 sm:p-10 space-y-10">

                                        {/* Step 1: Service */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</div>
                                                <h2 className="text-base font-bold tracking-wide text-foreground">Select Service</h2>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {SERVICES.map((s) => {
                                                    const Icon = s.icon;
                                                    const isActive = service.id === s.id;
                                                    return (
                                                        <button
                                                            key={s.id}
                                                            onClick={() => setService(s)}
                                                            className={cn(
                                                                "relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                                                isActive
                                                                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                                                                    : "bg-background/50 hover:bg-muted border-border hover:border-border/80"
                                                            )}
                                                        >
                                                            <Icon size={20} className={cn("mb-2", isActive ? "text-primary-foreground" : "text-primary/70")} />
                                                            <span className="font-bold text-sm tracking-tight">{s.label}</span>
                                                            <span className={cn("text-xs mt-1", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>{s.desc}</span>
                                                            {isActive && (
                                                                <motion.div layoutId="service-active" className="absolute inset-0 border-2 border-primary rounded-xl" transition={{ type: "spring", stiffness: 300, damping: 20 }} />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Step 2: Word Count */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</div>
                                                    <h2 className="text-base font-bold tracking-wide text-foreground">Word Count</h2>
                                                </div>
                                                {/* Preset buttons */}
                                                <div className="hidden sm:flex items-center gap-2">
                                                    {PRESET_WORDS.map((w) => (
                                                        <button
                                                            key={w}
                                                            onClick={() => setWords(w)}
                                                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors outline-hidden focus-visible:ring-2"
                                                        >
                                                            {w >= 1000 ? `${w / 1000}k` : w}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    step={100}
                                                    value={words || ''}
                                                    onChange={(e) => setWords(Number(e.target.value) || 0)}
                                                    className="text-xl sm:text-2xl font-bold py-7 pl-4 pr-16 border-border/60 bg-background/50 focus-visible:ring-primary/30"
                                                    placeholder="e.g. 2000"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
                                                    Words
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3: Turnaround */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</div>
                                                <h2 className="text-base font-bold tracking-wide text-foreground">Turnaround Time</h2>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {TURNAROUNDS.map((t) => {
                                                    const Icon = t.icon;
                                                    const isActive = turnaround.id === t.id;
                                                    return (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => setTurnaround(t)}
                                                            className={cn(
                                                                "relative flex items-center justify-between sm:justify-start sm:flex-col sm:items-start p-3 sm:p-4 rounded-xl border text-left transition-all duration-300 outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                                                isActive
                                                                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                                                                    : "bg-background/50 hover:bg-muted border-border hover:border-border/80"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-2 sm:mb-2">
                                                                <Icon size={16} className={cn(isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                                                                <span className="font-bold text-sm tracking-tight">{t.label}</span>
                                                            </div>
                                                            <span className={cn("text-xs font-medium", isActive ? "text-primary-foreground/90" : "text-muted-foreground")}>{t.days}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Right Column: Estimate Output */}
                                    <div className="lg:col-span-2 p-8 sm:p-10 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col justify-between border-l border-border/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />

                                        <div className="space-y-8 z-10">
                                            <div>
                                                <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-2">
                                                    Estimated Total
                                                </h3>
                                                <div className="flex flex-col">
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={estimatedPrice}
                                                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 1.05, y: 5 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-5xl sm:text-6xl font-extrabold font-serif text-foreground tracking-tight"
                                                        >
                                                            ${typeof estimatedPrice === 'number' && !isNaN(estimatedPrice) ? estimatedPrice.toFixed(2) : '0.00'}
                                                        </motion.div>
                                                    </AnimatePresence>

                                                    <span className="text-xs text-muted-foreground font-medium mt-2">
                                                        Based on ${service.basePrice.toFixed(3)}/word {turnaround.multiplier > 1 ? `x ${turnaround.multiplier} speed` : ''}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-3 pb-3 border-b border-border/50">
                                                    What&apos;s Included
                                                </h3>
                                                <ul className="space-y-3">
                                                    {[
                                                        "Subject-matter expert matched",
                                                        "Tracked changes & clean copy",
                                                        "Formatting standard checks",
                                                        "Strict confidentiality (NDA)",
                                                    ].map((feature) => (
                                                        <li key={feature} className="flex items-start gap-3">
                                                            <div className="mt-0.5 min-h-5 min-w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                                                            </div>
                                                            <span className="text-sm text-foreground/80 leading-tight">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="pt-10 z-10 w-full space-y-4 mt-auto">
                                            <Button size="lg" className="w-full h-14 text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
                                                <Link href="/submit">Start Your Order</Link>
                                            </Button>
                                            <p className="text-xs text-center text-muted-foreground leading-relaxed flex items-center justify-center gap-1.5">
                                                <ShieldCheck size={14} className="text-success" /> Secure payment required before work begins.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        </motion.div>
                    </Container>
                </section>

                {/* 3. Detailed Service Tiers */}
                <section className="bg-slate-50 dark:bg-slate-900/20 py-24 mb-24 border-y border-border/40">
                    <Container className="max-w-6xl">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                            className="text-center space-y-4 mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Understand the Value</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Compare our completely transparent base rates and find exactly the level of intervention your document requires.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Proofreading", price: "$0.020", unit: "/ word", icon: FileText,
                                    for: "Final drafts needing a polish.",
                                    features: ["Spelling and typo correction", "Grammar and syntax fixes", "Punctuation corrections", "Basic formatting consistency"]
                                },
                                {
                                    title: "Academic Editing", price: "$0.035", unit: "/ word", icon: GraduationCap, popular: true,
                                    for: "Documents needing structural & language improvement.",
                                    features: ["Everything in Proofreading", "Sentence structure optimization", "Academic tone adjustment", "Vocabulary enhancement", "Logical flow improvement"]
                                },
                                {
                                    title: "Translation", price: "$0.050", unit: "/ word", icon: Languages,
                                    for: "Non-native manuscripts needing expert translation.",
                                    features: ["Native-speaker translation", "Discipline-specific terminology", "Included full proofreading pass", "Formatting preservation"]
                                }
                            ].map((tier, i) => (
                                <motion.div key={i} variants={fadeUpVariant} className="flex">
                                    <Card className={cn("relative flex flex-col p-8 w-full transition-shadow duration-300 hover:shadow-xl", tier.popular ? "border-primary shadow-lg shadow-primary/5" : "")}>
                                        {tier.popular && (
                                            <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="mb-6 flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold">{tier.title}</h3>
                                                <p className="text-sm text-muted-foreground">{tier.for}</p>
                                            </div>
                                            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <tier.icon size={20} />
                                            </div>
                                        </div>
                                        <div className="mb-8 pb-8 border-b border-border/50">
                                            <span className="text-4xl font-extrabold">{tier.price}</span>
                                            <span className="text-muted-foreground text-sm ml-1 font-medium">{tier.unit}</span>
                                        </div>
                                        <ul className="space-y-4 flex-1 mb-8">
                                            {tier.features.map((f, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                                    <span className="text-sm text-foreground/80">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* 4. Pricing FAQ */}
                <section className="mb-12">
                    <Container className="max-w-3xl">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground">Everything you need to know about billing and pricing.</p>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-left font-bold text-lg">How exactly is the word count calculated?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                                        Your word count is based on the full content of your manuscript as shown in your document editor (e.g., Microsoft Word). Unless otherwise specified, all visible text is included to ensure accurate pricing.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-left font-bold text-lg">Are there any minimum fees?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                                        No, we do not charge any minimum fees. You only pay for the exact word count of your document, ensuring fair and transparent pricing regardless of length.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-left font-bold text-lg">When and how do I pay?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                                        Once you submit your manuscript, you&apos;ll receive a quote and payment instructions. Editing begins after payment is confirmed, ensuring timely delivery of your work.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-left font-bold text-lg">Does the price include Reference Formatting?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                                        Our standard pricing covers light reference formatting. If your document requires extensive citation corrections or formatting in a specific style (APA, MLA, Chicago, etc.), this may be offered as an add-on service.
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
