import { QuizCardProps } from '@/types';
import Badge from '../ui/Badge';
import QuizCardActions from './QuizCardActions';

function QuizCard({ id, title, description, status }: QuizCardProps) {
  return (
    <article className="p-3 rounded-md bg-card flex flex-col">
      <div className="flex flex-col gap-2 items-start flex-1">
        <Badge variant={status} />
        <p className="text-body text-primary-200">{title}</p>
        <p className="text-caption">{description}</p>
      </div>
      <QuizCardActions id={id} />
    </article>
  );
}

export default QuizCard;
