import { NextResponse } from "next/server";

import { finalizeSubmissionFromReference } from "@/lib/submission-service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Missing payment reference." },
      { status: 400 },
    );
  }

  try {
    const result = await finalizeSubmissionFromReference(reference);

    return NextResponse.json({
      verified: result.verified,
      amountMatches: result.amountMatches,
      message: result.message,
      submission: {
        id: result.record.id,
        stage: result.record.stage,
        customerName: result.record.customer?.fullName ?? "",
        wordCount: result.record.manuscript.wordCount,
        fileName: result.record.manuscript.originalFileName,
        amount: result.record.pricing?.amount ?? 0,
        currency: result.record.pricing?.currency ?? "USD",
        notifications: result.record.notifications,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We could not confirm this payment yet.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
