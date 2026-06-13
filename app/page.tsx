import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/dashboard');
  return <h1 className="text-display">Hello from nextJS</h1>;
}
