import Container from '@/components/shared/Container';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <Container>{children}</Container>
    </div>
  );
}
