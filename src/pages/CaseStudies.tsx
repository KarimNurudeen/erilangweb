import React from 'react';
import { Link } from 'react-router-dom';
import { SnakeBorder } from '../components/SnakeBorder';

export function CaseStudies() {
  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Case studies</h1>
      <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-white/85">
        How teams put Erilang into production — what they replaced, what got simpler, and what changed
        once the code read like plain English.
      </p>

      <section className="mt-12 rounded-2xl border border-line bg-surface p-10 text-center lg:p-16">
        <p className="text-[13px] font-bold uppercase tracking-wide text-accent">Coming soon</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          We're collecting the first stories
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          Case studies from teams running Erilang in production will show up here once they're ready.
          Check back soon.
        </p>
        <Link
          to="/community"
          className="eri-snake eri-snake-blue mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

          <SnakeBorder radius={999} />
          Share your story
        </Link>
      </section>
    </main>);

}
