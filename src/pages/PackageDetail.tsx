import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { DownloadIcon } from 'lucide-react';
import { packages as packagesApi, PackageDetail as PackageDetailType, PackageVersion, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';
import { useAuth } from '../lib/AuthContext';

export function PackageDetail() {
  const { name = '' } = useParams();
  const { user } = useAuth();
  const [pkg, setPkg] = useState<PackageDetailType | null>(null);
  const [versions, setVersions] = useState<PackageVersion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [yanking, setYanking] = useState<string | null>(null);
  const [yankError, setYankError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    packagesApi.
    get(name).
    then(setPkg).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
    packagesApi.versions(name).then((res) => setVersions(res.versions)).catch(() => setVersions([]));
  };

  useEffect(() => {
    setPkg(null);
    setVersions(null);
    load();
  }, [name]);

  const onYank = async (version: string) => {
    const reason = window.prompt(`Reason for yanking v${version}?`);
    if (!reason) return;
    setYankError(null);
    setYanking(version);
    try {
      await packagesApi.yank(name, version, reason);
      load();
    } catch (err) {
      setYankError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setYanking(null);
    }
  };

  if (error) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><ErrorBanner message={error} /></main>;
  if (!pkg) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><LoadingBanner /></main>;

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <Link to="/packages" className="text-[13.5px] font-medium text-muted hover:text-white">← All packages</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">{pkg.description}</p>
          <p className="mt-3 text-[13.5px] text-muted">
            by{' '}
            <Link to={`/users/${pkg.owner}`} className="font-medium text-white underline underline-offset-2">
              {pkg.owner}
            </Link>{' '}
            · {pkg.download_count.toLocaleString()} downloads · updated{' '}
            {format(new Date(pkg.updated_at), 'MMMM d, yyyy')}
          </p>
          {pkg.tags.length > 0 ?
          <div className="mt-3 flex flex-wrap gap-2">
              {pkg.tags.map((tag) =>
            <span key={tag} className="rounded-full bg-surface px-3 py-1 text-[12.5px] text-muted">
                  {tag}
                </span>
            )}
            </div> :
          null}
        </div>
        {pkg.latest ?
        <a
          href={packagesApi.downloadUrl(pkg.name, pkg.latest)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

            <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            Download v{pkg.latest}
          </a> :
        <span className="shrink-0 rounded-full border border-line px-6 py-3 text-[14px] font-medium text-muted">
            No versions published yet
          </span>
        }
      </div>

      <h2 className="mt-12 text-lg font-bold text-white">Versions</h2>
      {yankError ? <div className="mt-4"><ErrorBanner message={yankError} /></div> : null}
      {versions === null ?
      <LoadingBanner /> :

      <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
          {versions.map((v) =>
        <li key={v.version} className="flex flex-wrap items-center justify-between gap-2 py-4">
              <div>
                <span className="font-mono text-[14.5px] font-medium text-white">v{v.version}</span>
                {v.yanked ?
            <span className="ml-2 rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-400">
                    Yanked{v.yanked_reason ? `: ${v.yanked_reason}` : ''}
                  </span> :
            null}
                <span className="ml-2 text-[13px] text-muted">
                  {format(new Date(v.published_at), 'MMM d, yyyy')} · {v.download_count.toLocaleString()} downloads
                </span>
              </div>
              <div className="flex items-center gap-4">
                {user && user.username === pkg.owner && !v.yanked ?
            <button
              type="button"
              onClick={() => onYank(v.version)}
              disabled={yanking === v.version}
              className="text-[13px] font-medium text-red-400 hover:underline disabled:opacity-60">

                    {yanking === v.version ? 'Yanking…' : 'Yank'}
                  </button> :
            null}
                <a
              href={packagesApi.downloadUrl(pkg.name, v.version)}
              className="text-[13px] font-medium text-accent hover:underline">

                  Download
                </a>
              </div>
            </li>
        )}
        </ul>
      }
    </main>);

}
