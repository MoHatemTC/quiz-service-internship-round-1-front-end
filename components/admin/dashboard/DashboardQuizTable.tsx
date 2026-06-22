import { QuizStatus } from '@/types/quiz/admin';
import QuizCardActions from './QuizActions';

type QuizTableRow = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  passingScore: number;
  activity: string;
  category: string;
  questions: number;
  totalPlays: string;
  status: QuizStatus;
  thumbnailClassName: string;
};

export const QUIZZES: QuizTableRow[] = [
  {
    id: 'advanced-calculus-basics',
    title: 'Advanced Calculus Basics',
    description:
      'A focused practice quiz covering differential and integral calculus fundamentals for advanced learners.',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    durationMinutes: 60,
    passingScore: 70,
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
    description:
      'A historical assessment covering major events, strategies, and turning points of the European theater.',
    startDate: '2026-07-10',
    endDate: '2026-07-24',
    durationMinutes: 45,
    passingScore: 60,
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
    description:
      'An introductory quiz about Python 2.7 syntax, legacy language features, and maintenance considerations.',
    startDate: '2026-06-15',
    endDate: '2026-06-30',
    durationMinutes: 30,
    passingScore: 50,
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
    description:
      'A creative quiz exploring modern digital art tools, trends, and visual storytelling techniques.',
    startDate: '2026-05-01',
    endDate: '2026-05-20',
    durationMinutes: 90,
    passingScore: 75,
    activity: 'Updated yesterday',
    category: 'Design',
    questions: 25,
    totalPlays: '2,890',
    status: 'PUBLISHED',
    thumbnailClassName: 'from-info via-primary-500 to-success',
  },
  {
    id: 'advanced-thermodynamics-ii',
    title: 'Advanced Thermodynamics II',
    description:
      'An in-depth assessment focusing on the second law of thermodynamics, entropy cycles, and real-world engine efficiency calculations for senior engineering students.',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    durationMinutes: 120,
    passingScore: 80,
    activity: 'Updated 2 hours ago',
    category: 'Engineering',
    questions: 24,
    totalPlays: '1,040',
    status: 'PUBLISHED',
    thumbnailClassName: 'from-primary-500 via-info to-background',
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

function DashboardQuizTable({
  filter,
  search,
}: {
  filter: string | undefined;
  search: string;
}) {
  const normalizedSearch = search.toLowerCase();
  const filteredQuizzes = QUIZZES.filter((q) => {
    const matchesStatus = filter === 'all' ? true : q.status === filter;
    const matchesSearch =
      normalizedSearch === '' || q.title.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

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
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
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
          Showing <strong>{filteredQuizzes.length}</strong> of <strong>{QUIZZES.length}</strong> quizzes
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
