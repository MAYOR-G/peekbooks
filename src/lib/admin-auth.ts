import { cookies } from "next/headers";

import { safeCompare } from "@/lib/security";

export const ADMIN_COOKIE_NAME = "peekbook_admin";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_SESSION_SECRET;

  if (!token || !expected) {
    return false;
  }

  return safeCompare(token, expected);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

export function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}
