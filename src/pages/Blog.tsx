import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { blog, BlogPostSummary, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner, EmptyBanner } from '../components/StatusBanner';
import { Pagination } from '../components/Pagination';

export function Blog() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPosts(null);
    setError(null);
    blog.
    list(page, 12).
    then((res) => {
      setPosts(res.results);
      setTotal(res.total);
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [page]);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        Releases, language notes, and updates from the Erilang team.
      </p>

      <div className="mt-10">
        {error ?
        <ErrorBanner message={error} /> :
        !posts ?
        <LoadingBanner /> :
        posts.length === 0 ?
        <EmptyBanner message="No posts yet — check back soon." /> :

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) =>
          <li key={post.slug}>
                <Link
              to={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-150 ease-eri hover:border-accent/60">

                  <span className="text-[12.5px] text-muted">
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </span>
                  <span className="mt-2 text-[17px] font-semibold leading-snug text-white">{post.title}</span>
                  <span className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{post.excerpt}</span>
                  <span className="mt-auto pt-4 text-[13px] text-muted">by {post.author}</span>
                </Link>
              </li>
          )}
          </ul>
        }
      </div>

      {posts ? <Pagination page={page} perPage={12} total={total} onChange={setPage} /> : null}
    </main>);

}
