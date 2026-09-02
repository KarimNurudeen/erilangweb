import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, PlayCircleIcon, RocketIcon, SearchIcon } from 'lucide-react';
import { docEntryPoints, docFirstSteps, flatDocNav } from '../data/docs';
import { RunnableCodeWindow } from '../components/RunnableCodeWindow';
import { SnakeBorder } from '../components/SnakeBorder';
import { DocsSidebar } from '../components/docs/DocsSidebar';
import { DocsContentCard } from '../components/docs/DocsContentCard';

const INSTALL_SAMPLE = 'show("Hello, world!")';

const ENTRY_ICONS = [RocketIcon, PlayCircleIcon];

export function Docs() {
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatDocNav.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <main className="flex w-full bg-neutral-100 text-ink">
      <DocsSidebar />

      <DocsContentCard>
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-neutral-500">
            <span>Docs</span>
            <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink">Home</span>
          </div>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">Erilang docs</h1>
          <p className="mt-4 text-2xl font-normal text-neutral-800">Latest stable version: 1.0</p>

          <div className="relative mt-8 max-w-xl">
            <label className="flex items-center gap-3 border border-neutral-300 px-4 py-3 focus-within:border-ink">
              <SearchIcon className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
              <span className="sr-only">Search the documentation</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the docs"
                className="w-full bg-transparent text-[14.5px] text-ink placeholder:text-neutral-400 focus:outline-none" />

            </label>
            {matches.length > 0 ?
            <ul className="absolute inset-x-0 top-full z-10 mt-1 border border-neutral-200 bg-white shadow-lg">
                {matches.map((item) =>
              <li key={item.slug}>
                    <Link
                  to={`/docs/${item.slug}`}
                  onClick={() => setQuery('')}
                  className="block px-4 py-2.5 text-[14px] text-ink hover:bg-neutral-100">

                      {item.label}
                    </Link>
                  </li>
              )}
              </ul> :
            null}
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {docEntryPoints.map((card, index) => {
              const Icon = ENTRY_ICONS[index] ?? RocketIcon;
              return (
                <li key={card.title} className="h-full">
                  <Link
                    to={card.to}
                    className="eri-snake eri-snake-always flex h-full flex-col border border-neutral-300 p-7 transition-colors duration-150 ease-eri hover:border-ink">

                    <SnakeBorder radius={0} />
                    <Icon className="h-11 w-11 text-accent-deep" strokeWidth={1.4} aria-hidden="true" />
                    <span className="mt-8 text-lg font-bold">{card.title}</span>
                    <span className="mt-2 text-[14.5px] leading-relaxed text-neutral-600">
                      {card.body}
                    </span>
                  </Link>
                </li>);

            })}
          </ul>

          <h2 className="mt-14 text-3xl font-bold tracking-tight">First steps</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {docFirstSteps.map((card) =>
            <li key={card.title} className="h-full">
                <Link
                to={card.to}
                className="eri-snake eri-snake-always flex h-full flex-col border border-neutral-300 p-6 transition-colors duration-150 ease-eri hover:border-ink">

                  <SnakeBorder radius={0} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-500">
                    {card.meta}
                  </span>
                  <span className="mt-3 text-lg font-bold">{card.title}</span>
                  <span className="mt-2 text-[14.5px] leading-relaxed text-neutral-600">
                    {card.body}
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <h2 className="mt-14 text-3xl font-bold tracking-tight">Your first program</h2>
          <div className="mt-6">
            <RunnableCodeWindow filename="hello.eri" initialCode={INSTALL_SAMPLE} idleOutput="Hello, world!" />
          </div>
        </div>
      </DocsContentCard>
    </main>);

}
