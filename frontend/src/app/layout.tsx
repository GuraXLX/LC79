import './globals.css';
import { AuthProvider } from '@/context/auth-context';

export const metadata = {
  title: 'VANGUARD FLEET',
  description: 'Premium Fleet Command & Control System',
};

import { LanguageProvider } from '@/context/language-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
