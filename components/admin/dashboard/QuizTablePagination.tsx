'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

function QuizTablePagination({ page, totalPages, hasNextPage, hasPreviousPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(n));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="quiz-pagination" aria-label="Quiz pagination">
      <button
        type="button"
        aria-label="Previous page"
        disabled={!hasPreviousPage}
        onClick={() => goToPage(page - 1)}
      >
        Prev
      </button>

      <button type="button" aria-current={'page'} className={'active'}>
        {page}
      </button>

      <button
        type="button"
        aria-label="Next page"
        disabled={!hasNextPage}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default QuizTablePagination;
