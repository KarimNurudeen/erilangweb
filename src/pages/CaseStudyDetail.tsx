import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { caseStudies, CaseStudy, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

export function CaseStudyDetail() {
  const { slug = '' } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStudy(null);
    setNotFound(false);
    setError(null);
    caseStudies.
    get(slug).
    then(setStudy).
    catch((err) => {
      if (err instanceof ApiError && err.status === 404) setNotFound(true);else
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    });
  }, [slug]);

  if (notFound) return <Navigate to="/case-studies" replace />;
  if (error) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><ErrorBanner message={error} /></main>;
  if (!study) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><LoadingBanner /></main>;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <Link to="/case-studies" className="text-[13.5px] font-medium text-muted hover:text-white">
        ← All case studies
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[11.5px] font-medium text-muted">
          {study.category}
        </span>
        {study.published_at ?
        <span className="text-[12.5px] text-muted">{format(new Date(study.published_at), 'MMMM d, yyyy')}</span> :
        null}
      </div>

      <div className="mt-5 flex items-center gap-4">
        {study.logo_url ? <img src={study.logo_url} alt="" className="h-8 w-auto" /> : null}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{study.company}</h1>
      </div>

      <blockquote className="mt-8 border-l-2 border-accent/60 pl-6 text-xl leading-relaxed text-white/90 sm:text-2xl">
        “{study.quote}”
      </blockquote>
      <p className="mt-4 text-[14px] text-muted">
        {study.author_name} · {study.author_role}
      </p>

      <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-line bg-surface px-6 py-4">
        <span className="text-3xl font-bold text-accent">{study.metric}</span>
        <span className="text-[14px] text-muted">{study.metric_label}</span>
      </div>

      {study.body ?
      <div className="prose prose-invert mt-10 max-w-none text-[15.5px] leading-relaxed text-white/85 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
          <ReactMarkdown>{study.body}</ReactMarkdown>
        </div> :
      null}
    </main>);

}
