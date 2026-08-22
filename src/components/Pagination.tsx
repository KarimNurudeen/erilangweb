import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, perPage, total, onChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  if (pageCount <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-ink transition-colors duration-150 ease-eri disabled:opacity-30 enabled:hover:border-ink">

        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="text-[13.5px] text-neutral-600">
        Page {page} of {pageCount}
      </span>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-ink transition-colors duration-150 ease-eri disabled:opacity-30 enabled:hover:border-ink">

        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>);

}
