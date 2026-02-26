import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default function EditorsPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-32 pb-16 gap-16">

                <section>
                    <Container className="max-w-4xl text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight mb-6">Meet the standards behind our editing.</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            PEEKBOOKS exclusively works with seasoned academic and professional editors committed to our rigorous PEEK framework.
                        </p>
                    </Container>
                </section>

                <section className="bg-background">
                    <Container className="max-w-4xl space-y-12">

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold font-serif">Quality Control Standards</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Native-level comprehension of the associated academic discipline.",
                                        "Strict adherence to maintaining the author's original voice.",
                                        "Mandatory two-editor verification (Primary + Senior QA editor).",
                                        "Implementation of tracked-changes for author transparency."
                                    ].map((standard, i) => (
                                        <li key={i} className="flex gap-3 text-muted-foreground">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                            <span className="leading-relaxed">{standard}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Card className="bg-slate-50 dark:bg-slate-900/50 border-border/50 text-center flex flex-col items-center justify-center p-8 gap-4">
                                <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-xs border border-border">
                                    <Lock className="h-6 w-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">Editor Portal</h3>
                                <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">
                                    Access pending assignments, review style guidelines, and manage payouts.
                                </p>
                                <Button className="w-full max-w-[200px] mt-4" asChild>
                                    <Link href="/login">Portal Login</Link>
                                </Button>
                            </Card>

                        </div>

                    </Container>
                </section>

            </main>
            <Footer />
        </>
    );
}
