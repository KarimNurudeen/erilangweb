import { useCallback, useRef, useState } from 'react';
import { sandbox, SandboxRunResult, ApiError } from '../lib/api';

export function useSandboxRun() {
  const [result, setResult] = useState<SandboxRunResult | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const tickRef = useRef<number | undefined>(undefined);

  const run = useCallback(async (code: string) => {
    setRunning(true);
    setResult(null);
    setRunError(null);
    setElapsed(0);
    tickRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    try {
      const res = await sandbox.run(code);
      setResult(res);
    } catch (err) {
      setRunError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      window.clearInterval(tickRef.current);
      setRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setRunError(null);
  }, []);

  return { result, runError, running, elapsed, run, reset };
}
