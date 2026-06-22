'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookCopy, CircleDashed, Plus, Settings2, SquarePen } from 'lucide-react';

import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CreateQuizFormInput, CreateQuizFormValues, createQuizSchema } from '@/lib/validation';

const DEFAULT_VALUES: CreateQuizFormInput = {
  title: '',
  description: '',
  visibilityStatus: 'DRAFT',
  durationMinutes: 60,
  passingScore: 50,
  startDate: '',
  endDate: '',
};

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-7 w-7 place-items-center rounded-full bg-primary-50 text-primary-700"
        aria-hidden="true"
      >
        {icon}
      </span>
      <h2 className="text-h3 text-primary-800">{title}</h2>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-small text-error">{message}</p>;
}

function CreateQuizForm() {
  const form = useForm<CreateQuizFormInput, undefined, CreateQuizFormValues>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const visibility = form.watch('visibilityStatus');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const statusOptions = [
    { key: 'DRAFT', label: 'Draft' },
    { key: 'PUBLISHED', label: 'Published' },
  ] as const;

  const onSubmit = handleSubmit((values) => {
    console.log('Create quiz payload:', values);
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <Card className="overflow-hidden">
        <div className="border-b border-divider px-6 py-5">
          <SectionTitle icon={<BookCopy className="h-4 w-4" />} title="Quiz Identity" />
        </div>

        <div className="grid gap-5 px-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="title" className=" uppercase tracking-[0.12em] ">
              Quiz Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Advanced Calculus Final Examination"
              aria-invalid={Boolean(errors.title)}
              {...register('title')}
            />
            <FieldError message={errors.title?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the learning outcomes and scope of this assessment..."
              aria-invalid={Boolean(errors.description)}
              {...register('description')}
            />
            <FieldError message={errors.description?.message} />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-divider px-6 py-5">
          <SectionTitle icon={<Settings2 className="h-4 w-4" />} title="Configuration" />
        </div>

        <div className="grid gap-6 px-6 py-6">
          <div className="grid gap-2">
            <Label>Visibility Status</Label>
            <div className="rounded-2xl border border-border bg-surface p-1">
              <div className="grid grid-cols-2 gap-1">
                {statusOptions.map((option) => {
                  const isActive = visibility === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        setValue('visibilityStatus', option.key, { shouldValidate: true });
                      }}
                      className={cn(
                        'rounded-xl px-4 py-3 text-small font-medium transition-colors duration-150',
                        isActive
                          ? 'bg-primary-800 text-white'
                          : 'text-foreground-secondary hover:bg-primary-50 hover:text-primary-800'
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <FieldError message={errors.visibilityStatus?.message} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="durationMinutes">Duration (min)</Label>
              <Input
                id="durationMinutes"
                type="number"
                min={1}
                step={1}
                placeholder="60"
                aria-invalid={Boolean(errors.durationMinutes)}
                {...register('durationMinutes')}
              />
              <FieldError message={errors.durationMinutes?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <Input
                id="passingScore"
                type="number"
                min={0}
                max={100}
                step={1}
                placeholder="70"
                aria-invalid={Boolean(errors.passingScore)}
                {...register('passingScore')}
              />
              <FieldError message={errors.passingScore?.message} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Starts At</Label>
              <Input
                id="startDate"
                type="date"
                aria-invalid={Boolean(errors.startDate)}
                {...register('startDate')}
              />
              <FieldError message={errors.startDate?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate">Ends At</Label>
              <Input
                id="endDate"
                type="date"
                aria-invalid={Boolean(errors.endDate)}
                {...register('endDate')}
              />
              <FieldError message={errors.endDate?.message} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-divider px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <SectionTitle icon={<CircleDashed className="h-4 w-4" />} title="Questions" />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-primary-200 bg-white text-primary-800 hover:bg-primary-50 hover:text-primary-900"
            >
              <Plus className="h-4 w-4" />
              Add New Question
            </Button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-primary-50/40 px-6 py-14 text-center">
            <div className="grid gap-4">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface text-primary-700 shadow-sm">
                <SquarePen className="h-5 w-5" />
              </div>
              <div className="grid gap-2">
                <h3 className="text-h3 text-primary-800">No questions yet</h3>
                <p className="max-w-md text-small text-foreground-secondary">
                  Start building your assessment by adding multiple choice, true/false, or
                  open-ended questions.
                </p>
              </div>
              <div>
                <Button
                  type="button"
                  className="rounded-full bg-primary-800 px-6 text-white hover:bg-primary-700"
                >
                  <Plus className="h-4 w-4" />
                  Create First Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="rounded-full bg-primary-800 px-6 text-white hover:bg-primary-700"
          disabled={isSubmitting}
        >
          Save Quiz
        </Button>
      </div>
    </form>
  );
}

export default CreateQuizForm;
