import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setURlParams(
  url: string | URL,
  params: Record<string, string>
) {
  const srcUrl = url instanceof URL ? url : new URL(url);
  const paramsEntries = Object.entries(params);
  for (const [k, v] of paramsEntries) {
    srcUrl.searchParams.set(k, v);
  }
  return srcUrl.href;
}
