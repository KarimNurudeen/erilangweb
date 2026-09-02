import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeftIcon, SendIcon } from 'lucide-react';
import { forum, ForumThreadDetail, ForumReply, ApiError } from '../../lib/api';
import { useAuth } from '../../lib/AuthContext';
import { LoadingBanner, ErrorBanner } from '../../components/StatusBanner';

export function ForumThreadView() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState<ForumThreadDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const seenIds = useRef<Set<number>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

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
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [thread?.replies.length]);

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

  if (error) {
    return (
      <div className="flex flex-1 flex-col p-6">
        <BackLink />
        <div className="mt-4"><ErrorBanner message={error} /></div>
      </div>);

  }
  if (!thread) {
    return (
      <div className="flex flex-1 flex-col p-6">
        <BackLink />
        <div className="mt-4"><LoadingBanner /></div>
      </div>);

  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-line bg-raised px-4 py-3">
        <Link
          to="/forum"
          aria-label="Back to all threads"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-eri hover:bg-raised hover:text-white md:hidden">

          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-white">{thread.title}</p>
          <p className="truncate text-[12px] text-muted">
            {thread.reply_count} repl{thread.reply_count === 1 ? 'y' : 'ies'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
        {thread.replies.map((r, i) => {
          const mine = !!user && r.created_by === user.username;
          return (
            <div key={r.id} className={`flex items-end gap-2.5 ${mine ? 'flex-row-reverse' : ''}`}>
              {r.created_by_avatar_url ?
              <img
                src={r.created_by_avatar_url}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full object-cover" /> :


              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-raised text-[11px] font-bold text-muted">
                  {r.created_by[0]?.toUpperCase()}
                </div>
              }
              <div className={`flex max-w-[75%] flex-col ${mine ? 'items-end' : 'items-start'}`}>
                <div className="mb-1 flex items-center gap-1.5 px-1 text-[11.5px] text-muted">
                  <span className="font-medium text-white/80">
                    {r.created_by_display_name || r.created_by}
                  </span>
                  {i === 0 ?
                  <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                      Started it
                    </span> :
                  null}
                  <span>{formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}</span>
                </div>
                <div
                  className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm shadow-black/20 ${
                  mine ?
                  'rounded-br-sm bg-accent text-ink' :
                  'rounded-bl-sm border border-line bg-raised text-white/90'}`
                  }>

                  {r.body}
                </div>
              </div>
            </div>);

        })}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-line bg-raised p-3">
        {postError ? <div className="mb-2"><ErrorBanner message={postError} /></div> : null}
        {user ?
        <form onSubmit={submitReply} className="flex items-end gap-2">
            <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitReply(e);
              }
            }}
            placeholder="Write a message…"
            rows={1}
            className="max-h-32 min-h-[42px] flex-1 resize-none rounded-2xl border border-line bg-surface px-4 py-2.5 text-[14px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

            <button
            type="submit"
            disabled={posting || !replyText.trim()}
            aria-label="Send"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft disabled:opacity-40">

              <SendIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </form> :

        <p className="px-1 text-[13.5px] text-muted">
            <Link to="/login" className="font-medium text-white underline underline-offset-2">Log in</Link> to
            reply.
          </p>
        }
      </div>
    </div>);

}

function BackLink() {
  return (
    <Link to="/forum" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted hover:text-white">
      <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
      All threads
    </Link>);

}
