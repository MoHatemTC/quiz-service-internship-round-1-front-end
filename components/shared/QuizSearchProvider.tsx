'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type QuizSearchContextValue = {
  query: string;
  setQuery: (query: string) => void;
};

const QuizSearchContext = createContext<QuizSearchContextValue | null>(null);

export function QuizSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState('');

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
  }, []);

  const value = useMemo(
    () => ({ query, setQuery }),
    [query, setQuery],
  );

  return (
    <QuizSearchContext.Provider value={value}>
      {children}
    </QuizSearchContext.Provider>
  );
}

export function useQuizSearch(): QuizSearchContextValue {
  const context = useContext(QuizSearchContext);
  if (!context) {
    throw new Error('useQuizSearch must be used within QuizSearchProvider');
  }
  return context;
}
