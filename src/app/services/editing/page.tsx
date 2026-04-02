"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, FileText, Briefcase, GraduationCap, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const disciplines = [
    {
        category: "Clinical Medicine",
        items: ["Internal Medicine", "Oncology", "Surgery", "Pediatrics", "Cardiology", "Neurology", "Psychiatry", "Public Health", "Dentistry", "Nursing"]
    },
    {
        category: "Life Sciences",
        items: ["Biology", "Genetics", "Neuroscience", "Pharmacology", "Ecology", "Botany", "Zoology", "Microbiology", "Biochemistry", "Agricultural Sciences"]
    },
    {
        category: "Physical Sciences",
        items: ["Physics", "Chemistry", "Earth Sciences", "Astronomy", "Materials Science", "Environmental Science", "Geology", "Oceanography"]
    },
    {
        category: "Humanities & Social Sciences",
        items: ["History", "Literature", "Philosophy", "Sociology", "Psychology", "Political Science", "Education", "Anthropology", "Linguistics"]
    },
    {
        category: "Management & Law",
        items: ["Business Administration", "Economics", "Marketing", "Corporate Law", "International Law", "Finance", "Accounting", "HR Management"]
    },
    {
        category: "Engineering",
        items: ["Civil Engineering", "Mechanical", "Electrical", "Chemical", "Computer Engineering", "Aerospace Engineering", "Industrial Engineering"]
    },
    {
        category: "Mathematics & Computer Science",
        items: ["Applied Mathematics", "Statistics", "Computer Science", "Software Engineering", "Artificial Intelligence", "Information Systems"]
    }
];

const nonAcademicCategories = [
    {
        title: "Business Documents",
        icon: <Briefcase className="h-6 w-6 text-primary mb-4" />,
        items: ["Manuals", "Annual reports", "Legal documents", "Website content", "Marketing materials", "Business proposals"]
    },
    {
        title: "Authors",
        icon: <FileText className="h-6 w-6 text-primary mb-4" />,
        items: ["Magazines", "Fiction & Non-fiction", "Book manuscripts", "Short stories", "Self-help books", "Screenplays/Scripts"]
    },
    {
        title: "Applications",
        icon: <GraduationCap className="h-6 w-6 text-primary mb-4" />,
        items: ["Motivation letters", "Resumes / CVs", "Cover letters", "Personal statements", "Grant proposals", "Scholarship essays"]
    }
];

export default function EditingServicesPage() {
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
                                Academic & Non-Academic <br />Editing Services
                            </motion.h1>
                            <motion.p
                                variants={fadeUpVariant}
                                className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                            >
                                Fast, secure, and professional editing for students, researchers, authors, and businesses worldwide.
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

                {/* What You Receive Section */}
                <section className="py-20 bg-slate-50">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeUpVariant}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">What You Will Receive</h2>
                                <p className="text-muted-foreground text-lg">Every manuscript edited by PEEKBOOKS includes these essential improvements.</p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={staggerContainer}
                                className="grid md:grid-cols-2 gap-6"
                            >
                                {[
                                    "Correction of grammar, punctuation, spelling, and usage",
                                    "Correct inconsistent tenses and stylistic errors",
                                    "Improve the structure, flow, clarity, and tone of your writing",
                                    "Correct erroneous idioms and proper nouns",
                                    "Suggest improvements to vocabulary and word choice",
                                    "Correct formatting inconsistencies and alignment issues"
                                ].map((item, idx) => (
                                    <motion.div key={idx} variants={itemVariant} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
                                        <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </Container>
                </section>

                {/* Academic Editing Section */}
                <section className="py-24 bg-white relative">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUpVariant}
                            className="max-w-3xl mx-auto text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                                High-Quality English Editing for Academic Writing
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Whether you are writing an original research article, review, case report, or thesis, our editors have the technical background to understand your field's specific conventions. Select your discipline below to learn more.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {disciplines.map((disc, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={fadeUpVariant}
                                    className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <h3 className="text-xl font-bold text-primary mb-4">{disc.category}</h3>
                                    <ul className="space-y-2">
                                        {disc.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Non-Academic Editing Section */}
                <section className="py-24 bg-[#FAF9F6] border-t border-slate-200/50">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUpVariant}
                            className="max-w-3xl mx-auto text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                                Non-Academic Documents & Applications
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Enhance your professional impact with the services of expert editors and proofreaders. It does not matter what you have written—whether a book, a business proposal, or a college application—we have the perfect editor for your document.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {nonAcademicCategories.map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={fadeUpVariant}
                                >
                                    <Card className="p-8 h-full bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        {cat.icon}
                                        <h3 className="text-xl font-bold text-foreground mb-4">{cat.title}</h3>
                                        <ul className="space-y-3">
                                            {cat.items.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-600">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* CTA Section */}
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
