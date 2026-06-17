import type { ReactNode } from 'react';

import Card from '@/components/ui/Card';

type QuizEditGeneralInfoProps = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="text-caption uppercase tracking-[0.12em] text-muted">{children}</span>;
}

function QuizEditGeneralInfo({ title, description, startDate, endDate }: QuizEditGeneralInfoProps) {
  return (
    <Card>
      <form className="flex flex-col">
        <div className="border-b border-divider px-6 py-5">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-primary-700"
              aria-hidden="true"
            >
              i
            </span>
            <h2 className="text-h3 text-primary-800">General Info</h2>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6">
          <div className="grid gap-2">
            <FieldLabel>Quiz Title</FieldLabel>
            <input
              type="text"
              defaultValue={title}
              className="h-12 rounded-xl border border-border bg-white px-4 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70"
            />
          </div>

          <div className="grid gap-2">
            <FieldLabel>Description</FieldLabel>
            <textarea
              defaultValue={description}
              rows={4}
              className="min-h-28 resize-none rounded-xl border border-border bg-white px-4 py-3 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <FieldLabel>Start Date</FieldLabel>
              <input
                type="date"
                defaultValue={startDate}
                placeholder="MM/DD/YYYY"
                className="h-12 w-full rounded-xl border border-border bg-white px-4 pl-11 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70"
              />
            </div>

            <div className="grid gap-2">
              <FieldLabel>End Date</FieldLabel>
              <input
                type="date"
                defaultValue={endDate}
                placeholder="MM/DD/YYYY"
                className="h-12 w-full rounded-xl border border-border bg-white px-4 pl-11 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-5 text-small font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/70"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default QuizEditGeneralInfo;
