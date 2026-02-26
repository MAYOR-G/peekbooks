import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-32 pb-16 gap-16">

                {/* Header */}
                <section>
                    <Container className="max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight mb-6">Our Services</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Specialized editorial support tailored for academic, professional, and institutional requirements.
                        </p>
                    </Container>
                </section>

                {/* Detailed Services */}
                <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
                    <Container className="grid lg:grid-cols-3 gap-8">

                        {/* Proofreading */}
                        <Card className="flex flex-col border-border/50 shadow-sm bg-background/50 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">Proofreading</CardTitle>
                                <CardDescription className="text-base mt-2">Surface-level polish for near-final drafts.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-muted-foreground">What we do</h4>
                                    <ul className="space-y-2">
                                        {["Correct spelling and typos", "Fix grammatical errors", "Ensure punctuation consistency", "Formatting cleanup"].map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-foreground/80">
                                                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto pt-6 border-t border-border">
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-destructive/80">What we do not do</h4>
                                    <p className="text-sm flex items-start gap-2 text-foreground/80">
                                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                        <span>No structural rewriting or argument reframing.</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Editing */}
                        <Card className="flex flex-col border-border/50 shadow-sm bg-background/50 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">Editing</CardTitle>
                                <CardDescription className="text-base mt-2">Deeper structural review for clarity and flow.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-muted-foreground">What we do</h4>
                                    <ul className="space-y-2">
                                        {["Sentence restructuring", "Improve logical flow and readability", "Lexical enhancements", "Includes all proofreading checks"].map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-foreground/80">
                                                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto pt-6 border-t border-border">
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-destructive/80">What we do not do</h4>
                                    <p className="text-sm flex items-start gap-2 text-foreground/80">
                                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                        <span>No ghostwriting or original content generation.</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Translation */}
                        <Card className="flex flex-col border-border/50 shadow-sm bg-background/50 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">Translation</CardTitle>
                                <CardDescription className="text-base mt-2">Context-aware linguistic conversion.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-muted-foreground">What we do</h4>
                                    <ul className="space-y-2">
                                        {["Human-led translation", "Discipline-specific terminology", "Tone and style preservation", "Native-speaker fluency check"].map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-foreground/80">
                                                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto pt-6 border-t border-border">
                                    <h4 className="text-sm font-semibold mb-3 tracking-wide uppercase text-destructive/80">What we do not do</h4>
                                    <p className="text-sm flex items-start gap-2 text-foreground/80">
                                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                        <span>No automated machine translation outputs.</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                    </Container>
                </section>

                {/* What we proofread */}
                <section>
                    <Container className="max-w-4xl space-y-8">
                        <h2 className="text-3xl font-bold font-serif">Documents we review</h2>
                        <div className="flex flex-wrap gap-3">
                            {["Theses", "Journal Articles", "Conference Papers", "Proposals", "Policy Docs", "Reports", "Grants", "Personal Statements", "Formal Business Docs"].map((doc) => (
                                <span key={doc} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border">
                                    {doc}
                                </span>
                            ))}
                        </div>
                    </Container>
                </section>

            </main>
            <Footer />
        </>
    );
}
