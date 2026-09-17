import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies, CaseStudy, CaseStudyCategory, ApiError } from '../lib/api';
import { ErrorBanner } from '../components/StatusBanner';
import { Pagination } from '../components/Pagination';
import { SnakeBorder } from '../components/SnakeBorder';

const CATEGORIES: CaseStudyCategory[] = ['Backend', 'Data', 'Tooling', 'Automation', 'Accessibility'];

export function CaseStudies() {
  const [page, setPage] = useState(1);
  const [studies, setStudies] = useState<CaseStudy[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<CaseStudyCategory | 'All'>('All');

  useEffect(() => {
    setStudies(null);
    setError(null);
    setCategory('All');
    caseStudies.
    list(page, 20).
    then((res) => {
      setStudies(res.results);
      setTotal(res.total);
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [page]);

  const filtered = useMemo(() => {
    if (!studies) return [];
    if (category === 'All') return studies;
    return studies.filter((s) => s.category === category);
  }, [studies, category]);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Case studies</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        How teams put Erilang into production: what they replaced, what got simpler, and what changed
        once the code read like plain English.
      </p>

      <div className="mt-12">
        {error ?
        <ErrorBanner message={error} /> :
        !studies ?
        <CaseStudySkeleton /> :
        studies.length === 0 ?

        <section className="rounded-2xl border border-line bg-surface p-10 text-center lg:p-16">
            <p className="text-[13px] font-bold uppercase tracking-wide text-accent">Coming soon</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              We're collecting the first stories
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Case studies from teams running Erilang in production will show up here once they're ready.
              Check back soon.
            </p>
            <Link
            to="/community"
            className="eri-snake eri-snake-blue mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

              <SnakeBorder radius={999} />
              Share your story
            </Link>
          </section> :


        <>
            <div className="flex flex-wrap gap-2">
              {(['All', ...CATEGORIES] as const).map((c) =>
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-150 ease-eri ${
              category === c ?
              'bg-accent text-ink' :
              'border border-line text-muted hover:text-white'}`
              }>

                  {c}
                </button>
            )}
            </div>

            {filtered.length === 0 ?
          <p className="mt-6 rounded-xl border border-line bg-surface p-8 text-center text-[14px] text-muted">
                No {category} case studies yet.
              </p> :

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((study) =>
            <li key={study.slug}>
                    <Link
                to={`/case-studies/${study.slug}`}
                className="eri-snake eri-snake-always group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-150 ease-eri hover:border-accent/60">

                      <SnakeBorder radius={16} />
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-line px-2.5 py-0.5 text-[11.5px] font-medium text-muted">
                          {study.category}
                        </span>
                        {study.logo_url ?
                  <img src={study.logo_url} alt="" className="h-6 w-auto opacity-80" /> :
                  null}
                      </div>
                      <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-white/90">
                        “{study.quote}”
                      </p>
                      <div className="mt-4 flex items-end justify-between gap-3 pt-4">
                        <div>
                          <p className="text-2xl font-bold text-accent">{study.metric}</p>
                          <p className="text-[12px] text-muted">{study.metric_label}</p>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-5 text-[13px] text-muted">
                        <span>{study.company}</span>
                        <span>{study.author_name}</span>
                      </div>
                    </Link>
                  </li>
            )}
              </ul>
          }
          </>
        }
      </div>

      {studies && studies.length > 0 ?
      <Pagination page={page} perPage={20} total={total} onChange={setPage} /> :
      null}
    </main>);

}

function CaseStudySkeleton() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) =>
        <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-raised" />
        )}
      </div>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) =>
        <li key={i} className="animate-pulse rounded-2xl border border-line bg-surface p-6">
            <div className="h-5 w-20 rounded-full bg-raised" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-raised" />
              <div className="h-4 w-full rounded bg-raised" />
              <div className="h-4 w-2/3 rounded bg-raised" />
            </div>
            <div className="mt-6 h-6 w-16 rounded bg-raised" />
          </li>
        )}
      </ul>
    </div>);

}
