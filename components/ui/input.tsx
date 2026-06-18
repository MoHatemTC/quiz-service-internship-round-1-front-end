import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full rounded-xl border border-border bg-surface px-4 text-body text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-primary-300 focus:ring-2 focus:ring-primary-200/70 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
