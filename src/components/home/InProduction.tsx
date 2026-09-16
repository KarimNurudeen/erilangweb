import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, Volume2Icon } from 'lucide-react';
import { SnakeBorder } from '../SnakeBorder';
import { ScrollReveal } from '../ScrollReveal';
import { CodeBlock } from '../CodeBlock';

const CHART_CODE = `LOAD "monthly_revenue.csv" INTO sales
CHART sales BY month SHOWING revenue AS "LINE" TO "trend.png" INTO chart
describe_chart(chart)`;

const CHART_DESCRIPTION = 'This line chart shows revenue over month, starting at 120 and ending at 355 — an increase of 196%. The trend is generally upward. The highest point is 355 at month Jul; the lowest is 120 at month Jan. The largest single change is between month Mar and month Apr, rising by 82.';

export function InProduction() {
  return (
    <section className="bg-neutral-100 py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 sm:p-12 lg:p-16">
          <ScrollReveal>
          <p className="text-[13px] font-bold uppercase tracking-wide text-accent-deep">Why Erilang really exists</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Charts that talk back
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
            CHART never just draws a picture. Every chart also produces a real, data-computed
            spoken-language description — the trend, the peak and trough, the correlation
            strength — worked out directly from the numbers, not guessed from the image. That's
            what makes a chart usable by someone who can't see it, and it's the reason this
            language exists.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] shadow-lg shadow-black/20">
              <div className="flex items-center gap-3 bg-[#323233] px-4 py-2">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="truncate text-[12px] text-neutral-400">revenue_trend.eri</span>
              </div>
              <div className="px-5 py-5">
                <CodeBlock code={CHART_CODE} />
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-accent-deep">
                <Volume2Icon className="h-4 w-4" aria-hidden="true" />
                What describe_chart(chart) actually says
              </div>
              <p className="mt-3 text-[14.5px] italic leading-relaxed text-neutral-700">
                "{CHART_DESCRIPTION}"
              </p>
              <p className="mt-4 text-[12.5px] text-neutral-500">
                Real output, straight from the grammar reference — every word here is computed
                from the data, not written by hand.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-8">
            <p className="text-[13.5px] text-neutral-600">
              We're still collecting the first public stories from teams using Erilang.
            </p>
            <Link
              to="/case-studies"
              className="eri-snake eri-snake-blue inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

              <SnakeBorder radius={999} />
              Read case studies
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}
