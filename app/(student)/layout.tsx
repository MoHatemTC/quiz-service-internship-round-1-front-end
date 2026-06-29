import TopNav from '@/components/shared/TopNav';
import { QuizSearchProvider } from '@/components/shared/QuizSearchProvider';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizSearchProvider>
      <div className="flex min-h-full flex-col">
        <TopNav />
        <div className="flex-1">{children}</div>
      </div>
    </QuizSearchProvider>
  );
}
