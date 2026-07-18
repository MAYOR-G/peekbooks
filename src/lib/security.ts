import { createHash, timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const COOLDOWN_MS = 30_000;
const RATE_LIMIT_MAX = 6;

const buckets = new Map<string, { count: number; resetAt: number; lastAt: number }>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function assertRateLimit(key: string, max = RATE_LIMIT_MAX) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS, lastAt: now });
    return;
  }

  if (now - bucket.lastAt < COOLDOWN_MS) {
    throw new PublicError("Please wait a few seconds before submitting again.", 429);
  }

  bucket.count += 1;
  bucket.lastAt = now;

  if (bucket.count > max) {
    throw new PublicError("Too many attempts. Please try again in a minute.", 429);
  }
}

export async function verifyTurnstileToken({
  token,
  ip,
}: {
  token?: string | null;
  ip: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new PublicError("The security check is temporarily unavailable.", 503);
    }

    return { configured: false, success: true };
  }

  if (!token) {
    throw new PublicError("Please complete the security check.", 400);
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  body.append("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    },
  );

  const result = (await response.json()) as { success?: boolean };

  if (!response.ok || !result.success) {
    throw new PublicError("We could not verify the security check. Please try again.", 400);
  }

  return { configured: true, success: true };
}

export function sanitizeText(value: string, maxLength = 5000) {
  return value
    .replaceAll("\u0000", "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function safeCompare(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(valueHash, expectedHash);
}

export function hashOpaqueToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function attachmentContentDisposition(fileName: string) {
  const normalized = fileName.normalize("NFKC").replace(/[\r\n]/g, "").slice(0, 180);
  const asciiFallback = normalized
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "") || "document";
  const encoded = encodeURIComponent(normalized).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );

  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

export function jsonError(error: unknown, fallback: string) {
  if (error instanceof PublicError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: fallback }, { status: 400 });
}

export class PublicError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
