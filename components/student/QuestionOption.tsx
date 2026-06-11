'use client';

import type { QuestionOption as QuestionOptionType } from '@/lib/types/quiz';

type QuestionOptionProps = {
  option: QuestionOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  optionLabel: string;
};

export default function QuestionOption({
  option,
  isSelected,
  onSelect,
  optionLabel,
}: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-body transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
        isSelected
          ? 'border-primary-500 bg-primary-600 text-white'
          : 'border-border bg-surface text-foreground hover:border-primary-400 hover:bg-primary-900/30'
      }`}
    >
      <span
        aria-hidden
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-caption font-semibold ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-card text-foreground-secondary'
        }`}
      >
        {optionLabel}
      </span>
      <span className="leading-relaxed">{option.text}</span>
    </button>
  );
}
