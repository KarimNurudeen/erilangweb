import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { DownloadIcon, CopyIcon } from 'lucide-react';
import { releases, ReleaseDetail, ReleaseSummary, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

const OS_LABELS: Record<string, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux'
};

export function Releases() {
  const [latest, setLatest] = useState<ReleaseDetail | null>(null);
  const [history, setHistory] = useState<ReleaseSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    releases.
    latest().
    then(setLatest).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
    releases.list(1, 20).then((res) => setHistory(res.results)).catch(() => setHistory([]));
  }, []);

  const copy = (assetId: number, value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(assetId);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const groupedAssets = latest?.assets.reduce<Record<string, typeof latest.assets>>((acc, asset) => {
    (acc[asset.os_type] ||= []).push(asset);
    return acc;
  }, {}) || {};

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

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(groupedAssets).map(([os, assets]) =>
            <div key={os}>
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                    {OS_LABELS[os] || os}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {assets.map((asset) =>
                asset.kind === 'command' ?
                <li key={asset.id}>
                          <button
                    type="button"
                    onClick={() => copy(asset.id, asset.value || '')}
                    className="flex w-full items-center justify-between gap-2 rounded-lg bg-ink px-3.5 py-2.5 text-left font-mono text-[13px] text-white/90 transition-colors duration-150 ease-eri hover:bg-neutral-800">

                            <span className="truncate">{asset.value}</span>
                            <CopyIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </button>
                          {copied === asset.id ?
                  <p className="mt-1 text-[11.5px] text-accent">Copied!</p> :
                  <p className="mt-1 text-[11.5px] text-muted">{asset.label}</p>
                  }
                        </li> :

                <li key={asset.id}>
                          <a
                    href={releases.assetDownloadUrl(asset.id)}
                    className="flex items-center justify-between gap-2 rounded-lg border border-line px-3.5 py-2.5 text-[13.5px] text-white transition-colors duration-150 ease-eri hover:border-accent">

                            {asset.label}
                            <DownloadIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        </li>

                )}
                  </ul>
                </div>
            )}
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
