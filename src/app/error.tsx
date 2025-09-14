'use client'; // Error boundaries must be Client Components

import { ErrorComponent } from 'next/dist/client/components/error-boundary';
import { ErrorPage } from '@/components/error-page/error-page';

export default function ErrorBoundary(
  props: React.ComponentProps<ErrorComponent>
) {
  return <ErrorPage {...props} />;
}
