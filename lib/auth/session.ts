import type { LoginResponse } from '@/types/user/user';

const COOKIE_NAME = 'accessToken';
const COOKIE_MAX_AGE = 3600; // 1 hour

export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
    document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUser(): LoginResponse['user'] | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      emailVerified: payload.emailVerified ?? true,
    };
  } catch {
    return null;
  }
}
