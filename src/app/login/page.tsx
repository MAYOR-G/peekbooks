import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShieldCheck, BookOpenText } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/30">

            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                            <BookOpenText size={22} className="text-white" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold tracking-[0.04em] text-foreground leading-none">
                                PEEK<span className="text-primary">BOOKS</span>
                            </span>
                            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground leading-none mt-[3px]">
                                Proofreading
                            </span>
                        </div>
                    </Link>
                </div>

                <Card className="border-border/50 shadow-xl glass">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-serif">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your email to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                            <Input id="email" type="email" placeholder="m@example.com" required className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required className="h-11" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full h-11">Sign In</Button>
                        <div className="text-sm text-center text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link href="#" className="text-primary hover:underline">
                                Create one
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Confidential. Ethical. Tracked changes.</span>
                </div>
            </div>

        </main>
    );
}
