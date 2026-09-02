import React from 'react';
import { Link } from 'react-router-dom';
import { MessagesSquareIcon, PenSquareIcon } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useForumOutletContext } from './ForumLayout';

export function ForumWelcome() {
  const { user } = useAuth();
  const { openCompose } = useForumOutletContext();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-accent">
        <MessagesSquareIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-[15px] font-semibold text-white">Select a thread</p>
      <p className="max-w-xs text-[13.5px] leading-relaxed text-muted">
        Pick a conversation on the left to start reading, or start a new one.
      </p>
      {user ?
      <button
        type="button"
        onClick={openCompose}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

          <PenSquareIcon className="h-4 w-4" aria-hidden="true" />
          Start a new thread
        </button> :

      <Link
        to="/login"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 ease-eri hover:border-accent hover:text-accent">

          Log in to start a thread
        </Link>
      }
    </div>);

}
