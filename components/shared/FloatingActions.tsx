type IconButtonProps = {
  label: string;
  children: React.ReactNode;
};

function IconButton({ label, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors duration-150 ease-out hover:bg-divider hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      {children}
    </button>
  );
}

export default function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
        <IconButton label="Filter">
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
            aria-hidden
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </IconButton>
        <IconButton label="Sort">
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
            aria-hidden
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="9" y2="18" />
          </svg>
        </IconButton>
        <IconButton label="Edit">
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
            aria-hidden
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
