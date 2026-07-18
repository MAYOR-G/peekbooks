import Link from "next/link";
import {
  AlertTriangle,
  CreditCard,
  FileText,
  Inbox,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { AdminLogin } from "@/components/admin/admin-login";
import { ProjectStatusSelect, ReplyBox } from "@/components/admin/admin-actions";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listMessageThreads } from "@/lib/contact-store";
import { listSubmissions } from "@/lib/submission-store";
import { formatCurrency, getServiceById } from "@/lib/submission-config";
import type { SubmissionRecord } from "@/lib/submission-types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const [threads, submissions] = await Promise.all([
    listMessageThreads(),
    listSubmissions(),
  ]);

  const paid = submissions.filter((item) => item.paymentStatus === "paid").length;
  const unpaid = submissions.filter((item) => item.paymentStatus === "unpaid").length;
  const pending = submissions.filter((item) => item.paymentStatus === "pending").length;
  const failed = submissions.filter((item) => item.paymentStatus === "failed").length;
  const unread = threads.filter((thread) => thread.status === "unread").length;

  return (
    <main className="min-h-screen bg-secondary/35 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 rounded-[28px] border border-border/70 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Protected
            </span>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">
              PeekBooks Editors Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Messages, manuscript submissions, payment status, and project tracking.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">View site</Link>
          </Button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Metric icon={Mail} label="Messages" value={threads.length} />
          <Metric icon={Inbox} label="Unread" value={unread} />
          <Metric icon={FileText} label="Submissions" value={submissions.length} />
          <Metric icon={CreditCard} label="Paid" value={paid} />
          <Metric icon={AlertTriangle} label="Unpaid" value={unpaid + pending} />
          <Metric icon={AlertTriangle} label="Failed" value={failed} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Panel title="Messages">
            <div className="space-y-4">
              {threads.length === 0 ? (
                <EmptyState>No contact messages yet.</EmptyState>
              ) : (
                threads.slice(0, 12).map((thread) => (
                  <details
                    key={thread.id}
                    className="group overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm open:shadow-[0_22px_70px_-56px_rgba(15,23,42,0.5)]"
                  >
                    <summary className="flex cursor-pointer list-none flex-wrap items-start justify-between gap-3 p-4 transition-colors hover:bg-secondary/35">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{thread.subject}</h3>
                          {thread.status === "unread" ? (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                              new
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {thread.senderName} · {thread.senderEmail}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {thread.preview}
                        </p>
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {new Date(thread.updatedAt).toLocaleString("en-US")}
                      </time>
                    </summary>

                    <div className="border-t border-border/70 bg-secondary/20 p-4">
                      <div className="space-y-3">
                        {thread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                              reply.direction === "admin"
                                ? "ml-auto bg-primary text-white"
                                : "bg-white text-foreground"
                            }`}
                          >
                            <div className={reply.direction === "admin" ? "mb-1 font-semibold text-white" : "mb-1 font-semibold"}>
                              {reply.direction === "admin" ? "PeekBooks Editors" : reply.senderName}
                            </div>
                            <p className="whitespace-pre-wrap">{reply.message}</p>
                            {reply.attachment ? (
                              <a
                                className={`mt-2 inline-flex underline-offset-4 hover:underline ${
                                  reply.direction === "admin" ? "text-white" : "text-primary"
                                }`}
                                href={`/api/admin/messages/${thread.id}/attachments/${reply.id}`}
                              >
                                Download {reply.attachment.originalFileName}
                              </a>
                            ) : null}
                          </div>
                        ))}
                      </div>
                      <ReplyBox threadId={thread.id} />
                    </div>
                  </details>
                ))
              )}
            </div>
          </Panel>

          <Panel title="Manuscript Submissions">
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <EmptyState>No manuscript submissions yet.</EmptyState>
              ) : (
                submissions.map((submission) => (
                  <article key={submission.id} className="rounded-2xl border border-border/70 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {submission.customer?.fullName ?? "Draft submission"}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {submission.customer?.email ?? "No client details yet"} · {submission.id}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge>{submission.paymentStatus}</Badge>
                        <Badge>{submission.projectStatus.replace("_", " ")}</Badge>
                      </div>
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                      <Detail label="Services" value={getSubmissionServices(submission)} />
                      <Detail label="Document" value={submission.brief?.documentType ?? "Not selected"} />
                      <Detail label="Detected words" value={`${submission.manuscript.detectedWordCount.toLocaleString()} words`} />
                      <Detail label="Final words" value={`${submission.manuscript.finalWordCount.toLocaleString()} words`} />
                      <Detail label="Estimate" value={submission.pricing ? formatCurrency(submission.pricing.amount, submission.pricing.currency) : "Not calculated"} />
                      <Detail label="Payment ref" value={submission.payment?.reference ?? "No payment yet"} />
                    </dl>
                    {submission.manuscript.wordCountAdjustmentNote ? (
                      <p className="mt-3 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
                        Adjustment note: {submission.manuscript.wordCountAdjustmentNote}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button asChild variant="outline" size="sm">
                        <a href={`/api/admin/submissions/${submission.id}/download`}>
                          Download manuscript
                        </a>
                      </Button>
                      <ProjectStatusSelect
                        submissionId={submission.id}
                        value={submission.projectStatus}
                      />
                    </div>
                  </article>
                ))
              )}
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-4 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-border/70 bg-white/70 p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 font-serif text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white px-4 py-8 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">
      {children}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function getSubmissionServices(submission: SubmissionRecord) {
  if (!submission.brief) {
    return "Not selected";
  }

  return (submission.brief.serviceIds ?? [submission.brief.serviceId])
    .map((serviceId) => getServiceById(serviceId)?.label ?? serviceId)
    .join(", ");
}
