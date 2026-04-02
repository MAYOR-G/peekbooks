import { createHmac, randomUUID } from "node:crypto";

export interface PaystackVerificationData {
  status: string;
  amount: number;
  currency: string;
  reference: string;
  paid_at: string | null;
  channel: string | null;
  gateway_response: string | null;
  id: number | string;
  metadata:
    | {
        submissionId?: string;
      }
    | string
    | null;
}

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export function getPaystackCurrency() {
  return process.env.PAYSTACK_CURRENCY?.toUpperCase() ?? "USD";
}

export function getSiteUrl() {
  const siteUrl = process.env.SITE_URL;

  if (!siteUrl) {
    throw new Error("Missing SITE_URL environment variable.");
  }

  return siteUrl.replace(/\/$/, "");
}

export async function initializePaystackTransaction({
  email,
  amount,
  metadata,
}: {
  email: string;
  amount: number;
  metadata: Record<string, string | number>;
}) {
  const secretKey = getPaystackSecretKey();
  const reference = `peekbooks-${randomUUID()}`;
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amount * 100),
      currency: getPaystackCurrency(),
      reference,
      callback_url: `${getSiteUrl()}/submit/complete?reference=${reference}`,
      metadata,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    status: boolean;
    message: string;
    data?: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };

  if (!response.ok || !payload.status || !payload.data) {
    throw new Error(payload.message || "Unable to initialize payment.");
  }

  return payload.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = getPaystackSecretKey();
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as {
    status: boolean;
    message: string;
    data?: PaystackVerificationData;
  };

  if (!response.ok || !payload.status || !payload.data) {
    throw new Error(payload.message || "Unable to verify payment.");
  }

  return payload.data;
}

export function validatePaystackWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
) {
  if (!signatureHeader) {
    return false;
  }

  const digest = createHmac("sha512", getPaystackSecretKey())
    .update(rawBody)
    .digest("hex");

  return digest === signatureHeader;
}

function getPaystackSecretKey() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing PAYSTACK_SECRET_KEY environment variable.");
  }

  return secretKey;
}
