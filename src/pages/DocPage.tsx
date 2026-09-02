import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, InfoIcon } from 'lucide-react';
import { docPages, DocBlock } from '../data/docsContent';
import { flatDocNav } from '../data/docs';
import { DocsSidebar } from '../components/docs/DocsSidebar';
import { DocsContentCard } from '../components/docs/DocsContentCard';
import { CodeWindow } from '../components/CodeWindow';
import { RunnableCodeWindow } from '../components/RunnableCodeWindow';

function DocBlockView({ block, filename }: {block: DocBlock;filename: string;}) {
  if (block.type === 'p') {
    return <p className="text-[15px] leading-relaxed text-neutral-700">{block.text}</p>;
  }
  if (block.type === 'h3') {
    return <h2 className="text-xl font-bold tracking-tight text-ink">{block.text}</h2>;
  }
  if (block.type === 'note') {
    return (
      <p className="rounded-lg border border-accent-deep/25 bg-accent-soft/40 p-4 text-[13.5px] leading-relaxed text-neutral-700">
        {block.text}
      </p>);

  }
  if (block.type === 'code') {
    if (block.runnable === false) {
      return (
        <div className="flex flex-col gap-2">
          <CodeWindow filename={filename} code={block.code || ''} output={block.output} />
          {block.runNote ?
          <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-neutral-500">
              <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {block.runNote}
            </p> :
          null}
        </div>);

    }
    return (
      <RunnableCodeWindow filename={filename} initialCode={block.code || ''} idleOutput={block.output} />);

  }
  if (block.type === 'table') {
    return (
      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="w-full min-w-[480px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="bg-[#1e2a4a] text-white">
              <th className="px-4 py-2.5 font-semibold">{block.columns?.[0] || 'Form'}</th>
              <th className="px-4 py-2.5 font-semibold">{block.columns?.[1] || 'What it does'}</th>
            </tr>
          </thead>
          <tbody>
            {block.rows?.map((row, i) =>
            <tr key={i} className={i % 2 === 1 ? 'bg-neutral-50' : ''}>
                <td className="whitespace-nowrap border-t border-neutral-200 px-4 py-2.5 align-top font-mono text-[12.5px] text-ink">
                  {row[0]}
                </td>
                <td className="border-t border-neutral-200 px-4 py-2.5 align-top text-neutral-700">{row[1]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>);

  }
  return null;
}

export function DocPage() {
  const { slug = '' } = useParams();
  const page = docPages.find((p) => p.slug === slug);
  if (!page) return <Navigate to="/docs" replace />;

  const idx = flatDocNav.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? flatDocNav[idx - 1] : null;
  const next = idx >= 0 && idx < flatDocNav.length - 1 ? flatDocNav[idx + 1] : null;

  return (
    <main className="flex w-full bg-neutral-100 text-ink">
      <DocsSidebar />

      <DocsContentCard>
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-neutral-500">
            <Link to="/docs" className="hover:text-ink">Docs</Link>
            <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink">{page.title}</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{page.title}</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{page.description}</p>

          <div className="mt-10 flex flex-col gap-6">
            {page.blocks.map((block, i) =>
            <DocBlockView key={i} block={block} filename={`${page.slug}.eri`} />
            )}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-8">
            {prev ?
            <Link
              to={`/docs/${prev.slug}`}
              className="flex items-center gap-2 text-[14px] font-medium text-neutral-600 transition-colors duration-150 ease-eri hover:text-ink">

                <ArrowLeftIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-[11.5px] text-neutral-400">Previous</span>
                  {prev.label}
                </span>
              </Link> :
            <span />}
            {next ?
            <Link
              to={`/docs/${next.slug}`}
              className="ml-auto flex items-center gap-2 text-right text-[14px] font-medium text-neutral-600 transition-colors duration-150 ease-eri hover:text-ink">

                <span>
                  <span className="block text-[11.5px] text-neutral-400">Next</span>
                  {next.label}
                </span>
                <ArrowRightIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link> :
            null}
          </div>
        </div>
      </DocsContentCard>
    </main>);

}
