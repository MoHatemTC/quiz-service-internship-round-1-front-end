'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Question } from '@/lib/types/quiz';
import QuestionOption from '@/components/student/QuestionOption';
import QuestionProgress from '@/components/student/QuestionProgress';

type QuestionSolverProps = {
  quizId: string;
  quizTitle: string;
  questions: Question[];
};

const STORAGE_PREFIX = 'quiz-attempt:';
const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuestionSolver({
  quizId,
  quizTitle,
  questions,
}: QuestionSolverProps) {
  const router = useRouter();
  const storageKey = `${STORAGE_PREFIX}${quizId}`;
  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ currentIndex, answers }),
      );
    } catch {
      // ignore quota errors
    }
  }, [storageKey, currentIndex, answers]);

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[currentQuestion.id];

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (isLast) {
      const attemptId = `attempt-${quizId}-${Date.now()}`;
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
      router.push(`/student/quiz/result/${attemptId}`);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleQuit = () => {
    router.push('/student');
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-caption uppercase tracking-wide text-muted">
            Solving
          </p>
          <h1 className="text-h2 text-foreground">{quizTitle}</h1>
        </div>
        <button
          type="button"
          onClick={handleQuit}
          className="inline-flex items-center rounded-xl border border-border bg-surface px-4 py-2 text-small font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Quit
        </button>
      </header>

      <QuestionProgress
        current={currentIndex}
        total={total}
        answeredCount={answeredCount}
      />

      <article className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-2">
          <span className="text-caption uppercase tracking-wide text-muted">
            {currentQuestion.type === 'true_false' ? 'True / False' : 'Multiple choice'}
          </span>
          <h2 className="text-h2 text-foreground">{currentQuestion.prompt}</h2>
        </div>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => (
            <QuestionOption
              key={option.id}
              option={option}
              isSelected={currentAnswer === option.id}
              onSelect={handleSelect}
              optionLabel={optionLabels[idx] ?? String(idx + 1)}
            />
          ))}
        </div>
      </article>

      <footer className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFirst}
          className="inline-flex items-center rounded-xl border border-border bg-surface px-5 py-2.5 text-body font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={answeredCount === 0}
            className="inline-flex items-center rounded-xl bg-success px-5 py-2.5 text-body font-semibold text-white transition-colors duration-150 ease-out hover:bg-success/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit quiz
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-2.5 text-body font-semibold text-white transition-colors duration-150 ease-out hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}
