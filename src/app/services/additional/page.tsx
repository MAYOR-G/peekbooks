"use client";

import { motion, Variants } from "framer-motion";
import { Zap, LayoutTemplate, Languages, Check, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function AdditionalServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <section className="bg-primary pt-20 pb-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                    <Container className="relative z-10 text-center max-w-4xl mx-auto px-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.h1
                                variants={fadeUpVariant}
                                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
                            >
                                Specialized Finishing Services
                            </motion.h1>
                            <motion.p
                                variants={fadeUpVariant}
                                className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                            >
                                From rapid editing turnarounds to rigorous journal formatting and expert translation—get your manuscript ready for the world.
                            </motion.p>
                            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 min-w-[200px]" asChild>
                                    <Link href="/submit">Submit Document</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white min-w-[200px]" asChild>
                                    <Link href="/pricing">View Pricing</Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Container>
                </section>

                {/* Navigation Pills (Sticky for easy jumping) */}
                <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-xs hidden md:block">
                    <Container>
                        <div className="flex justify-center gap-8 py-4">
                            <a href="#express" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors hover:underline underline-offset-4">Express Services</a>
                            <a href="#formatting" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors hover:underline underline-offset-4">Manuscript Formatting</a>
                            <a href="#translation" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors hover:underline underline-offset-4">Academic Translation</a>
                        </div>
                    </Container>
                </div>

                {/* 1. Express Services */}
                <section id="express" className="py-24 bg-white scroll-mt-24">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={itemVariant} className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                                    <Zap className="h-6 w-6 text-orange-600" />
                                </motion.div>
                                <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                                    Express Editing & Proofreading
                                </motion.h2>
                                <motion.p variants={itemVariant} className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    If you are preparing a conference presentation, an annual business report, or an article for journal publication that is dangerously close to the deadline, this service helps you quickly fix errors in grammar, punctuation, and consistency. No matter how close to the deadline, we can polish your document to a high-quality standard.
                                </motion.p>

                                <motion.ul variants={staggerContainer} className="space-y-4 mb-8">
                                    {[
                                        "Documents under 3,000 words returned within 7 days.",
                                        "Documents up to 6,000 words returned within 7 days.",
                                        "Perfect for final drafts needing a strict, final polish.",
                                        "All the benefits of standard editing, at an accelerated pace."
                                    ].map((item, idx) => (
                                        <motion.li key={idx} variants={itemVariant} className="flex items-start gap-3 text-slate-700">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <motion.div variants={itemVariant}>
                                    <Button variant="outline" className="text-primary border-primary hover:bg-primary/5" asChild>
                                        <Link href="/submit">Get Express Editing <ChevronRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUpVariant}
                                className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-border"
                            >
                                {/* Placeholder for an impressive UI card showing a fast clock or dashboard */}
                                <div className="aspect-square md:aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-8">
                                    <Clock className="w-24 h-24 text-orange-500/50 mb-6" strokeWidth={1} />
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Beat the Deadline</h3>
                                    <p className="text-slate-500 text-center max-w-xs">We guarantee return times within 7 days for critical documents.</p>
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </section>

                {/* 2. Manuscript Formatting */}
                <section id="formatting" className="py-24 bg-slate-50 border-y border-border scroll-mt-24">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row-reverse">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={itemVariant} className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                                    <LayoutTemplate className="h-6 w-6 text-blue-600" />
                                </motion.div>
                                <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                                    Manuscript Formatting
                                </motion.h2>
                                <motion.p variants={itemVariant} className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Ensure your manuscript strictly adheres to the unique style guidelines of your target journal. We handle the tedious layout work so you can focus on your research.
                                </motion.p>

                                <motion.ul variants={staggerContainer} className="space-y-4 mb-8">
                                    {[
                                        "Formatting of citations and references to journal style (APA, MLA, IEEE, etc.)",
                                        "Layout adjustment (margins, line spacing, font size, headers/footers)",
                                        "Formatting of tables, figures, and charts to exact journal specifications",
                                        "Checking word counts and abstract limits against author guidelines"
                                    ].map((item, idx) => (
                                        <motion.li key={idx} variants={itemVariant} className="flex items-start gap-3 text-slate-700">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <motion.div variants={itemVariant}>
                                    <Button variant="outline" className="text-primary border-primary hover:bg-primary/5" asChild>
                                        <Link href="/submit">Format My Manuscript <ChevronRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUpVariant}
                                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-border"
                            >
                                <div className="aspect-square md:aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/50 p-8">
                                    <LayoutTemplate className="w-24 h-24 text-blue-500/50 mb-6" strokeWidth={1} />
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Publish-Ready Layout</h3>
                                    <p className="text-slate-500 text-center max-w-xs">Never get rejected for formatting errors again. We follow Author Guidelines to the letter.</p>
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </section>

                {/* 3. Translation */}
                <section id="translation" className="py-24 bg-white scroll-mt-24">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={itemVariant} className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                                    <Languages className="h-6 w-6 text-purple-600" />
                                </motion.div>
                                <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                                    Academic Translation
                                </motion.h2>
                                <motion.p variants={itemVariant} className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Publish your research in high-impact English journals, regardless of your native language. Our native-speaking subject experts provide accurate, nuanced translations that preserve the technical integrity of your work.
                                </motion.p>

                                <motion.ul variants={staggerContainer} className="space-y-4 mb-8">
                                    {[
                                        "Translation performed by bilingual subject-matter experts",
                                        "Followed by a complete English edit by a native speaker (included)",
                                        "Retention of technical terminology and field-specific jargon",
                                        "Support for Chinese, Japanese, Spanish, and Portuguese to English"
                                    ].map((item, idx) => (
                                        <motion.li key={idx} variants={itemVariant} className="flex items-start gap-3 text-slate-700">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <motion.div variants={itemVariant}>
                                    <Button variant="outline" className="text-primary border-primary hover:bg-primary/5" asChild>
                                        <Link href="/submit">Translate My Document <ChevronRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUpVariant}
                                className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-50 border border-border"
                            >
                                <div className="aspect-square md:aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
                                    <Languages className="w-24 h-24 text-purple-500/50 mb-6" strokeWidth={1} />
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Flawless English</h3>
                                    <p className="text-slate-500 text-center max-w-xs">Reach a global audience with native-level fluency and precise technical accuracy.</p>
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                    <Container className="relative z-10 text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUpVariant}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-3xl font-serif font-bold text-white mb-6">
                                Ready for Publication?
                            </h2>
                            <p className="text-slate-200 mb-8 text-lg">
                                Join thousands of happy researchers and professionals globally who trust our services.
                            </p>
                            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 min-w-[200px]" asChild>
                                <Link href="/submit">Submit Your Manuscript</Link>
                            </Button>
                        </motion.div>
                    </Container>
                </section>
            </main>

            <Footer />
        </div>
    );
}
