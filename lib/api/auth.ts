import { apiFetch } from '@/lib/api/client';
import type { LoginResponse } from '@/types/user/user';
import { setToken, clearToken } from '@/lib/auth/session';
import type { VerifyEmailResponse, ResendVerificationResponse } from '@/types/auth';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    requireAuth: false,
  });

  setToken(response.tokens.accessToken);
  return response;
}

export function logout(): void {
  clearToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

export async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  return apiFetch<VerifyEmailResponse>('/api/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
    requireAuth: false,
  });
}

export async function resendVerification(email: string): Promise<ResendVerificationResponse> {
  return apiFetch<ResendVerificationResponse>('/api/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
    requireAuth: false,
  });
}
