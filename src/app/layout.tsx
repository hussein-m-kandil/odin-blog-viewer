import './globals.css';
import { getBaseAuthData } from '@/lib/auth';
import { Providers } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: process.env.NEXT_PUBLIC_APP_NAME || '',
  },
  description: 'A front-end web app for viewing blog posts.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseAuthData = await getBaseAuthData();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers initAuthData={baseAuthData}>
          <div className='container mx-auto px-4'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
