import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { blog, BlogPostSummary } from '../../lib/api';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function LatestNews() {
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const listRef = useScrollReveal<HTMLUListElement>();

  useEffect(() => {
    blog.
    list(1, 4).
    then((res) => setPosts(res.results)).
    catch(() => setPosts([]));
  }, []);

  if (posts && posts.length === 0) return null;

  return (
    <section className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl shadow-black/40 sm:p-12 lg:p-16">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Latest news</h2>
          </ScrollReveal>

          <ul ref={listRef} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(posts || Array.from({ length: 4 })).map((post, i) =>
            <li key={post ? post.slug : i} className="h-full">
                {post ?
              <Link
                to={`/blog/${post.slug}`}
                className="eri-snake eri-snake-always group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-raised p-5 transition-colors duration-150 ease-eri hover:border-accent/60">

                    <SnakeBorder radius={12} />
                    <span className="text-[12.5px] text-muted">
                      {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    </span>
                    <span className="mt-2 text-[16px] font-semibold leading-snug text-white">
                      {post.title}
                    </span>
                    <span className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted">
                      {post.excerpt}
                    </span>
                    <span className="mt-auto pt-4 text-[13px] text-muted">by {post.author}</span>
                  </Link> :

              <div className="h-full animate-pulse rounded-xl border border-line bg-raised p-5">
                    <div className="h-3 w-20 rounded bg-surface" />
                    <div className="mt-3 h-4 w-full rounded bg-surface" />
                    <div className="mt-2 h-4 w-2/3 rounded bg-surface" />
                  </div>
              }
              </li>
            )}
          </ul>

          <Link
            to="/blog"
            className="eri-snake eri-snake-blue mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:border-white">

            <SnakeBorder radius={999} />
            Erilang blog
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>);

}