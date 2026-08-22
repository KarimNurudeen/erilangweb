import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, PackageIcon, SearchIcon, XIcon } from 'lucide-react';
import { flatDocNav } from '../../data/docs';
import { packages as packagesApi, PackageSummary } from '../../lib/api';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [packageResults, setPackageResults] = useState<PackageSummary[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setPackageResults([]);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const docResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatDocNav.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setPackageResults([]);
      setPackagesLoading(false);
      return;
    }
    setPackagesLoading(true);
    const handle = setTimeout(() => {
      packagesApi.
      search(q, 1, 6).
      then((res) => setPackageResults(res.results)).
      catch(() => setPackageResults([])).
      finally(() => setPackagesLoading(false));
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  if (!open) return null;

  const hasQuery = query.trim().length > 0;
  const hasResults = docResults.length > 0 || packageResults.length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/70 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-raised shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs and packages"
            className="w-full bg-transparent text-[14.5px] text-white placeholder:text-muted focus:outline-none" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded-full p-1 text-muted transition-colors duration-150 ease-eri hover:bg-surface hover:text-white">

            <XIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!hasQuery ?
          <p className="px-3 py-6 text-center text-[13.5px] text-muted">
              Search the documentation and package index.
            </p> :
          null}

          {hasQuery && docResults.length > 0 ?
          <div className="mb-1">
              <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Docs</p>
              <ul>
                {docResults.map((item) =>
              <li key={item.slug}>
                    <Link
                  to={`/docs/${item.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] text-white transition-colors duration-150 ease-eri hover:bg-surface">

                      <FileTextIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div> :
          null}

          {hasQuery && (packagesLoading || packageResults.length > 0) ?
          <div>
              <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                Packages
              </p>
              {packagesLoading ?
            <p className="px-3 py-2.5 text-[13.5px] text-muted">Searching…</p> :

            <ul>
                  {packageResults.map((pkg) =>
              <li key={pkg.name}>
                      <Link
                  to={`/packages/${pkg.name}`}
                  onClick={onClose}
                  className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 transition-colors duration-150 ease-eri hover:bg-surface">

                        <PackageIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[14px] font-medium text-white">{pkg.name}</span>
                          <span className="block truncate text-[12.5px] text-muted">{pkg.description}</span>
                        </span>
                      </Link>
                    </li>
              )}
                </ul>
            }
            </div> :
          null}

          {hasQuery && !packagesLoading && !hasResults ?
          <p className="px-3 py-6 text-center text-[13.5px] text-muted">
              No results for &ldquo;{query}&rdquo;.
            </p> :
          null}
        </div>
      </div>
    </div>);

}
