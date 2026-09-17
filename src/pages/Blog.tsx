import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowUpRightIcon,
  Code2Icon,
  FlameIcon,
  HeartIcon,
  LayersIcon,
  SearchIcon,
  SparklesIcon,
  TerminalIcon } from
'lucide-react';
import { blog, BlogPostSummary, ApiError } from '../lib/api';
import { ErrorBanner, EmptyBanner } from '../components/StatusBanner';
import { Pagination } from '../components/Pagination';
import { NewsletterForm } from '../components/NewsletterForm';
import { SnakeBorder } from '../components/SnakeBorder';

const COVERS = [
{ cls: 'eri-cover-0', Icon: Code2Icon },
{ cls: 'eri-cover-1', Icon: TerminalIcon },
{ cls: 'eri-cover-2', Icon: SparklesIcon },
{ cls: 'eri-cover-3', Icon: LayersIcon }];


function coverFor(index: number) {
  return COVERS[index % COVERS.length];
}

export function Blog() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setPosts(null);
    setError(null);
    setQuery('');
    blog.
    list(page, 12).
    then((res) => {
      setPosts(res.results);
      setTotal(res.total);
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [page]);

  const featured = posts && posts.length > 0 ? posts[0] : null;

  const topReads = useMemo(() => {
    if (!posts) return [];
    return posts.
    filter((post) => post.slug !== featured?.slug).
    slice().
    sort((a, b) => b.likes - a.likes).
    slice(0, 3);
  }, [posts, featured]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
      post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        Releases, language notes, and updates from the Erilang team.
      </p>

      <div className="mt-12">
        {error ?
        <ErrorBanner message={error} /> :
        !posts ?
        <BlogSkeleton /> :
        posts.length === 0 ?
        <EmptyBanner message="No posts yet. Check back soon." /> :

        <>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured ?
            <Link
              to={`/blog/${featured.slug}`}
              className="eri-snake eri-snake-always group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-150 ease-eri hover:border-accent/60 lg:col-span-2">

                  <SnakeBorder radius={16} />
                  {(() => {
                const cover = coverFor(0);
                return (
                  <div
                    className={`relative flex h-56 items-center justify-center sm:h-64 ${cover.cls}`}>

                        <cover.Icon className="h-16 w-16 text-white/25" aria-hidden="true" />
                        <span className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
                          Latest
                        </span>
                      </div>);

              })()}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="text-[12.5px] text-muted">
                      {formatDistanceToNow(new Date(featured.published_at), { addSuffix: true })} · by {featured.author}
                    </span>
                    <span className="mt-3 text-2xl font-bold leading-snug text-white sm:text-[28px]">
                      {featured.title}
                    </span>
                    <span className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">
                      {featured.excerpt}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-accent">
                      Read more
                      <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link> :
            null}

              <div className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-5">
                <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-muted">
                  <FlameIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  Top reads
                </div>
                {topReads.length === 0 ?
              <p className="text-[13.5px] text-muted">More posts coming soon.</p> :

              <ul className="flex flex-col divide-y divide-line">
                    {topReads.map((post, i) => {
                  const cover = coverFor(i + 1);
                  return (
                    <li key={post.slug} className="py-3 first:pt-0 last:pb-0">
                        <Link to={`/blog/${post.slug}`} className="group flex gap-3">
                          <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${cover.cls}`}>

                            <cover.Icon className="h-5 w-5 text-white/40" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-2 text-[13.5px] font-medium leading-snug text-white transition-colors duration-150 ease-eri group-hover:text-accent">
                              {post.title}
                            </p>
                            <p className="mt-1 text-[12px] text-muted">
                              {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                            </p>
                          </div>
                        </Link>
                      </li>);

                })}
                  </ul>
              }
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-white">
                All posts <span className="font-normal text-muted">({filtered.length})</span>
              </h2>
              <div className="relative w-full sm:w-72">
                <SearchIcon
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true" />

                <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search this page…"
                className="w-full rounded-full border border-line bg-raised py-2.5 pl-10 pr-4 text-[13.5px] text-white placeholder:text-muted focus:border-accent/60 focus:outline-none" />

              </div>
            </div>

            {filtered.length === 0 ?
          <p className="mt-6 rounded-xl border border-line bg-surface p-8 text-center text-[14px] text-muted">
                No posts match “{query}”.
              </p> :

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => {
              const cover = coverFor(i);
              return (
                <li key={post.slug}>
                    <Link
                    to={`/blog/${post.slug}`}
                    className="eri-snake eri-snake-always group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-150 ease-eri hover:border-accent/60">

                      <SnakeBorder radius={16} />
                      <div className={`flex h-36 items-center justify-center ${cover.cls}`}>
                        <cover.Icon className="h-10 w-10 text-white/25" aria-hidden="true" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-[12.5px] text-muted">
                          {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                        </span>
                        <span className="mt-2 text-[17px] font-semibold leading-snug text-white">
                          {post.title}
                        </span>
                        <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">
                          {post.excerpt}
                        </span>
                        <div className="mt-auto flex items-center justify-between pt-5 text-[13px] text-muted">
                          <span>by {post.author}</span>
                          {post.likes > 0 ?
                        <span className="inline-flex items-center gap-1">
                              <HeartIcon className="h-3.5 w-3.5" aria-hidden="true" />
                              {post.likes}
                            </span> :
                        null}
                        </div>
                      </div>
                    </Link>
                  </li>);

            })}
              </ul>
          }

            <div className="mt-16 rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-5">
                  <img
                  src="/robot-mascot.png"
                  alt=""
                  aria-hidden="true"
                  className="hidden h-24 w-auto shrink-0 sm:block" />

                  <div>
                    <h2 className="text-2xl font-bold text-white">Get new posts by email</h2>
                    <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
                      Release notes and language updates, sent when there's something worth
                      reading. No spam.
                    </p>
                  </div>
                </div>
                <NewsletterForm dark className="w-full sm:w-auto sm:min-w-[22rem]" />
              </div>
            </div>
          </>
        }
      </div>

      {posts && posts.length > 0 ?
      <Pagination page={page} perPage={12} total={total} onChange={setPage} /> :
      null}
    </main>);

}

function BlogSkeleton() {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface lg:col-span-2">
          <div className="h-56 bg-raised sm:h-64" />
          <div className="space-y-3 p-6 sm:p-8">
            <div className="h-3 w-32 rounded bg-raised" />
            <div className="h-6 w-3/4 rounded bg-raised" />
            <div className="h-4 w-full rounded bg-raised" />
            <div className="h-4 w-2/3 rounded bg-raised" />
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5">
          {Array.from({ length: 3 }).map((_, i) =>
          <div key={i} className="flex animate-pulse gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-raised" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-full rounded bg-raised" />
                <div className="h-3 w-2/3 rounded bg-raised" />
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) =>
        <li key={i} className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="h-36 bg-raised" />
            <div className="space-y-2 p-6">
              <div className="h-3 w-24 rounded bg-raised" />
              <div className="h-4 w-full rounded bg-raised" />
              <div className="h-4 w-2/3 rounded bg-raised" />
            </div>
          </li>
        )}
      </ul>
    </div>);

}
