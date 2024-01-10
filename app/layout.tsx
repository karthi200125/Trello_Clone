import type { Metadata } from 'next';
import './globals.css';
import { SiteConfig } from '@/config/site';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: `%s | ${SiteConfig.name}`,
  },
  description: SiteConfig.description,
  icons: [
    {
      url: '/logo.png',
      href: '/logo.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
