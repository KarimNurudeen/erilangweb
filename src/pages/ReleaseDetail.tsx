import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { releases, ReleaseDetail as ReleaseDetailType, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

export function ReleaseDetail() {
  const { version = '' } = useParams();
  const [release, setRelease] = useState<ReleaseDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRelease(null);
    setError(null);
    releases.
    get(version).
    then(setRelease).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [version]);

  if (error) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><ErrorBanner message={error} /></main>;
  if (!release) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><LoadingBanner /></main>;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <Link to="/releases" className="text-[13.5px] font-medium text-muted hover:text-white">← All releases</Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{release.title}</h1>
      <p className="mt-3 text-[14px] text-muted">
        v{release.version} · {format(new Date(release.published_at), 'MMMM d, yyyy')}
      </p>

      <div className="prose prose-invert mt-8 max-w-none text-[15.5px] leading-relaxed text-white/85 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        <ReactMarkdown>{release.description}</ReactMarkdown>
      </div>
    </main>);

}
