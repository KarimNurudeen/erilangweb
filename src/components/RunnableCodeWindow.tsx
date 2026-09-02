import React, { useState } from 'react';
import { PlayIcon, RotateCcwIcon } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { SandboxTerminal } from './SandboxTerminal';
import { useSandboxRun } from '../hooks/useSandboxRun';

interface RunnableCodeWindowProps {
  filename?: string;
  initialCode: string;
  /** Static expected output, shown as a preview before the reader hits Run. */
  idleOutput?: string;
  minHeight?: string;
}

export function RunnableCodeWindow({
  filename = 'main.eri',
  initialCode,
  idleOutput,
  minHeight = 'auto'
}: RunnableCodeWindowProps) {
  const [code, setCode] = useState(initialCode);
  const { result, runError, running, elapsed, run, reset } = useSandboxRun();

  const onReset = () => {
    setCode(initialCode);
    reset();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] shadow-lg shadow-black/20">
      <div className="flex items-center gap-3 bg-[#323233] px-4 py-2">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="truncate text-[12px] text-neutral-400">{filename}</span>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          {code !== initialCode ?
          <button
            type="button"
            onClick={onReset}
            title="Reset to the original example"
            aria-label="Reset to the original example"
            className="rounded p-1 text-neutral-400 transition-colors duration-150 ease-eri hover:bg-white/10 hover:text-white">

              <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button> :
          null}
          <button
            type="button"
            onClick={() => run(code)}
            disabled={running}
            title="Run"
            aria-label="Run"
            className="flex items-center gap-1 rounded px-1.5 py-1 text-[12px] font-medium text-emerald-400 transition-colors duration-150 ease-eri hover:bg-white/10 disabled:opacity-40">

            <PlayIcon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {running ? `Running… ${elapsed}s` : 'Run'}
          </button>
        </div>
      </div>

      <div className="px-5 py-5">
        <CodeEditor value={code} onChange={setCode} minHeight={minHeight} />
      </div>

      {running || result || runError || idleOutput ?
      <div className="border-t border-black/40 bg-[#181818]">
          <div className="border-b border-black/30 px-4 py-1.5">
            <span className="border-b-2 border-accent pb-1.5 text-[10.5px] font-medium uppercase tracking-wide text-neutral-300">
              Terminal
            </span>
          </div>
          <SandboxTerminal
          command={`erilang run ${filename}`}
          running={running}
          elapsed={elapsed}
          runError={runError}
          result={result}
          idleOutput={idleOutput} />

        </div> :
      null}
    </div>);

}
