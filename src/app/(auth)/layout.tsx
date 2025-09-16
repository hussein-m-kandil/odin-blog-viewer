import { getServerAuthData } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getServerAuthData();

  if (user) redirect('/');

  return children;
}
