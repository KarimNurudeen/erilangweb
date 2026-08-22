import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { newsletter } from '../lib/api';
import { LoadingBanner } from '../components/StatusBanner';

export function NewsletterUnsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    newsletter.
    unsubscribe(token).
    then(() => setStatus('ok')).
    catch(() => setStatus('error'));
  }, [token]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-page items-center justify-center bg-white px-5 py-16 text-center text-ink lg:px-8">
      {status === 'loading' ?
      <LoadingBanner label="Unsubscribing…" /> :
      status === 'ok' ?
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">You're unsubscribed</h1>
          <p className="mt-2 text-[14.5px] text-neutral-600">
            You won't receive the newsletter anymore. You can resubscribe any time.
          </p>
        </div> :

      <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">That link isn't valid</h1>
          <p className="mt-2 text-[14.5px] text-neutral-600">It may have already been used.</p>
        </div>
      }
    </main>);

}
