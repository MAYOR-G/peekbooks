import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  getAdminPassword,
  getAdminSessionSecret,
} from "@/lib/admin-auth";
import { PublicError, assertRateLimit, getClientIp, jsonError, safeCompare } from "@/lib/security";

export async function POST(request: Request) {
  try {
    assertRateLimit(`admin-login:${getClientIp(request)}`, 5);

    const { password } = (await request.json()) as { password?: string };
    const expectedPassword = getAdminPassword();
    const sessionSecret = getAdminSessionSecret();

    if (!expectedPassword || !sessionSecret) {
      throw new PublicError("Admin access is not configured.", 503);
    }

    if (!password || !safeCompare(password, expectedPassword)) {
      throw new PublicError("Invalid admin password.", 401);
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, sessionSecret, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    return jsonError(error, "Unable to sign in.");
  }
}
