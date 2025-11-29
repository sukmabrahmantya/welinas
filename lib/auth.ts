import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const AUTH_COOKIE = "welinas_session";
const secret = process.env.AUTH_SECRET as string;

if (!secret) {
  throw new Error("Missing AUTH_SECRET environment variable.");
}

type SessionPayload = {
  userId: string;
};

export function createSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifySessionToken(token: string) {
  try {
    return jwt.verify(token, secret) as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getSessionFromRequest(): Promise<SessionPayload | null> {
  const cookie = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!cookie) return null;
  return verifySessionToken(cookie);
}
