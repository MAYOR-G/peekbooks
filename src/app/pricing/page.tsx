"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SERVICES = [
    { id: "proofreading", label: "Proofreading", basePrice: 0.02 },
    { id: "editing", label: "Editing", basePrice: 0.035 },
    { id: "translation", label: "Translation", basePrice: 0.05 },
];

const TURNAROUNDS = [
    { id: "standard", label: "Standard", multiplier: 1, days: "5-7 days" },
    { id: "priority", label: "Priority", multiplier: 1.5, days: "2-3 days" },
    { id: "express", label: "Express", multiplier: 2, days: "24 hours" },
];

export default function PricingPage() {
    const [words, setWords] = useState<number>(1000);
    const [service, setService] = useState(SERVICES[0]);
    const [turnaround, setTurnaround] = useState(TURNAROUNDS[0]);

    const estimatedPrice = words * service.basePrice * turnaround.multiplier;

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-32 pb-16 gap-16">

                <section>
                    <Container className="max-w-4xl text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight mb-6">Transparent Pricing</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            No hidden charges. Pricing communicated clearly in advance.
                        </p>
                    </Container>
                </section>

                <section>
                    <Container className="max-w-3xl">
                        <Card className="border-border/50 shadow-xl overflow-hidden glass">
                            <div className="md:grid md:grid-cols-5 md:divide-x divide-border/50">

                                {/* Inputs */}
                                <div className="md:col-span-3 p-6 sm:p-8 space-y-8 bg-background/50">

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Select Service</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {SERVICES.map((s) => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => setService(s)}
                                                    className={cn(
                                                        "px-3 py-2 text-sm font-medium rounded-md transition-colors border outline-hidden focus-visible:ring-2",
                                                        service.id === s.id
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-background text-foreground hover:bg-muted border-border"
                                                    )}
                                                >
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Word Count</label>
                                        <Input
                                            type="number"
                                            min={100}
                                            step={100}
                                            value={words}
                                            onChange={(e) => setWords(Number(e.target.value) || 0)}
                                            className="text-lg py-6"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Turnaround Time</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {TURNAROUNDS.map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setTurnaround(t)}
                                                    className={cn(
                                                        "px-3 py-2 text-sm font-medium rounded-md transition-colors border flex flex-col items-center gap-1 outline-hidden focus-visible:ring-2",
                                                        turnaround.id === t.id
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-background text-foreground hover:bg-muted border-border"
                                                    )}
                                                >
                                                    <span>{t.label}</span>
                                                    <span className={cn("text-xs opacity-80", turnaround.id === t.id ? "text-primary-foreground/80" : "text-muted-foreground")}>{t.days}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Estimate Output */}
                                <div className="md:col-span-2 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-2">Estimated Total</h3>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={estimatedPrice}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-4xl sm:text-5xl font-bold font-serif text-primary"
                                                >
                                                    ${typeof estimatedPrice === 'number' && !isNaN(estimatedPrice) ? estimatedPrice.toFixed(2) : '0.00'}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-2">What&apos;s Included</h3>
                                            {[
                                                "Two-editor review",
                                                "Tracked changes copy",
                                                "Clean finalized file",
                                                "100% confidentiality",
                                            ].map((feature) => (
                                                <div key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 space-y-4">
                                        <Button size="lg" className="w-full h-12" asChild>
                                            <Link href="/submit">Start Order</Link>
                                        </Button>
                                        <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                            Full payment is required after quotation and before proofreading begins.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Container>
                </section>

            </main>
            <Footer />
        </>
    );
}
