import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';

export function GetStartedBanner() {
  return (
    <section className="bg-accent py-16 lg:py-20">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <ScrollReveal className="flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-[#0a2540] p-8 shadow-2xl shadow-black/40 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Start using Erilang today
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
              Install Erilang, save a <span className="font-mono">.eri</span> file, and run it with{' '}
              <span className="font-mono">erilang run</span>. You'll see output in under five minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/docs"
              className="eri-snake eri-snake-blue inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

              <SnakeBorder radius={999} />
              Get started
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/community"
              className="eri-snake eri-snake-blue inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:border-white/60">

              <SnakeBorder radius={999} />
              Join the community
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>);

}