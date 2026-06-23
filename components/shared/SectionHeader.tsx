type SectionHeaderProps = {
  title: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
};

export default function SectionHeader({
  title,
  searchPlaceholder = 'Search courses...',
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-h2 text-foreground">{title}</h2>
      <div className="flex items-center gap-3">
        <label className="relative flex flex-1 items-center sm:flex-none">
          <span className="sr-only">Search</span>
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 text-foreground-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-small text-foreground placeholder:text-muted focus-visible:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:w-64"
          />
        </label>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-small font-semibold text-foreground transition-colors duration-150 ease-out hover:border-accent-200 hover:bg-accent-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="6" y1="12" x2="18" y2="12" />
            <line x1="9" y1="18" x2="15" y2="18" />
          </svg>
          Filters
        </button>
      </div>
    </div>
  );
}
