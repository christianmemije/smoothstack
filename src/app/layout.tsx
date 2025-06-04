import type { Metadata } from 'next';
import { Kode_Mono } from 'next/font/google';
import '../css/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const font = Kode_Mono({
  variable: '--font',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Smoothstack',
  description: 'Smoothstack',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
