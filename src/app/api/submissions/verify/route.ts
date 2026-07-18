import { NextResponse } from "next/server";

import { finalizeSubmissionFromReference } from "@/lib/submission-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { reference } = (await request.json()) as { reference?: string };

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
        wordCount: result.record.manuscript.wordCount,
        amount: result.record.pricing?.amount ?? 0,
        currency: result.record.pricing?.currency ?? "USD",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "We could not confirm this payment yet." },
      { status: 400 },
    );
  }
}
