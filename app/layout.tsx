import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import '@/src/index.css';

export const metadata = {
  title: 'AppForGex Digital Showcase',
  description: 'Comprehensive training portal with modern technology stack',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
