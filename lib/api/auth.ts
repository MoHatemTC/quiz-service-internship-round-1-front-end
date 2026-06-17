import { apiFetch } from '@/lib/api/client';
import type { LoginResponse } from '@/types/user/user';
import { setToken, clearToken } from '@/lib/auth/session';

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
