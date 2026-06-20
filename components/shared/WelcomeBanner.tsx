type WelcomeBannerProps = {
  name?: string;
  subtitle?: string;
};

export default function WelcomeBanner({
  name = 'Alex',
  subtitle = 'Stay on top of your upcoming assessments and track your progress.',
}: WelcomeBannerProps) {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-primary-800 via-primary-900 to-[#040C24] px-8 py-7 text-inverse shadow-[0_16px_48px_rgba(15,23,42,0.18)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 28%, rgba(67, 130, 223, 0.55) 0%, transparent 42%), radial-gradient(circle at 82% 72%, rgba(86, 89, 188, 0.4) 0%, transparent 45%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 opacity-25 sm:block"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 40%, rgba(67, 130, 223, 0.4) 60%, transparent 80%)',
        }}
      />
      <div className="relative flex flex-col gap-2">
        <h1
          id="welcome-heading"
          className="text-h1 text-inverse"
        >
          Welcome back, {name} <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-2xl text-body text-inverse-secondary">{subtitle}</p>
      </div>
    </section>
  );
}
