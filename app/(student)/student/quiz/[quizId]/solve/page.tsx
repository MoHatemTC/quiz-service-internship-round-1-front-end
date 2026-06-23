'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { startAttempt, saveAnswers, submitAttempt } from '@/lib/api/attempts';
import { getQuestions } from '@/lib/api/student';
import type { QuestionDto } from '@/types/question/question';
import Container from '@/components/shared/Container';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toUuidOrNull(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

export default function QuizSolvePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = params.quizId as string;
  const initialAttemptId = toUuidOrNull(searchParams.get('attemptId'));
  const initializedRef = useRef(false);

  const [attemptId, setAttemptId] = useState<string | null>(initialAttemptId);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    async function startQuiz() {
      try {
        const [questionsData, attemptData] = await Promise.all([
          getQuestions(quizId),
          initialAttemptId ? Promise.resolve(null) : startAttempt(quizId),
        ]);
        setQuestions(questionsData);

        if (attemptData) {
          const id = toUuidOrNull(attemptData.id);
          if (!id) {
            throw new Error('Attempt id missing from server response.');
          }
          setAttemptId(id);
          router.replace(`/student/quiz/${quizId}/solve?attemptId=${id}`);
        }
      } catch (err) {
        console.error('Failed to start attempt:', err);
        setError(err instanceof Error ? err.message : 'Failed to start attempt.');
      } finally {
        setLoading(false);
      }
    }

    startQuiz();
  }, [quizId, initialAttemptId, router]);

  // Auto-save answers (debounced)
  useEffect(() => {
    if (!attemptId || Object.keys(answers).length === 0) return;

    const timer = setTimeout(async () => {
      try {
        const answersArray = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
          questionId,
          selectedOptionId,
        }));
        await saveAnswers(attemptId, answersArray);
      } catch (err) {
        console.error('Failed to save answers:', err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [answers, attemptId]);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    const id = toUuidOrNull(attemptId);
    if (!id) {
      setError('Cannot submit: attempt id is not ready yet.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const answersArray = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      }));
      await submitAttempt(id, answersArray);
      router.push(`/student/quiz/result/${id}`);
    } catch (err) {
      console.error('Failed to submit:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit attempt.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container size="quiz">
        <div className="py-16 text-center text-foreground-secondary">Starting quiz...</div>
      </Container>
    );
  }

  if (!attemptId || questions.length === 0) {
    return (
      <Container size="quiz">
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <h1 className="text-h1 text-foreground">Failed to load quiz</h1>
          {error && (
            <p className="max-w-md text-body text-error">{error}</p>
          )}
          <button
            onClick={() => router.back()}
            className="mt-4 inline-block rounded-full bg-accent-500 px-6 py-3 text-body font-semibold text-inverse hover:bg-accent-600"
          >
            Go back
          </button>
        </div>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];
  const canSubmit = toUuidOrNull(attemptId) !== null && !submitting;

  return (
    <Container size="quiz">
      <div className="flex flex-col gap-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-caption uppercase tracking-wide text-muted">Solving</p>
            <h1 className="text-h2 text-foreground">Quiz Attempt</h1>
          </div>
          <button
            onClick={() => router.push('/student/quiz-list')}
            className="rounded-full border border-border bg-surface px-4 py-2 text-small font-semibold text-foreground hover:bg-accent-50"
          >
            Quit
          </button>
        </header>

        <div className="rounded-[20px] border border-border bg-card p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-small text-foreground-secondary">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-small text-foreground-secondary">
              {Object.keys(answers).length} answered
            </span>
          </div>

          <div className="mb-8">
            <span className="mb-2 inline-block rounded-full bg-accent-50 px-3 py-1 text-caption font-semibold text-accent-700">
              {currentQuestion.type === 'MCQ' ? 'Multiple Choice' : 'True / False'}
            </span>
            <h2 className="text-h3 text-foreground">{currentQuestion.text}</h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const optionId = option;
              const isSelected = answers[currentQuestion.id] === optionId;
              return (
                <button
                  key={optionId}
                  onClick={() => handleSelect(currentQuestion.id, optionId)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                    isSelected
                      ? 'border-2 border-accent-500 bg-accent-50'
                      : 'border border-border bg-surface hover:border-accent-200 hover:bg-accent-50'
                  }`}
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-border text-caption font-semibold text-foreground-secondary">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-body text-foreground">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-divider pt-6">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-body font-semibold text-foreground hover:bg-accent-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="rounded-full bg-success px-6 py-2.5 text-body font-semibold text-inverse hover:bg-success/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit quiz'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                className="rounded-full bg-accent-500 px-6 py-2.5 text-body font-semibold text-inverse hover:bg-accent-600"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
