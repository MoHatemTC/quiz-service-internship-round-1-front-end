import { INTEGRITY_RULES } from '@/lib/mocks/integrity';

const severityBorder: Record<string, string> = {
  info: 'border-info',
  warning: 'border-warning',
  danger: 'border-error',
};

const severityIcon: Record<string, string> = {
  info: 'bg-info/15 text-info',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-error/15 text-error',
};

export default function QuizRules() {
  return (
    <section
      aria-labelledby="quiz-rules-heading"
      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
    >
      <div>
        <h2 id="quiz-rules-heading" className="text-h3 text-foreground">
          Before you start
        </h2>
        <p className="text-caption text-muted">
          Integrity rules for this attempt
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {INTEGRITY_RULES.map((rule) => (
          <li
            key={rule.id}
            className={`flex items-start gap-3 rounded-lg border ${severityBorder[rule.severity]} bg-card px-3 py-2.5 text-small text-foreground`}
          >
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base ${severityIcon[rule.severity]}`}
            >
              {rule.icon}
            </span>
            <span className="leading-relaxed">{rule.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
