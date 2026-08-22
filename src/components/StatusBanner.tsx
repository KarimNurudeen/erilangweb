import React from 'react';
import { AlertCircleIcon, LoaderIcon } from 'lucide-react';

export function LoadingBanner({ label = 'Loading…' }: {label?: string;}) {
  return (
    <div className="flex items-center gap-2 py-10 text-[14px] text-neutral-500">
      <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
      {label}
    </div>);

}

export function ErrorBanner({ message }: {message: string;}) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
      <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>);

}

export function EmptyBanner({ message }: {message: string;}) {
  return (
    <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center text-[14px] text-neutral-500">
      {message}
    </p>);

}
