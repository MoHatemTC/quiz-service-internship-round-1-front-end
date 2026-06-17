import { QuizStatus } from '@/types/quiz/admin';
import QuizCardActions from './QuizActions';

type QuizTableRow = {
  id: string;
  title: string;
  activity: string;
  category: string;
  questions: number;
  totalPlays: string;
  status: QuizStatus;
  thumbnailClassName: string;
};

const QUIZZES: QuizTableRow[] = [
  {
    id: 'advanced-calculus-basics',
    title: 'Advanced Calculus Basics',
    activity: 'Updated 2 days ago',
    category: 'Mathematics',
    questions: 20,
    totalPlays: '4,520',
    status: 'PUBLISHED',
    thumbnailClassName: 'from-primary-500 via-info to-background',
  },
  {
    id: 'world-war-two-front',
    title: 'World War II: European Front',
    activity: 'Created 5 hours ago',
    category: 'History',
    questions: 15,
    totalPlays: '0',
    status: 'DRAFT',
    thumbnailClassName: 'from-warning via-card to-background',
  },
  {
    id: 'legacy-python-basics',
    title: 'Legacy Python 2.7 Basics',
    activity: 'Archived 1 month ago',
    category: 'Technology',
    questions: 10,
    totalPlays: '1,200',
    status: 'DRAFT',
    thumbnailClassName: 'from-muted via-primary-900 to-background',
  },
  {
    id: 'contemporary-digital-arts',
    title: 'Contemporary Digital Arts',
    activity: 'Updated yesterday',
    category: 'Design',
    questions: 25,
    totalPlays: '2,890',
    status: 'PUBLISHED',
    thumbnailClassName: 'from-info via-primary-500 to-success',
  },
];

function getStatusClassName(status: QuizStatus) {
  switch (status) {
    case 'PUBLISHED':
      return 'text-success before:bg-success';
    case 'DRAFT':
      return 'text-warning before:bg-warning';
  }
}

function DashboardQuizTable() {
  return (
    <section className="quiz-table-card" aria-label="Quiz table">
      <div className="quiz-table-scroll">
        <table className="quiz-table">
          <thead>
            <tr>
              <th scope="col">Quiz Title</th>
              <th scope="col">Category</th>
              <th scope="col">Questions</th>
              <th scope="col">Total Plays</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {QUIZZES.map((quiz) => (
              <tr key={quiz.id}>
                <td>
                  <div className="quiz-title-cell">
                    <span
                      className={`quiz-thumbnail bg-linear-to-br ${quiz.thumbnailClassName}`}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="quiz-row-title">{quiz.title}</span>
                      <span className="quiz-row-meta">{quiz.activity}</span>
                    </span>
                  </div>
                </td>
                <td>
                  <span className="quiz-category-pill">{quiz.category}</span>
                </td>
                <td className="text-center">{quiz.questions}</td>
                <td>{quiz.totalPlays}</td>
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="quiz-table-footer text-small">
        <p>
          Showing <strong>1 - 4</strong> of <strong>124</strong> quizzes
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
