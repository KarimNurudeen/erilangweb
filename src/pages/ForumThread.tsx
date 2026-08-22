import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { forum, ForumThreadDetail, ForumReply, ApiError } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

export function ForumThreadPage() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState<ForumThreadDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const seenIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    setThread(null);
    setError(null);
    forum.
    thread(Number(id)).
    then((res) => {
      setThread(res);
      seenIds.current = new Set(res.replies.map((r) => r.id));
    }).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let es: EventSource | undefined;
    try {
      es = new EventSource(forum.threadEventsUrl(Number(id)));
      es.addEventListener('reply', (e: MessageEvent) => {
        const reply: ForumReply = JSON.parse(e.data);
        if (seenIds.current.has(reply.id)) return;
        seenIds.current.add(reply.id);
        setThread((prev) => prev ? { ...prev, replies: [...prev.replies, reply] } : prev);
      });
    } catch {
      // live updates unavailable; a manual refresh still shows new replies
    }
    return () => es?.close();
  }, [id]);

  const submitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setPostError(null);
    setPosting(true);
    try {
      const reply = await forum.reply(Number(id), replyText.trim());
      if (!seenIds.current.has(reply.id)) {
        seenIds.current.add(reply.id);
        setThread((prev) => prev ? { ...prev, replies: [...prev.replies, reply] } : prev);
      }
      setReplyText('');
    } catch (err) {
      setPostError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setPosting(false);
    }
  };

  if (error) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><ErrorBanner message={error} /></main>;
  if (!thread) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><LoadingBanner /></main>;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <Link to="/forum" className="text-[13.5px] font-medium text-muted hover:text-white">← All threads</Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{thread.title}</h1>

      <ul className="mt-8 flex flex-col gap-6">
        {thread.replies.map((r, i) =>
        <li key={r.id} className={i > 0 ? 'border-t border-line pt-6' : ''}>
            <div className="flex items-start gap-3">
              {r.created_by_avatar_url ?
            <img src={r.created_by_avatar_url} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" /> :

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-[13px] font-bold text-muted">
                  {r.created_by[0]?.toUpperCase()}
                </div>
            }
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-white">
                  {r.created_by_display_name || r.created_by}
                  {i === 0 ?
                <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                      Original post
                    </span> :
                null}
                  <span className="ml-2 font-normal text-muted">
                    {format(new Date(r.created_at), 'MMM d, yyyy p')}
                  </span>
                </p>
                <p className="mt-1.5 whitespace-pre-wrap text-[14.5px] leading-relaxed text-white/85">{r.body}</p>
              </div>
            </div>
          </li>
        )}
      </ul>

      <div className="mt-10 border-t border-line pt-8">
        {user ?
        <form onSubmit={submitReply} className="flex flex-col gap-3">
            {postError ? <ErrorBanner message={postError} /> : null}
            <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply"
            rows={4}
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

            <button
            type="submit"
            disabled={posting || !replyText.trim()}
            className="self-start rounded-full bg-accent px-5 py-2 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft disabled:opacity-50">

              {posting ? 'Posting…' : 'Post reply'}
            </button>
          </form> :

        <p className="text-[14px] text-muted">
            <Link to="/login" className="font-medium text-white underline underline-offset-2">Log in</Link> to
            reply.
          </p>
        }
      </div>
    </main>);

}
