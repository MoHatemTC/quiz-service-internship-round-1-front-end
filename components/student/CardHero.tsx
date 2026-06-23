import type { QuizDifficulty } from '@/types/quiz/quiz';

type CardHeroProps = {
  category: string;
  difficulty: QuizDifficulty;
};

const difficultyClass = 'bg-[rgba(15,23,42,0.55)] text-inverse';

function MeshPattern() {
  return (
    <svg
      aria-hidden
      width="100%"
      height="100%"
      viewBox="0 0 320 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full opacity-70"
    >
      <defs>
        <pattern
          id="cs-mesh"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="20" r="1.5" fill="#92B7EC" />
          <line
            x1="20"
            y1="20"
            x2="60"
            y2="20"
            stroke="#5D81EA"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="60"
            stroke="#5D81EA"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="320" height="160" fill="url(#cs-mesh)" />
    </svg>
  );
}

function GlowBlobs() {
  return (
    <>
      <div
        aria-hidden
        className="absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-2xl"
        style={{ background: 'radial-gradient(circle, #4382DF 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute -right-10 bottom-0 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: 'radial-gradient(circle, #5859BC 0%, transparent 70%)' }}
      />
    </>
  );
}

export default function CardHero({ category, difficulty }: CardHeroProps) {
  return (
    <div className="relative h-40 overflow-hidden rounded-t-[20px] bg-gradient-to-br from-primary-800 via-primary-900 to-[#040C24]">
      <GlowBlobs />
      <MeshPattern />
      <div className="relative z-10 flex items-start justify-between p-4">
        <span className="inline-flex items-center rounded-full bg-support-100 px-3 py-1 text-caption font-semibold uppercase tracking-wide text-support-800">
          {category}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold uppercase tracking-wide ${difficultyClass}`}
        >
          {difficulty}
        </span>
      </div>
    </div>
  );
}
