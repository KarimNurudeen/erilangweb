import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';

export function EffectBanner() {
  return (
    <section className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl shadow-black/40 sm:p-12 lg:p-16">
          <ScrollReveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Code that explains itself
              </h2>
              <p className="mt-4 text-[22px] leading-snug text-white/85 sm:text-[26px]">
                Write it once. Read it back later. Understand it immediately.
              </p>
              <Link
                to="/case-studies"
                className="eri-snake eri-snake-blue mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-white/85">

                <SnakeBorder radius={999} />
                Explore
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-raised p-3 shadow-lg shadow-black/30">
              <img
                src="/a4f2f939-f4ad-4760-a1be-a0c95ef87eda.jpg"
                alt="Abstract render of geometric shapes orbiting a smiling cube"
                className="w-full rounded-xl object-cover"
                loading="lazy" />
            </div>

          </ScrollReveal>
        </div>
      </div>
    </section>);

}