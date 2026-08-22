import React from 'react';
import { CodeBlock } from './CodeBlock';

interface CodeWindowProps {
  filename?: string;
  code: string;
  output?: string;
}

export function CodeWindow({ filename = 'main.eri', code, output }: CodeWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] shadow-lg shadow-black/20">
      <div className="flex items-center gap-3 bg-[#323233] px-4 py-2">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="truncate text-[12px] text-neutral-400">{filename}</span>
      </div>

      <div className="px-5 py-5">
        <CodeBlock code={code} />
      </div>

      {output ?
      <div className="border-t border-black/40 bg-[#181818]">
          <div className="border-b border-black/30 px-4 py-1.5">
            <span className="border-b-2 border-accent pb-1.5 text-[10.5px] font-medium uppercase tracking-wide text-neutral-300">
              Terminal
            </span>
          </div>
          <div className="px-4 py-3 font-mono text-[13px] leading-relaxed">
            <p className="text-neutral-500">
              <span className="text-accent">$</span> erilang run {filename}
            </p>
            {output.split('\n').map((line, i) => <p key={i} className="text-emerald-400">{line}</p>)}
          </div>
        </div> :
      null}
    </div>);

}
