'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteAdminQuiz } from '@/lib/api/admin/quizzes';

function QuizCardActions({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  const handlePreview = () => {
    console.log('Preview quiz:', id);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    await deleteAdminQuiz(id);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="quiz-action-button"
        aria-label={`View ${title}`}
        onClick={handlePreview}
      >
        View
      </button>
      <Link
        href={`/admin/dashboard/edit/${id}`}
        className="quiz-action-button"
        aria-label={`Edit ${title}`}
      >
        Edit
      </Link>
      <button
        type="button"
        className="quiz-action-button danger"
        aria-label={`Delete ${title}`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
}

export default QuizCardActions;
