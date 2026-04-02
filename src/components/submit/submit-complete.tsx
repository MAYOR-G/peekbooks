"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/submission-config";

type VerificationState =
  | {
      status: "loading";
    }
  | {
      status: "failed";
      message: string;
    }
  | {
      status: "success";
      payload: {
        submission: {
          customerName: string;
          wordCount: number;
          fileName: string;
          amount: number;
          currency: string;
        };
      };
    };

export function SubmitComplete({ reference }: { reference: string | null }) {
  const [state, setState] = useState<VerificationState>({ status: "loading" });

  useEffect(() => {
    if (!reference) {
      setState({
        status: "failed",
        message: "Missing payment reference. Please contact the editor if you were charged.",
      });
      return;
    }

    void verifySubmission(reference);
  }, [reference]);

  async function verifySubmission(paymentReference: string) {
    setState({ status: "loading" });

    try {
      const response = await fetch(
        `/api/submissions/verify?reference=${encodeURIComponent(paymentReference)}`,
        {
          cache: "no-store",
        },
      );

      const payload = (await response.json()) as
        | {
            submission: {
              customerName: string;
              wordCount: number;
              fileName: string;
              amount: number;
              currency: string;
            };
          }
        | {
            error: string;
          };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload ? payload.error : "Unable to verify payment.",
        );
      }

      setState({
        status: "success",
        payload,
      });
    } catch (error) {
      setState({
        status: "failed",
        message:
          error instanceof Error
            ? error.message
            : "We could not confirm your payment yet.",
      });
    }
  }

  return (
    <Card className="mx-auto max-w-2xl rounded-[30px] border-border/70 bg-white shadow-[0_36px_90px_-60px_rgba(15,23,42,0.45)]">
      <CardContent className="px-8 py-10 sm:px-10 sm:py-12">
        {state.status === "loading" ? (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/8 text-primary">
              <LoaderCircle className="h-7 w-7 animate-spin" />
            </div>
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Confirming your payment
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                We are verifying your Paystack transaction and finalizing the manuscript submission.
              </p>
            </div>
          </div>
        ) : null}

        {state.status === "failed" ? (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Payment confirmation pending
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                {state.message}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  if (reference) {
                    void verifySubmission(reference);
                  }
                }}
              >
                <RefreshCcw className="h-4 w-4" />
                Try again
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/submit">Back to submission</Link>
              </Button>
            </div>
          </div>
        ) : null}

        {state.status === "success" ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div className="space-y-3">
              <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-[2.35rem]">
                Manuscript received
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Your payment has been confirmed and the editorial team has received your manuscript details.
              </p>
            </div>

            <div className="grid w-full gap-4 rounded-[24px] border border-border/70 bg-secondary/40 p-5 text-left sm:grid-cols-2 sm:p-6">
              <Summary label="Customer" value={state.payload.submission.customerName} />
              <Summary label="Manuscript" value={state.payload.submission.fileName} />
              <Summary
                label="Detected word count"
                value={`${state.payload.submission.wordCount.toLocaleString()} words`}
              />
              <Summary
                label="Amount paid"
                value={formatCurrency(
                  state.payload.submission.amount,
                  state.payload.submission.currency,
                )}
              />
            </div>

            <div className="max-w-xl rounded-[24px] border border-primary/10 bg-primary/[0.03] px-5 py-4 text-sm leading-6 text-muted-foreground">
              A submission confirmation email and a payment receipt have been triggered. If they do not arrive shortly, check your spam folder and then contact the editor with your payment reference.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">Return home</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/submit">Submit another manuscript</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
