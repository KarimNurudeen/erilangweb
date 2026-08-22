import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';

export function InProduction() {
  return (
    <section className="bg-neutral-100 py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 sm:p-12 lg:p-16">
          <ScrollReveal>
          <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Erilang in action</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
            Teams building backends, tools, and data pipelines with one readable language.
          </p>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-10 text-center sm:p-14">
            <p className="text-[13px] font-bold uppercase tracking-wide text-accent-deep">Coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
              We're gathering stories from teams running Erilang in production. Check back soon.
            </p>
          </div>

          <Link
            to="/case-studies"
            className="eri-snake eri-snake-blue mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

            <SnakeBorder radius={999} />
            All case studies
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}
