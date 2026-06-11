# Admin Analytics Dashboard Frontend

## Overview

The admin analytics dashboard is a Next.js application that displays quiz metrics and student attempt analytics. It consumes the backend analytics API endpoints and presents the data in a dark-themed, responsive UI.

## Project Structure

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Home/dashboard entry point
├── globals.css               # Global Tailwind styles
└── admin/
    ├── layout.tsx            # Admin layout with sidebar
    ├── analytics/
    │   └── page.tsx          # Analytics dashboard page
    ├── quizzes/
    │   └── page.tsx          # Quiz management (placeholder)
    ├── users/
    │   └── page.tsx          # User management (placeholder)
    └── settings/
        └── page.tsx          # Settings (placeholder)

components/
├── common/
│   ├── MetricCard.tsx        # Reusable metric card component
│   └── PageHeader.tsx        # Page header with title/description
└── admin/
    ├── AdminSidebar.tsx      # Left navigation sidebar
    ├── MetricsGrid.tsx       # Grid of metric cards
    └── QuizAttemptsTable.tsx # Quiz attempts table

lib/
└── api.ts                    # API client for backend endpoints

types/
└── analytics.ts              # TypeScript types for analytics data
```

## Key Features

### 1. **Dashboard Metrics**
- Total Quizzes
- Total Students
- Total Attempts
- Average Score

### 2. **Quiz Attempts Viewer**
- Filter by quiz ID
- View student attempts with scores
- Formatted timestamps for submission dates

### 3. **Admin Navigation**
- Sidebar navigation with route groups
- Active route highlighting
- Quick access to different admin sections

### 4. **Responsive Design**
- Mobile-first responsive layout
- Dark theme with purple accent color (#8B5CF6)
- Smooth transitions and hover states

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:3000/api`

### Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create `.env.local` in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

For production, update the URL to your deployed backend.

3. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

4. **Build for production:**
```bash
npm run build
npm run start
```

## API Integration

The dashboard connects to the backend analytics endpoints:

### Endpoints Used

- **GET /api/analytics** — Fetch dashboard summary metrics
  - Returns: `DashboardSummary` object with totalQuizzes, totalStudents, totalAttempts, averageScore

- **GET /api/analytics/quizzes/:quizId/attempts** — Fetch quiz attempts
  - Returns: `QuizAttemptsResponse` object with quiz details and attempt list

See `lib/api.ts` for implementation details.

## Component Documentation

### MetricCard
Displays a single metric with label, value, optional icon, and trend indicator.

```tsx
<MetricCard
  label="Total Quizzes"
  value={124}
  icon="📋"
  trend={{ value: 12, direction: 'up' }}
/>
```

### PageHeader
Displays a page title, description, and optional action button.

```tsx
<PageHeader
  title="Analytics"
  description="View system-wide analytics and metrics"
  action={<button>Export</button>}
/>
```

### AdminSidebar
Navigation sidebar with links to admin sections. Uses Next.js `usePathname` for active route highlighting.

### MetricsGrid
Grid layout for dashboard metrics with loading states.

### QuizAttemptsTable
Data table showing quiz attempt details with styling and hover effects.

## Styling

The project uses **Tailwind CSS v4** with a custom dark theme:

- **Background:** #0F0F17
- **Surface:** #171725
- **Card:** #1F1F33
- **Primary Text:** #F4F4F5
- **Secondary Text:** #A1A1AA
- **Accent (Purple):** #8B5CF6

All colors are defined inline in component classes. For a global theme config, see `app/globals.css`.

## Development Tips

### Adding New Admin Pages

1. Create a new directory under `app/admin/`:
```bash
mkdir app/admin/my-page
touch app/admin/my-page/page.tsx
```

2. Use the `PageHeader` and design system:
```tsx
import PageHeader from '@/components/common/PageHeader';

export default function MyPage() {
  return (
    <div>
      <PageHeader
        title="My Page"
        description="Description here"
      />
      {/* Page content */}
    </div>
  );
}
```

The sidebar will automatically add navigation to the new page if you update `navItems` in `AdminSidebar.tsx`.

### Handling API Errors

The analytics page includes error handling and displays error messages. Add error handling to new API calls:

```tsx
try {
  const data = await fetchAnalyticsDashboard();
  // handle data
} catch (err) {
  setError(err instanceof Error ? err.message : 'Failed to load');
}
```

### Loading States

Use the `isLoading` prop to show skeleton loaders while fetching data:

```tsx
<MetricsGrid data={summary} isLoading={isLoadingSummary} />
```

## Troubleshooting

### "Cannot GET /api/analytics"
- Ensure backend is running on `http://localhost:3000`
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify `AnalyticsModule` is imported in backend `AppModule`

### CORS Issues
- Backend must have CORS enabled for `http://localhost:3000`
- Check backend Express configuration

### Components Not Loading
- Ensure path aliases (`@/*`) are set up in `tsconfig.json`
- Clear `.next` build cache: `rm -rf .next`

## Next Steps

- [ ] Add authentication and role-based access control
- [ ] Implement quiz management CRUD operations
- [ ] Add user management interface
- [ ] Create data export/reporting features
- [ ] Add real-time analytics updates with WebSockets
- [ ] Implement dark/light theme toggle
- [ ] Add advanced filtering and sorting for attempts table

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hooks Guide](https://react.dev/reference/react/hooks)

