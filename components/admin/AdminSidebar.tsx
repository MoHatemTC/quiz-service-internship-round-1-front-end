'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Quizzes', href: '/admin/quizzes', icon: '📋' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📊' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#171725] border-r border-[#2D2D42] p-6 h-screen flex flex-col">
      <div className="mb-12">
        <h1 className="text-xl font-bold text-[#8B5CF6] mb-1">QuizMaster</h1>
        <p className="text-xs text-[#A1A1AA]">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A1A1AA] hover:bg-[#1F1F33]'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-[#2D2D42]">
        <p className="text-xs text-[#A1A1AA] text-center">v1.0.0</p>
      </div>
    </aside>
  );
}
