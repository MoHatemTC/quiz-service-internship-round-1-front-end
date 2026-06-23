type Stat = {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
};

const STATS: Stat[] = [
  {
    label: 'Quizzes taken',
    value: '12',
    hint: 'this term',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: 'Average score',
    value: '78%',
    hint: '+6% vs last term',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    label: 'Active streak',
    value: '5d',
    hint: 'keep it going',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    label: 'Hours studied',
    value: '24h',
    hint: 'this term',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section aria-label="Your stats" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map((stat) => (
        <article
          key={stat.label}
          className="flex flex-col gap-2 rounded-[20px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-caption uppercase tracking-wide text-muted">
              {stat.label}
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              {stat.icon}
            </span>
          </div>
          <p className="text-h1 text-foreground">{stat.value}</p>
          {stat.hint && (
            <p className="text-caption text-foreground-secondary">{stat.hint}</p>
          )}
        </article>
      ))}
    </section>
  );
}
