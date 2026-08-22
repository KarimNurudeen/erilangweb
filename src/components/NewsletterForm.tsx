import React, { useState } from 'react';
import { newsletter, ApiError } from '../lib/api';

interface NewsletterFormProps {
  className?: string;
  dark?: boolean;
}

export function NewsletterForm({ className = '', dark = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await newsletter.subscribe(email);
      setMessage(res.message);
      setEmail('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (message) {
    return (
      <p className={`text-[13.5px] ${dark ? 'text-white/80' : 'text-neutral-600'} ${className}`}>{message}</p>);

  }

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-2 sm:flex-row ${className}`}>
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full rounded-full border px-4 py-2.5 text-[13.5px] focus:outline-none ${
        dark ?
        'border-white/20 bg-transparent text-white placeholder:text-white/50 focus:border-white/50' :
        'border-neutral-300 text-ink placeholder:text-neutral-400 focus:border-ink'}`
        } />

      <button
        type="submit"
        disabled={submitting}
        className={`shrink-0 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-150 ease-eri disabled:opacity-60 ${
        dark ? 'bg-white text-ink hover:bg-white/85' : 'bg-ink text-white hover:bg-neutral-800'}`
        }>

        {submitting ? 'Subscribing…' : 'Subscribe'}
      </button>
      {error ? <p className="text-[12.5px] text-red-500 sm:basis-full">{error}</p> : null}
    </form>);

}
