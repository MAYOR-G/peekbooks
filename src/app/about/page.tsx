import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-32 pb-16 gap-16">

                {/* Header */}
                <section className="bg-background">
                    <Container className="max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight mb-6">About PEEKBOOKS</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            PEEKBOOKS was founded to strengthen communication and support writers in achieving their publication and professional goals.
                        </p>
                    </Container>
                </section>

                {/* Ethics & Standards */}
                <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
                    <Container className="max-w-4xl space-y-12">

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold font-serif">Our Commitment to Ethics</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                We believe in preserving the original voice and intent of every author.
                                PEEKBOOKS does not write, ghostwrite, or generate content; we strictly refine language.
                                Our ethical boundaries ensure your authorship remains 100% yours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-serif">Quality Control & Confidentiality</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <Card className="bg-background/50 border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">Two-Editor Review</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        Every document submitted to PEEKBOOKS undergoes a rigorous two-tier review process. A primary editor works on the manuscript, followed by a senior quality-control editor to guarantee perfection.
                                    </CardContent>
                                </Card>
                                <Card className="bg-background/50 border-border/50">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">Strict Confidentiality</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        Your institutional research, corporate strategy, or personal statement is safe. All files are encrypted, handled strictly under NDA-level confidentiality, and automatically deleted after project completion.
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                    </Container>
                </section>

            </main>
            <Footer />
        </>
    );
}
