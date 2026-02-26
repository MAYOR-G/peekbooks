"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, name: "Document Details" },
    { id: 2, name: "Upload" },
    { id: 3, name: "Turnaround & Quote" },
    { id: 4, name: "Account" },
];

export default function SubmitPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fileHover, setFileHover] = useState(false);

    // Fake states to simulate progression
    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const submitForm = () => setIsSuccess(true);

    if (isSuccess) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full"
                    >
                        <Card className="p-8 text-center flex flex-col items-center gap-6 glass border-success/30 shadow-2xl">
                            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-serif font-bold text-foreground">Quote Received</h2>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We will assess your manuscript and send you a clear delivery date before you confirm the order.
                                </p>
                            </div>
                            <Button className="w-full mt-4" onClick={() => window.location.href = "/"}>Return to Home</Button>
                        </Card>
                    </motion.div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col pt-32 pb-16 bg-slate-50 dark:bg-slate-900/50">
                <Container className="max-w-3xl w-full flex-1 flex flex-col gap-8">

                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-serif font-bold text-foreground">Submit Manuscript</h1>
                        <p className="text-muted-foreground">Step {currentStep} of 4 &middot; ~2 minutes to complete</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded-full" />
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                        />
                        <div className="relative flex justify-between z-10 w-full px-1">
                            {STEPS.map((step) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-300 ring-4 ring-slate-50 dark:ring-slate-900",
                                        step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"
                                    )}
                                >
                                    {step.id}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="glass flex-1 flex flex-col min-h-[400px] border-border/50 shadow-xl overflow-hidden relative">
                        <CardContent className="flex-1 p-6 sm:p-10 flex flex-col relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, type: "spring", bounce: 0 }}
                                    className="flex-1 flex flex-col"
                                >
                                    {currentStep === 1 && (
                                        <div className="space-y-6 flex-1">
                                            <h2 className="text-xl font-semibold mb-6">Document Details</h2>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Document Type</label>
                                                    <select className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                                        <option>Thesis</option>
                                                        <option>Journal Article</option>
                                                        <option>Personal Statement</option>
                                                        <option>Report</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Academic Field / Discipline</label>
                                                    <Input placeholder="e.g. Medicine, Engineering, History" className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Required Style Guide</label>
                                                    <select className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                                        <option>APA</option>
                                                        <option>MLA</option>
                                                        <option>Chicago</option>
                                                        <option>Harvard</option>
                                                        <option>None / Standard</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-6 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-2">
                                                <h2 className="text-xl font-semibold">Upload Manuscript</h2>
                                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Word / PDF</span>
                                            </div>

                                            <div
                                                className={cn(
                                                    "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all duration-200 group cursor-pointer",
                                                    fileHover ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
                                                )}
                                                onMouseEnter={() => setFileHover(true)}
                                                onMouseLeave={() => setFileHover(false)}
                                            >
                                                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                                    <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <p className="font-semibold text-lg text-foreground mb-1">Drag and drop your files here</p>
                                                <p className="text-sm text-muted-foreground mb-6">or click to browse from your computer</p>
                                                <p className="text-xs text-primary/80 font-medium bg-primary/5 px-3 py-1 rounded-full">Word preferred (.doc/.docx)</p>
                                            </div>

                                            {/* Fake file uploaded state */}
                                            <div className="bg-muted p-4 rounded-lg flex items-center gap-4">
                                                <div className="h-10 w-10 bg-background rounded flex items-center justify-center shrink-0 shadow-xs">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">chap1-final-v2.docx</p>
                                                    <p className="text-xs text-muted-foreground">3,250 words &middot; 1.2 MB</p>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">Remove</Button>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-6 flex-1">
                                            <h2 className="text-xl font-semibold mb-6">Turnaround & Quote Estimate</h2>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {["Standard (5-7 days)", "Priority (2-3 days)", "Express (24 hrs)"].map((t, i) => (
                                                    <label key={i} className="cursor-pointer">
                                                        <input type="radio" name="turnaround" className="peer sr-only" defaultChecked={i === 0} />
                                                        <div className="border border-border rounded-lg p-4 transition-colors peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50">
                                                            <p className="font-medium text-sm">{t}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="mt-8 bg-slate-50 dark:bg-slate-900 border border-border rounded-xl p-6">
                                                <div className="flex justify-between items-end mb-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">Estimated Word Count</p>
                                                        <p className="font-medium">3,250 words</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                                                        <p className="text-2xl font-bold font-serif text-primary">$113.75</p>
                                                    </div>
                                                </div>
                                                <div className="bg-warning/10 text-warning-foreground text-sm p-3 rounded flex items-start gap-2 border border-warning/20">
                                                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                                                    <p>When you submit your document, PEEKBOOKS will assess it and provide you with a clear delivery date before you confirm your order.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-6 flex-1">
                                            <h2 className="text-xl font-semibold mb-2">Account Details</h2>
                                            <p className="text-muted-foreground pb-4">Create an account to track your order and communicate securely.</p>

                                            <div className="space-y-4 max-w-sm">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Email Address</label>
                                                    <Input type="email" placeholder="m@example.com" className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Create Password</label>
                                                    <Input type="password" placeholder="••••••••" className="h-11" />
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-border">
                                                <h3 className="text-sm font-medium mb-4">Payment Method (Placeholder)</h3>
                                                <div className="h-12 bg-muted rounded border border-dashed border-border flex items-center justify-center opacity-50">
                                                    <span className="text-sm text-muted-foreground font-medium">Stripe Element Mounts Here</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                                                    By submitting, you agree to our Terms of Service. Note: Full payment is required after quotation and before proofreading begins.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>

                        <div className="p-6 border-t border-border bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center rounded-b-[var(--radius)]">
                            <Button disabled={currentStep === 1} variant="ghost" onClick={prevStep} className="gap-2">
                                <ChevronLeft className="h-4 w-4" /> Back
                            </Button>
                            <div className="flex items-center gap-4">
                                <p className="hidden sm:block text-xs text-muted-foreground font-medium flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Confidential & Ethical</p>
                                {currentStep < STEPS.length ? (
                                    <Button onClick={nextStep} className="gap-2 px-8 h-11">
                                        Continue <ChevronRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button onClick={submitForm} className="gap-2 px-8 h-11">
                                        Submit Manuscript <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                </Container>
            </main>
        </>
    );
}
