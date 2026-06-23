import type { Metadata } from 'next';
import './globals.css';
import { Geist, Inter } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'QnA Service',
  description:
    'The QnA Service is a web-based assessment platform that enables administrators to create, manage, and analyze quizzes for learners',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
