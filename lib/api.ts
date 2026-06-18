// lib/api.ts
//
// Minimal fetch wrapper for the backend auth endpoints. This is the first
// data-fetching code in the frontend repo (no swr/react-query/axios
// installed), so it's intentionally small rather than a generic client.
// Whoever builds login/register can extend this rather than starting over.
//
// NEXT_PUBLIC_ prefix is required — without it, this env var is replaced
// with an empty string in the client bundle (Next.js docs,
// server-and-client-components.md, "Preventing environment poisoning").

import type {
  VerifyEmailResponse,
  ResendVerificationResponse,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  // Fails loudly at build/runtime instead of silently fetching "undefined/auth/...".
  // This is exactly the failure mode the "Preventing environment poisoning"
  // section warns about if the NEXT_PUBLIC_ prefix is missing from .env.local.
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Copy .env.local from .env.example (or see README) and set it.",
  );
}

// A small custom error so callers can distinguish "request reached the
// server and it said no" from "request never reached the server at all"
// (network down, backend not running, wrong URL).
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function postJson<TResponse>(
  path: string,
  body: unknown,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Try to read the JSON body even on error responses — NestJS error
  // responses are JSON too ({ statusCode, message, error }), and the
  // message is more useful to show than a generic "request failed".
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(response.status, message);
  }

  return data as TResponse;
}

/**
 * Calls the backend with a verification token.
 * Backend route: POST /auth/verify-email  (body: { token })
 * Throws ApiError on 401 (invalid/expired token) or any other failure.
 */
export function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  return postJson<VerifyEmailResponse>("/auth/verify-email", { token });
}

/**
 * Asks the backend to issue a new verification token and re-send the email.
 * Backend route: POST /auth/resend-verification  (body: { email })
 * Throws ApiError on 404 (unknown email) or any other failure.
 */
export function resendVerification(
  email: string,
): Promise<ResendVerificationResponse> {
  return postJson<ResendVerificationResponse>("/auth/resend-verification", {
    email,
  });
}