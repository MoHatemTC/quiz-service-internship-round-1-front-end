import TopNav from '@/components/shared/TopNav';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <TopNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
