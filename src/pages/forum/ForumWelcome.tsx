import React from 'react';
import { MessagesSquareIcon } from 'lucide-react';

export function ForumWelcome() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-raised text-accent">
        <MessagesSquareIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-[15px] font-semibold text-white">Select a thread</p>
      <p className="max-w-xs text-[13.5px] leading-relaxed text-muted">
        Pick a conversation on the left to start reading, or start a new one.
      </p>
    </div>);

}
