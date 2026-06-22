import CreateQuizForm from '@/components/admin/dashboard/CreateQuizForm';

export default function CreateQuizPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
        <div className="grid gap-2">
          <p className="text-caption uppercase tracking-[0.16em] text-primary-600">Quiz Builder</p>
          <h1 className="text-h1 text-primary-800">Create Quiz</h1>
          <p className="max-w-2xl text-body text-foreground-secondary">
            Build a new assessment with identity, configuration, and question settings in one place.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[1200px]">
          <CreateQuizForm />
        </div>
      </section>
    </main>
  );
}
