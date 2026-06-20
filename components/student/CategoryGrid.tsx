import Link from 'next/link';

type Category = {
  name: string;
  count: number;
  emoji: string;
  accent: 'accent' | 'secondary' | 'support' | 'primary';
};

const CATEGORIES: Category[] = [
  { name: 'Computer Science', count: 4, emoji: '💻', accent: 'accent' },
  { name: 'Mathematics', count: 2, emoji: '📐', accent: 'secondary' },
  { name: 'Cognitive Science', count: 1, emoji: '🧠', accent: 'support' },
  { name: 'Wellness', count: 1, emoji: '🌿', accent: 'primary' },
];

const accentStyles: Record<Category['accent'], string> = {
  accent: 'bg-accent-50 text-accent-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  support: 'bg-support-100 text-support-800',
  primary: 'bg-primary-50 text-primary-700',
};

export default function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 id="categories-heading" className="text-h2 text-foreground">
          Featured categories
        </h2>
        <Link
          href="/student/quiz-list"
          className="text-small font-medium text-accent-600 transition-colors duration-150 ease-out hover:text-accent-700"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href="/student/quiz-list"
            className="group flex flex-col gap-3 rounded-[20px] border border-border bg-card p-5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            <span
              aria-hidden
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg ${accentStyles[cat.accent]}`}
            >
              {cat.emoji}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-body font-semibold text-foreground">
                {cat.name}
              </p>
              <p className="text-caption text-foreground-secondary">
                {cat.count} {cat.count === 1 ? 'course' : 'courses'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
