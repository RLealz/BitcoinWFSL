import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import QueryProvider from './components/query-provider';

export const metadata: Metadata = {
  title: 'Bitcoin WFSL - Investimentos em Bitcoin',
  description: 'Investimentos em bitcoin com segurança, transparência e resultados comprovados.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen text-white">
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}