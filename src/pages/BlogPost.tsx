import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { ThumbsUpIcon, ThumbsDownIcon, TrashIcon } from 'lucide-react';
import { blog, BlogPostDetail, BlogComment, ApiError } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<1 | -1 | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setPost(null);
    setError(null);
    blog.
    get(slug).
    then(setPost).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
    blog.comments(slug).then((res) => setComments(res.results)).catch(() => {});
    if (user) {
      blog.myReaction(slug).then((res) => setReaction(res.my_reaction)).catch(() => {});
    }
  }, [slug, user]);

  const react = async (value: 1 | -1) => {
    if (!user || !post) return;
    try {
      const res = await blog.react(slug, value);
      setPost({ ...post, likes: res.likes, dislikes: res.dislikes });
      setReaction(res.my_reaction);
    } catch {
      // ignore -- reaction state just won't update
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentError(null);
    setPosting(true);
    try {
      const comment = await blog.addComment(slug, commentText.trim());
      setComments((prev) => [...prev, comment]);
      setCommentText('');
    } catch (err) {
      setCommentError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setPosting(false);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await blog.deleteComment(slug, id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // ignore
    }
  };

  if (error) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><ErrorBanner message={error} /></main>;
  if (!post) return <main className="mx-auto max-w-page px-5 py-16 lg:px-8"><LoadingBanner /></main>;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <Link to="/blog" className="text-[13.5px] font-medium text-muted hover:text-white">← All posts</Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{post.title}</h1>
      <p className="mt-3 text-[14px] text-muted">
        by {post.author} · {format(new Date(post.published_at), 'MMMM d, yyyy')}
      </p>

      <div className="prose prose-invert mt-8 max-w-none text-[15.5px] leading-relaxed text-white/85 [&_a]:text-accent [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface [&_pre]:p-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        <button
          type="button"
          disabled={!user}
          onClick={() => react(1)}
          title={user ? 'Like' : 'Log in to react'}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-150 ease-eri disabled:opacity-40 ${
          reaction === 1 ? 'border-accent bg-accent/10 text-accent' : 'border-line text-muted hover:text-white'}`
          }>

          <ThumbsUpIcon className="h-4 w-4" aria-hidden="true" />
          {post.likes}
        </button>
        <button
          type="button"
          disabled={!user}
          onClick={() => react(-1)}
          title={user ? 'Dislike' : 'Log in to react'}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-150 ease-eri disabled:opacity-40 ${
          reaction === -1 ? 'border-red-400 bg-red-400/10 text-red-400' : 'border-line text-muted hover:text-white'}`
          }>

          <ThumbsDownIcon className="h-4 w-4" aria-hidden="true" />
          {post.dislikes}
        </button>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-white">Comments</h2>

        {user ?
        <form onSubmit={submitComment} className="mt-4 flex flex-col gap-2">
            {commentError ? <ErrorBanner message={commentError} /> : null}
            <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            rows={3}
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-muted focus:border-accent focus:outline-none" />

            <button
            type="submit"
            disabled={posting || !commentText.trim()}
            className="self-start rounded-full bg-accent px-5 py-2 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft disabled:opacity-50">

              {posting ? 'Posting…' : 'Post comment'}
            </button>
          </form> :

        <p className="mt-3 text-[14px] text-muted">
            <Link to="/login" className="font-medium text-white underline underline-offset-2">Log in</Link> to join
            the discussion.
          </p>
        }

        <ul className="mt-6 flex flex-col gap-5">
          {comments.map((c) =>
          <li key={c.id} className="flex items-start gap-3">
              {c.author_avatar_url ?
            <img src={c.author_avatar_url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" /> :

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-[12px] font-bold text-muted">
                  {c.author[0]?.toUpperCase()}
                </div>
            }
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-white">
                  {c.author_display_name || c.author}
                  <span className="ml-2 font-normal text-muted">
                    {format(new Date(c.created_at), 'MMM d, yyyy')}
                  </span>
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-white/80">{c.body}</p>
              </div>
              {user && (user.username === c.author || user.is_staff) ?
            <button
              type="button"
              onClick={() => deleteComment(c.id)}
              aria-label="Delete comment"
              className="shrink-0 text-muted hover:text-red-400">

                  <TrashIcon className="h-4 w-4" aria-hidden="true" />
                </button> :
            null}
            </li>
          )}
        </ul>
      </section>
    </main>);

}
