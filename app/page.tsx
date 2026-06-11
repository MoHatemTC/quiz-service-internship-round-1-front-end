import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F17] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#8B5CF6] mb-4">QuizMaster</h1>
          <p className="text-xl text-[#A1A1AA]">
            A comprehensive quiz platform for academic assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/analytics"
            className="block p-6 bg-[#1F1F33] border border-[#2D2D42] rounded-lg hover:border-[#8B5CF6] transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-2">
              Admin Dashboard
            </h2>
            <p className="text-[#A1A1AA]">
              View analytics, manage quizzes, and track student performance
            </p>
          </Link>

          <Link
            href="/admin/quizzes"
            className="block p-6 bg-[#1F1F33] border border-[#2D2D42] rounded-lg hover:border-[#8B5CF6] transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-2">
              Quiz Management
            </h2>
            <p className="text-[#A1A1AA]">
              Create, edit, and organize your quizzes
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="block p-6 bg-[#1F1F33] border border-[#2D2D42] rounded-lg hover:border-[#8B5CF6] transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👥</div>
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-2">
              User Management
            </h2>
            <p className="text-[#A1A1AA]">
              Manage students, instructors, and system users
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="block p-6 bg-[#1F1F33] border border-[#2D2D42] rounded-lg hover:border-[#8B5CF6] transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-2">
              Settings
            </h2>
            <p className="text-[#A1A1AA]">
              Configure system settings and preferences
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

