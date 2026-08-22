import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, XIcon } from 'lucide-react';
import { SnakeBorder } from '../SnakeBorder';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-accent text-ink">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 pr-11 py-2.5 text-center text-[13px] font-semibold sm:px-14 sm:text-sm">
        <span>Erilang 1.0 is here — a declarative, English-like language, ready to read.</span>
        <Link to="/docs" className="inline-flex items-center gap-1 whitespace-nowrap underline underline-offset-4">
          Read the guide
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="eri-snake eri-snake-blue absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink/70 transition-colors duration-150 ease-eri hover:bg-ink/10 hover:text-ink sm:right-3">

        <SnakeBorder radius={4} />
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>);

}