'use client';

function QuizCardActions({ id }: { id: string }) {
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
    <div className="flex justify-between gap-2 mt-4 pt-4 border-t border-border">
      <button
        onClick={handlePreview}
        className="flex-1 px-3 py-2 rounded bg-border hover:bg-primary-700 text-primary-200 hover:text-white text-sm font-medium transition"
      >
        Preview
      </button>
      <button
        onClick={handleEdit}
        className="flex-1 px-3 py-2 rounded bg-border hover:bg-primary-600 hover:text-white text-primary-200 text-sm font-medium transition"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className=" px-3 py-2 rounded bg-border hover:bg-error text-primary-200 hover:text-white text-sm font-medium transition"
      >
        Delete
      </button>
    </div>
  );
}

export default QuizCardActions;
