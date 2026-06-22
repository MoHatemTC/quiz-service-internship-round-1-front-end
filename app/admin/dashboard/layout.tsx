import AdminSidebar from '@/components/admin/dashboard/AdminSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background lg:flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 min-h-screen">{children}</div>
    </div>
  );
}
