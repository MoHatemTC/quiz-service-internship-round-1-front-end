'use client';

function QuizCardActions({ id, title }: { id: string; title: string }) {
  const handlePreview = () => {
    console.log('Preview quiz:', id);
  };

  const handleEdit = () => {
    console.log('Edit quiz:', id);
  };

  const handleDelete = () => {
    console.log('Delete quiz:', id);
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
      <button
        type="button"
        className="quiz-action-button"
        aria-label={`Edit ${title}`}
        onClick={handleEdit}
      >
        Edit
      </button>
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
