import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, DownloadIcon } from 'lucide-react';
import { packages as packagesApi, PackageSummary, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner, EmptyBanner } from '../components/StatusBanner';
import { Pagination } from '../components/Pagination';

export function Packages() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'updated' | 'downloads'>('updated');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<PackageSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResults(null);
    setError(null);
    const req = query.trim() ?
    packagesApi.search(query.trim(), page, 20) :
    packagesApi.browse({ sort, page, per_page: 20 });

    req.
    then((res) => {
      setResults(res.results);
      setTotal(res.total);
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [query, sort, page]);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Packages</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        Publish and discover libraries with the built-in package manager.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="flex max-w-md flex-1 items-center gap-2.5 rounded-full border border-line px-4 py-2.5">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {setQuery(e.target.value);setPage(1);}}
            placeholder="Search packages"
            className="w-full bg-transparent text-[14px] text-white placeholder:text-muted focus:outline-none" />

        </label>
        {!query.trim() ?
        <select
          value={sort}
          onChange={(e) => {setSort(e.target.value as 'updated' | 'downloads');setPage(1);}}
          className="rounded-full border border-line bg-transparent px-4 py-2.5 text-[13.5px] text-white focus:outline-none">

            <option value="updated" className="bg-ink">Recently updated</option>
            <option value="downloads" className="bg-ink">Most downloaded</option>
          </select> :
        null}
      </div>

      <div className="mt-8">
        {error ?
        <ErrorBanner message={error} /> :
        !results ?
        <LoadingBanner /> :
        results.length === 0 ?
        <EmptyBanner message="No packages found." /> :

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) =>
          <li key={pkg.name}>
                <Link
              to={`/packages/${pkg.name}`}
              className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors duration-150 ease-eri hover:border-accent/60">

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[15px] font-semibold text-white">{pkg.name}</span>
                    <span className="shrink-0 text-[12.5px] text-muted">
                      {pkg.latest ? `v${pkg.latest}` : 'No versions yet'}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-muted">{pkg.description}</p>
                  {pkg.download_count !== undefined ?
              <p className="mt-auto flex items-center gap-1.5 pt-4 text-[12.5px] text-muted">
                      <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {pkg.download_count.toLocaleString()}
                    </p> :
              null}
                </Link>
              </li>
          )}
          </ul>
        }
      </div>

      {results ? <Pagination page={page} perPage={20} total={total} onChange={setPage} /> : null}
    </main>);

}
