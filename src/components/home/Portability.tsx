import React from 'react';
import { Link } from 'react-router-dom';
import { pillars } from '../../data/targets';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';

const OUTPUTS = ['run', 'lint', 'format', 'doc', 'install'];

export function Portability() {
  return (
    <section className="bg-neutral-100 pb-20 pt-6 lg:pb-24 lg:pt-8">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <ScrollReveal className="grid gap-14 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 sm:p-12 lg:grid-cols-2 lg:items-start lg:p-16">
          <div className="relative z-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <img
                src="/modules-card-bg.avif"
                alt=""
                className="h-full w-full object-cover object-top opacity-[0.35]" />

              <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/30 via-neutral-50/90 to-neutral-50" />
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              Organize code
              <br />
              your own way
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-600">
              INCLUDE brings in another file under a chosen namespace, and an EXPORT line controls what
              that file actually shares. Structure comes from your own file boundaries, not a rigid
              module system.
            </p>

            <dl className="mt-8 flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
              {pillars.map((pillar) =>
              <div key={pillar.title} className="py-5">
                  <dt className="text-[15px] font-semibold text-ink">{pillar.title}</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">{pillar.body}</dd>
                </div>
              )}
            </dl>

            <Link
              to="/docs"
              className="eri-snake eri-snake-blue mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

              <SnakeBorder radius={999} />
              Learn about modules
            </Link>
          </div>

          <div className="lg:pt-6">
            <div className="mx-auto max-w-md">
              <p className="mx-auto w-fit rounded-md bg-accent-deep px-6 py-2.5 text-center text-[14px] font-medium text-white">
                helpers.eri
              </p>
              <div className="mx-auto h-7 w-px bg-neutral-300" aria-hidden="true" />
              <p className="mx-auto w-fit rounded-md bg-accent-deep px-6 py-2.5 text-center font-mono text-[13.5px] text-white">
                EXPORT calculate_total
              </p>
              <div className="mx-auto h-7 w-px bg-neutral-300" aria-hidden="true" />
              <div className="h-px w-full bg-neutral-300" aria-hidden="true" />
              <ul className="flex flex-wrap justify-center gap-2 pt-7 sm:flex-nowrap">
                {OUTPUTS.map((output) =>
                <li key={output} className="relative flex-1">
                    <span
                    className="absolute -top-7 left-1/2 h-7 w-px bg-neutral-300"
                    aria-hidden="true" />

                    <span className="block rounded-md bg-neutral-100 px-3 py-2.5 text-center text-[13.5px] text-ink">
                      {output}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>);

}