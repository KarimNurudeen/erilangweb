import React from 'react';
import { SandboxRunResult } from '../lib/api';

interface SandboxTerminalProps {
  command: string;
  running: boolean;
  elapsed: number;
  runError: string | null;
  result: SandboxRunResult | null;
  /** Shown as a muted preview before the user hits Run, if given. */
  idleOutput?: string;
  className?: string;
}

export function SandboxTerminal({
  command,
  running,
  elapsed,
  runError,
  result,
  idleOutput,
  className = ''
}: SandboxTerminalProps) {
  return (
    <div className={`px-4 py-3 font-mono text-[13px] leading-relaxed ${className}`}>
      <p className="text-neutral-500">
        <span className="text-accent">$</span> {command}
      </p>
      {running ?
      <p className="text-neutral-500">
          Running in an isolated sandbox — usually takes 12–20s… ({elapsed}s)
        </p> :
      runError ?
      <p className="text-red-400">{runError}</p> :
      result ?
      <>
          {result.output ?
        result.output.
        split('\n').
        filter((line, i, arr) => line !== '' || i < arr.length - 1).
        map((line, i) => <p key={i} className="text-emerald-400">{line}</p>) :
        !result.error ?
        <p className="text-neutral-500">(no output)</p> :
        null}
          {result.error ? <p className="text-red-400">{result.error}</p> : null}
        </> :
      idleOutput ?
      <>
          <p className="mb-1 text-[10.5px] uppercase tracking-wide text-neutral-600">Expected output</p>
          {idleOutput.split('\n').map((line, i) => <p key={i} className="text-neutral-400">{line}</p>)}
        </> :
      null}
    </div>);

}
