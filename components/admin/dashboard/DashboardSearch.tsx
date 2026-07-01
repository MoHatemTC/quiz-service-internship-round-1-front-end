'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';

const SEARCH_PARAM = 'search';

function DashboardSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const nextValue = searchParams.get(SEARCH_PARAM) ?? '';
    if (inputRef.current && inputRef.current.value !== nextValue) {
      inputRef.current.value = nextValue;
    }
  }, [searchParams]);

  const updateSearch = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue.trim() === '') {
      params.delete(SEARCH_PARAM);
    } else {
      params.set(SEARCH_PARAM, nextValue);
    }
    params.delete('page');

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <label className="relative w-full max-w-md">
      <span className="sr-only">Search quizzes by title</span>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        defaultValue={searchParams.get(SEARCH_PARAM) ?? ''}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => updateSearch(nextValue), 300);
        }}
        placeholder="Search quizzes"
        aria-label="Search quizzes by title"
        className="pl-11"
      />
    </label>
  );
}

export default DashboardSearch;
