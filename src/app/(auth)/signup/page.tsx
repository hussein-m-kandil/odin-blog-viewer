import { AuthPage } from '@/components/auth-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: `Create a new ${process.env.NEXT_PUBLIC_APP_NAME} account.`,
  title: 'Sign Up',
};

export default function Signup() {
  return <AuthPage pageType='signup' />;
}
