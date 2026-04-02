import { NextResponse } from "next/server";

import { finalizeSubmissionFromReference } from "@/lib/submission-service";
import { validatePaystackWebhookSignature } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!validatePaystackWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody) as {
      event?: string;
      data?: {
        reference?: string;
      };
    };

    if (event.event !== "charge.success" || !event.data?.reference) {
      return NextResponse.json({ received: true });
    }

    await finalizeSubmissionFromReference(event.data.reference);

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook processing failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
