import { Toaster } from '@/components/ui/sonner';
import { Loader } from '@/components/loader';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange>
      {children}
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
