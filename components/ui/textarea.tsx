import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-28 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
