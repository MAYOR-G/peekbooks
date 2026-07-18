import Link from "next/link";
import { BookOpenText, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-md">
              <BookOpenText size={22} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-extrabold tracking-[0.02em] text-foreground">
              PeekBooks Editors
            </span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <h1 className="font-serif text-2xl font-semibold leading-none tracking-tight">
              Client account login is not available
            </h1>
            <CardDescription>
              This page does not provide a client account. Use your submission reference and email correspondence for project updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild className="w-full">
              <Link href="/submit">Submit a manuscript</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">Contact the editorial team</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80">
          <ShieldCheck className="h-4 w-4" />
          <span>Private admin access is restricted to staff.</span>
        </div>
      </div>
    </main>
  );
}
