import React, { useEffect, useState } from 'react';
import { Link, Outlet, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { PenSquareIcon, XIcon } from 'lucide-react';
import { forum, ForumThreadSummary, ApiError } from '../../lib/api';
import { useAuth } from '../../lib/AuthContext';
import { LoadingBanner, ErrorBanner, EmptyBanner } from '../../components/StatusBanner';
import { Pagination } from '../../components/Pagination';

interface ForumOutletContext {
  openCompose: () => void;
}

export function useForumOutletContext() {
  return useOutletContext<ForumOutletContext>();
}

export function ForumLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const threadMatch = useMatch('/forum/:id');
  const activeId = threadMatch?.params.id ? Number(threadMatch.params.id) : null;

  const [page, setPage] = useState(1);
  const [threads, setThreads] = useState<ForumThreadSummary[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [composing, setComposing] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    let es: EventSource | undefined;
    try {
      es = new EventSource(forum.globalEventsUrl());
      es.addEventListener('new_thread', () => {
        if (page === 1) load();
      });
    } catch {
      // real-time updates just won't show up; the list is still usable via reload
    }
    return () => es?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const submitThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPostError(null);
    setPosting(true);
    try {
      const thread = await forum.createThread(title.trim(), body.trim());
      setComposing(false);
      setTitle('');
      setBody('');
      navigate(`/forum/${thread.id}`);
    } catch (err) {
      setPostError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setPosting(false);
    }
  };

  const showSidebar = activeId === null;

  return (
    <main className="mx-auto flex w-full max-w-page flex-col px-0 py-0 lg:px-8 lg:py-8">
      <div className="flex h-[70vh] min-h-[520px] max-h-[780px] w-full overflow-hidden border-white/10 bg-[#0a2540] shadow-2xl shadow-black/40 lg:rounded-2xl lg:border">
        {/* Sidebar — conversation list */}
        <aside
          className={`w-full shrink-0 flex-col border-white/10 bg-[#123252] md:w-[340px] md:border-r ${
          showSidebar ? 'flex' : 'hidden md:flex'}`
          }>

          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3.5">
            <h1 className="text-[17px] font-bold text-white">Forum</h1>
            {user ?
            <button
              type="button"
              onClick={() => setComposing((v) => !v)}
              aria-label={composing ? 'Cancel new thread' : 'Start a new thread'}
              className="flex h-8 w-8 items-center justify-center rounded-full text-accent transition-colors duration-150 ease-eri hover:bg-white/10">

                {composing ? <XIcon className="h-4 w-4" /> : <PenSquareIcon className="h-4 w-4" />}
              </button> :
            <Link
              to="/login"
              className="rounded-full border border-white/15 px-3 py-1 text-[12.5px] font-semibold text-white transition-colors duration-150 ease-eri hover:border-accent hover:text-accent">

                Log in
              </Link>
            }
          </div>

          {composing ?
          <form onSubmit={submitThread} className="flex flex-col gap-2.5 border-b border-white/10 bg-[#0a2540] p-4">
              {postError ? <ErrorBanner message={postError} /> : null}
              <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Thread title"
              required
              autoFocus
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

              <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              required
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

              <button
              type="submit"
              disabled={posting}
              className="self-start rounded-full bg-accent px-4 py-1.5 text-[12.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft disabled:opacity-50">

                {posting ? 'Posting…' : 'Start thread'}
              </button>
            </form> :
          null}

          <div className="flex-1 overflow-y-auto">
            {error ?
            <div className="p-4"><ErrorBanner message={error} /></div> :
            !threads ?
            <div className="p-4"><LoadingBanner /></div> :
            threads.length === 0 ?
            <div className="p-4"><EmptyBanner message="No threads yet. Start the first one." /></div> :

            <ul className="flex flex-col divide-y divide-white/10">
                {threads.map((t) =>
              <li key={t.id}>
                    <Link
                  to={`/forum/${t.id}`}
                  className={`flex items-center gap-3 border-l-2 py-3 pl-[14px] pr-4 transition-colors duration-150 ease-eri ${
                  activeId === t.id ?
                  'border-accent bg-accent/10' :
                  'border-transparent hover:bg-white/[0.04]'}`
                  }>

                      {t.created_by_avatar_url ?
                  <img src={t.created_by_avatar_url} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" /> :

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold text-white/70">
                          {t.created_by[0]?.toUpperCase()}
                        </div>
                  }
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold text-white">{t.title}</p>
                        <p className="truncate text-[12.5px] text-muted">
                          {t.created_by_display_name || t.created_by} · {t.reply_count} repl
                          {t.reply_count === 1 ? 'y' : 'ies'}
                        </p>
                      </div>
                      <span className="shrink-0 self-start text-[11px] text-muted">
                        {formatDistanceToNow(new Date(t.updated_at), { addSuffix: true })}
                      </span>
                    </Link>
                  </li>
              )}
              </ul>
            }
          </div>

          {threads && threads.length > 0 ?
          <div className="border-t border-white/10 px-2 py-1">
              <Pagination page={page} perPage={20} total={total} onChange={setPage} />
            </div> :
          null}
        </aside>

        {/* Active conversation */}
        <section className={`min-w-0 flex-1 flex-col ${showSidebar ? 'hidden md:flex' : 'flex'}`}>
          <Outlet context={{ openCompose: () => setComposing(true) }} />
        </section>
      </div>
    </main>);

}
