import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { releases, ReleaseDetail, ReleaseSummary, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';
import { ReleaseAssets } from '../components/ReleaseAssets';

export function Releases() {
  const [latest, setLatest] = useState<ReleaseDetail | null>(null);
  const [history, setHistory] = useState<ReleaseSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    releases.
    latest().
    then(setLatest).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
    releases.list(1, 20).then((res) => setHistory(res.results)).catch(() => setHistory([]));
  }, []);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Install Erilang</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        Pick your platform below to get the latest release.
      </p>

      {error ?
      <div className="mt-8"><ErrorBanner message={error} /></div> :
      !latest ?
      <div className="mt-8"><LoadingBanner /></div> :

      <>
          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold text-white">Erilang {latest.version}</h2>
              <span className="text-[13px] text-muted">
                Released {format(new Date(latest.published_at), 'MMMM d, yyyy')}
              </span>
            </div>

            <div className="mt-6">
              <ReleaseAssets assets={latest.assets} />
            </div>
          </div>

          <div className="prose prose-invert mt-10 max-w-none text-[15px] leading-relaxed text-white/85 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
            <ReactMarkdown>{latest.description}</ReactMarkdown>
          </div>
        </>
      }

      <h2 className="mt-16 text-2xl font-bold text-white">Release history</h2>
      {history === null ?
      <LoadingBanner /> :

      <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
          {history.map((r) =>
        <li key={r.version} className="flex items-center justify-between gap-2 py-4">
              <Link to={`/releases/${r.version}`} className="font-semibold text-white hover:underline">
                {r.title}
              </Link>
              <span className="text-[13px] text-muted">
                v{r.version} · {format(new Date(r.published_at), 'MMM d, yyyy')}
              </span>
            </li>
        )}
        </ul>
      }
    </main>);

}
