import './globals.css';
import { AuthProvider } from '@/context/auth-context';

export const metadata = {
  title: 'LC79 Tactical VMS',
  description: 'Industrial-grade vehicle management for Sri Lanka',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
