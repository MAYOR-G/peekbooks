"use client";

import { useState } from "react";
import { CheckCircle2, LoaderCircle, Mail, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "@/components/security/turnstile-widget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("turnstileToken", turnstileToken);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to send your message.");
      }

      form.reset();
      setTurnstileToken("");
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to send your message.");
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-border/70 bg-white p-5 shadow-[0_28px_80px_-56px_rgba(15,23,42,0.45)] sm:p-7"
    >
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">Contact Peekbooks</h3>
          <p className="text-sm text-muted-foreground">Send a message or attach a document for review.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Full name" required minLength={2} />
        <Input name="email" type="email" placeholder="Email address" required />
      </div>
      <Input name="subject" placeholder="Subject" required minLength={3} className="mt-4" />
      <textarea
        name="message"
        required
        minLength={20}
        maxLength={5000}
        rows={6}
        placeholder="Tell us what you need help with."
        className="mt-4 min-h-36 w-full rounded-2xl border border-input bg-background px-3.5 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20"
      />

      <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-secondary/45 px-4 py-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-3">
          <Paperclip className="h-4 w-4 text-primary" />
          Attach DOC, DOCX, PDF, TXT, or RTF
        </span>
        <input name="file" type="file" accept=".doc,.docx,.pdf,.txt,.rtf" className="max-w-[13rem] text-xs" />
      </label>

      <TurnstileWidget siteKey={TURNSTILE_SITE_KEY} onToken={setTurnstileToken} />

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      {status === "sent" ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Your message has been received.
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "sending"} className="mt-6 w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
