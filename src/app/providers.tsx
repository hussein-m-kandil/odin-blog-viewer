import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/sonner';
import { Loader } from '@/components/loader';
import { ThemeProvider } from 'next-themes';
import { BaseAuthData } from '@/types';

export function Providers({
  initAuthData: initAuthData,
  children,
}: {
  initAuthData: BaseAuthData;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange>
      <AuthProvider initAuthData={initAuthData}>{children}</AuthProvider>
      <Toaster
        expand
        richColors
        closeButton
        visibleToasts={3}
        style={{ pointerEvents: 'auto' }}
        icons={{ loading: <Loader size={18} /> }}
      />
    </ThemeProvider>
  );
}

export default Providers;
