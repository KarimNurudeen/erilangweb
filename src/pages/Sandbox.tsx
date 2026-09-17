import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TerminalIcon } from 'lucide-react';
import { RunnableCodeWindow } from '../components/RunnableCodeWindow';
import { sandbox, SandboxLimits } from '../lib/api';

const STARTER_CODE = `SET name TO "your name"
show("Hello, " + name + "!")

SET total TO 0
FOR i FROM 1 TO 5 DO
  SET total TO total + i
END
show("1 + 2 + 3 + 4 + 5 = " + TO_STRING(total))`;

export function Sandbox() {
  const [limits, setLimits] = useState<SandboxLimits | null>(null);

  useEffect(() => {
    sandbox.limits().then(setLimits).catch(() => {});
  }, []);

  return (
    <main className="mx-auto max-w-page px-5 py-16 lg:px-8 lg:py-20">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Sandbox</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
        Write real Erilang and run it against the real interpreter, right here. No install required.
      </p>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface p-5">
        <TerminalIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <p className="text-[13.5px] leading-relaxed text-muted">
          Edit the code below and hit Run. Each run is a fresh, isolated program, so there's no
          persistent session between runs, and it typically takes 12 to 20 seconds since it's
          executing on a real sandboxed interpreter, not simulated in your browser.
          {limits ? ` Limited to ${limits.max_runs_per_minute} runs per minute.` : ''}
        </p>
      </div>

      <div className="mt-6">
        <RunnableCodeWindow filename="sandbox.eri" initialCode={STARTER_CODE} minHeight="360px" />
      </div>

      <p className="mt-8 text-[13.5px] text-muted">
        New to Erilang? <Link to="/docs/getting-started" className="font-medium text-white underline underline-offset-2">Read the getting started guide</Link> or{' '}
        <Link to="/docs/repl" className="font-medium text-white underline underline-offset-2">learn about the interactive shell</Link>.
      </p>
    </main>);

}
