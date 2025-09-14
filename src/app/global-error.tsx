'use client'; // Error boundaries must be Client Components

import './globals.css';
import { ErrorComponent } from 'next/dist/client/components/error-boundary';
import { ErrorPage } from '@/components/error-page/error-page';

export default function GlobalErrorBoundary(
  props: React.ComponentProps<ErrorComponent>
) {
  // global-error must include html and body tags
  return (
    <html>
      <body>
        <ErrorPage
          {...props}
          className='my-0 flex min-h-screen flex-col justify-center items-center'
        />
      </body>
    </html>
  );
}
