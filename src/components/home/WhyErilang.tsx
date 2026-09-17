import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileCode2Icon, PlayIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { CodeEditor } from '../CodeEditor';
import { SandboxTerminal } from '../SandboxTerminal';
import { codeSamples } from '../../data/codeSamples';
import { SnakeBorder } from '../SnakeBorder';
import { sandbox, SandboxLimits } from '../../lib/api';
import { useSandboxRun } from '../../hooks/useSandboxRun';
import { ScrollReveal } from '../ScrollReveal';

export function WhyErilang() {
  const [activeId, setActiveId] = useState(codeSamples[0].id);
  const active = codeSamples.find((sample) => sample.id === activeId) ?? codeSamples[0];
  const [code, setCode] = useState(active.code);
  const [limits, setLimits] = useState<SandboxLimits | null>(null);

  const { result, runError, running, elapsed, run, reset } = useSandboxRun();

  useEffect(() => {
    sandbox.limits().then(setLimits).catch(() => {});
  }, []);

  const onSelectTab = (id: string) => {
    const sample = codeSamples.find((s) => s.id === id);
    setActiveId(id);
    setCode(sample?.code ?? '');
    reset();
  };

  const onReset = () => {
    setCode(active.code);
    reset();
  };

  return (
    <section id="why" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <ScrollReveal>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Why Erilang?</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          The syntax stays small on purpose. Most of what a team needs, including classes, async I/O,
          modules, and clear errors, is part of the language rather than something you assemble. Edit the code
          below and run it for real.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-black/40 bg-[#1e1e1e] shadow-2xl shadow-black/40">
          {/* macOS-style title bar */}
          <div className="flex items-center gap-3 bg-[#323233] px-4 py-2.5">
            <div className="flex shrink-0 gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="truncate text-[12.5px] text-neutral-400">
              {active.id}.eri · erilang
            </span>
          </div>

          {/* Editor tab strip */}
          <div className="flex items-stretch justify-between border-b border-black/40 bg-[#252526]">
            <div role="tablist" aria-label="Code examples" className="flex overflow-x-auto">
              {codeSamples.map((sample) => {
                const isActive = sample.id === activeId;
                return (
                  <button
                    key={sample.id}
                    role="tab"
                    id={`tab-${sample.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${sample.id}`}
                    type="button"
                    onClick={() => onSelectTab(sample.id)}
                    className={`group flex shrink-0 items-center gap-2 border-r border-black/40 px-3.5 py-2.5 text-[13px] transition-colors duration-150 ease-eri ${
                    isActive ? 'bg-[#1e1e1e] text-white' : 'bg-[#2d2d2d] text-neutral-400 hover:text-white'}`
                    }>

                    <FileCode2Icon className="h-3.5 w-3.5 shrink-0 text-accent-deep" aria-hidden="true" />
                    {sample.id}.eri
                    <XIcon
                      className={`h-3 w-3 shrink-0 text-neutral-500 ${isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-70'}`}
                      aria-hidden="true" />

                  </button>);

              })}
            </div>

            <div className="flex shrink-0 items-center gap-1 border-l border-black/40 px-2">
              {code !== active.code ?
              <button
                type="button"
                onClick={onReset}
                title="Reset to the original example"
                aria-label="Reset to the original example"
                className="rounded p-1.5 text-neutral-400 transition-colors duration-150 ease-eri hover:bg-white/10 hover:text-white">

                  <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button> :
              null}
              <button
                type="button"
                onClick={() => run(code)}
                disabled={running}
                title="Run"
                aria-label="Run"
                className="flex items-center gap-1.5 rounded p-1.5 text-emerald-400 transition-colors duration-150 ease-eri hover:bg-white/10 disabled:opacity-40">

                <PlayIcon className="h-4 w-4 fill-current" aria-hidden="true" />
                <span className="hidden text-[12.5px] font-medium sm:inline">
                  {running ? `Running… ${elapsed}s` : 'Run'}
                </span>
              </button>
            </div>
          </div>

          {/* Editor body */}
          <div
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="bg-[#1e1e1e] px-5 py-6 lg:px-7">

            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Integrated terminal — runs against the real Erilang sandbox (api.erilang.dev), not a local simulation */}
          {running || result || runError ?
          <div className="border-t border-black/40 bg-[#181818]">
              <div className="border-b border-black/30 px-4 py-1.5">
                <span className="border-b-2 border-accent pb-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-300">
                  Terminal
                </span>
              </div>
              <SandboxTerminal
              command={`erilang run ${active.id}.eri`}
              running={running}
              elapsed={elapsed}
              runError={runError}
              result={result} />

            </div> :
          null}

          {/* Status bar */}
          <div className="flex items-center justify-between bg-[#007acc] px-4 py-1 text-[11px] text-white">
            <span className="truncate">{active.note}</span>
            <span className="shrink-0 pl-4">
              {limits ? `Real sandbox · ${limits.max_runs_per_minute} runs/min` : 'Erilang'}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/docs"
            className="eri-snake eri-snake-blue inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-eri hover:border-accent hover:text-accent">

            <SnakeBorder radius={999} />
            Read the language guide
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>);

}
