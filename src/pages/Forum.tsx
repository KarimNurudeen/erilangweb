import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { forum, ForumThreadSummary, ApiError } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { LoadingBanner, ErrorBanner, EmptyBanner } from '../components/StatusBanner';
import { Pagination } from '../components/Pagination';

export function Forum() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [threads, setThreads] = useState<ForumThreadSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [liveBanner, setLiveBanner] = useState(false);

  const [showNewThread, setShowNewThread] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    forum.
    threads(page, 20).
    then((res) => {
      setThreads(res.results);
      setTotal(res.total);
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  };

  useEffect(() => {
    setThreads(null);
    load();
  }, [page]);

  useEffect(() => {
    let es: EventSource | undefined;
    try {
      es = new EventSource(forum.globalEventsUrl());
      es.addEventListener('new_thread', () => setLiveBanner(true));
    } catch {
      // real-time updates just won't show up; the list is still usable via reload
    }
    return () => es?.close();
  }, []);

  const submitThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPostError(null);
    setPosting(true);
    try {
      const thread = await forum.createThread(title.trim(), body.trim());
      navigate(`/forum/${thread.id}`);
    } catch (err) {
      setPostError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Forum</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
            Long-form questions, design discussion, and RFC feedback.
          </p>
        </div>
        {user ?
        <button
          type="button"
          onClick={() => setShowNewThread((v) => !v)}
          className="rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

            {showNewThread ? 'Cancel' : 'New thread'}
          </button> :

        <Link
          to="/login"
          className="rounded-full border border-line px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 ease-eri hover:border-accent hover:text-accent">

            Log in to post
          </Link>
        }
      </div>

      {showNewThread ?
      <form onSubmit={submitThread} className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6">
          {postError ? <ErrorBanner message={postError} /> : null}
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread title"
          required
          className="rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

          <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          required
          className="rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

          <button
          type="submit"
          disabled={posting}
          className="self-start rounded-full bg-accent px-5 py-2 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft disabled:opacity-50">

            {posting ? 'Posting…' : 'Post thread'}
          </button>
        </form> :
      null}

      {liveBanner ?
      <button
        type="button"
        onClick={() => {load();setLiveBanner(false);}}
        className="mt-6 w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-2.5 text-[13.5px] font-medium text-accent">

          New activity — click to refresh
        </button> :
      null}

      <div className="mt-8">
        {error ?
        <ErrorBanner message={error} /> :
        !threads ?
        <LoadingBanner /> :
        threads.length === 0 ?
        <EmptyBanner message="No threads yet — start the first one." /> :

        <ul className="flex flex-col divide-y divide-line border-y border-line">
            {threads.map((t) =>
          <li key={t.id}>
                <Link
              to={`/forum/${t.id}`}
              className="flex items-center gap-3 py-4 transition-colors duration-150 ease-eri hover:bg-white/[0.03]">

                  {t.created_by_avatar_url ?
              <img src={t.created_by_avatar_url} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" /> :

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-[13px] font-bold text-muted">
                      {t.created_by[0]?.toUpperCase()}
                    </div>
              }
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{t.title}</p>
                    <p className="text-[13px] text-muted">
                      {t.created_by_display_name || t.created_by} ·{' '}
                      {formatDistanceToNow(new Date(t.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  <span className="shrink-0 text-[13px] text-muted">
                    {t.reply_count} repl{t.reply_count === 1 ? 'y' : 'ies'}
                  </span>
                </Link>
              </li>
          )}
          </ul>
        }
      </div>

      {threads ? <Pagination page={page} perPage={20} total={total} onChange={setPage} /> : null}
    </main>);

}
