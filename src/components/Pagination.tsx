import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

function getPageItems(current: number, count: number): PageItem[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);

  const keep = new Set<number>([1, count, current]);
  if (current - 1 >= 1) keep.add(current - 1);
  if (current + 1 <= count) keep.add(current + 1);

  const sorted = Array.from(keep).sort((a, b) => a - b);
  const items: PageItem[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push('ellipsis');
    items.push(p);
  });
  return items;
}

export function Pagination({ page, perPage, total, onChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  if (pageCount <= 1) return null;

  const items = getPageItems(page, pageCount);

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-white transition-colors duration-150 ease-eri disabled:opacity-30 enabled:hover:border-accent/60">

        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>

      {items.map((item, i) =>
      item === 'ellipsis' ?
      <span key={`ellipsis-${i}`} className="px-1 text-[13px] text-muted" aria-hidden="true">
          …
        </span> :

      <button
        key={item}
        type="button"
        onClick={() => onChange(item)}
        aria-current={item === page ? 'page' : undefined}
        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-[13.5px] font-medium transition-colors duration-150 ease-eri ${
        item === page ?
        'bg-accent text-ink' :
        'text-muted hover:text-white'}`
        }>

          {item}
        </button>

      )}

      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-white transition-colors duration-150 ease-eri disabled:opacity-30 enabled:hover:border-accent/60">

        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>);

}
