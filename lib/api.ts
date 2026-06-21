const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchAnalyticsDashboard() {
  const response = await fetch(`${API_BASE_URL}/analytics`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch analytics: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchQuizAttempts(quizName: string) {
  const response = await fetch(
    `${API_BASE_URL}/analytics/quizzes/${encodeURIComponent(quizName)}/attempts`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch quiz attempts: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchQuizzes() {
  const response = await fetch(`${API_BASE_URL}/admin/quizzes`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
  }

  return response.json();
}
