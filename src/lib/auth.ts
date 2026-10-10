import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

function adminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SECRET environment variable");
  }
  return secret;
}

export function verifyAdminPassword(password: string): boolean {
  return password === adminSecret();
}

export async function createAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, adminSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return !!value && value === adminSecret();
}
