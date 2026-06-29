import { QuizData, QuizStatus } from '@/types/quiz/admin';
import QuizCardActions from './QuizActions';

function getStatusClassName(status: QuizStatus) {
  switch (status) {
    case 'PUBLISHED':
      return 'text-success before:bg-success';
    case 'DRAFT':
      return 'text-warning before:bg-warning';
    case 'CLOSED':
      return 'text-destructive before:bg-destructive';
    case 'ARCHIVED':
      return 'text-muted-foreground before:bg-muted-foreground';
  }
}

function DashboardQuizTable({ data }: { data: QuizData[] }) {
  const filteredQuizzes = data;

  return (
    <section className="quiz-table-card" aria-label="Quiz table">
      <div className="quiz-table-scroll">
        <table className="quiz-table">
          <thead>
            <tr>
              <th scope="col">Quiz Title</th>
              {/* <th scope="col">Category</th> */}
              {/* <th scope="col">Questions</th> */}
              {/* <th scope="col">Total Plays</th> */}
              <th scope="col">Status</th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td>
                    <div className="quiz-title-cell">
                      {/* <span
                        className={`quiz-thumbnail bg-linear-to-br ${quiz.thumbnailClassName}`}
                        aria-hidden="true"
                      /> */}
                      <span>
                        <span className="quiz-row-title">{quiz.title}</span>
                        {/* <span className="quiz-row-meta">{quiz.activity}</span> */}
                      </span>
                    </div>
                  </td>
                  {/* <td><span className="quiz-category-pill">{quiz.category}</span></td> */}
                  {/* <td className="text-center">{quiz.questions}</td> */}
                  {/* <td>{quiz.totalPlays}</td> */}
                  <td>
                    <span className={`quiz-status ${getStatusClassName(quiz.status)}`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td>
                    <div className="quiz-table-actions">
                      <QuizCardActions id={quiz.id} title={quiz.title} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-small text-muted-foreground">
                  No quizzes match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="quiz-table-footer text-small">
        <p>
          Showing <strong>{filteredQuizzes.length}</strong> of{' '}
          <strong>{filteredQuizzes.length}</strong> quizzes
        </p>
        <div className="quiz-pagination" aria-label="Quiz pagination">
          <button type="button" aria-label="Previous page">
            Prev
          </button>
          <button type="button" aria-current="page" className="active">
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button" aria-label="Next page">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default DashboardQuizTable;
