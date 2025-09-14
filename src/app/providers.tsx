import { Toaster } from '@/components/ui/sonner';
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
      />
    </ThemeProvider>
  );
}

export default Providers;
