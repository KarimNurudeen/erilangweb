import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../components/TextField';
import { ErrorBanner } from '../../components/StatusBanner';
import { SnakeBorder } from '../../components/SnakeBorder';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { auth as authApi, ApiError } from '../../lib/api';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authApi.forgotPassword(email);
      setMessage(res.message);
      setTimeout(() => navigate('/reset-password', { state: { email } }), 900);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Reset your password</h1>
      <p className="mt-2 text-[14.5px] text-neutral-600">
        We'll email you a 6-digit code to set a new password.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        {error ? <ErrorBanner message={error} /> : null}
        {message ?
        <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[13.5px] text-neutral-700">
            {message}
          </p> :
        null}
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <button
          type="submit"
          disabled={submitting}
          className="eri-snake eri-snake-blue mt-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 ease-eri hover:bg-neutral-800 disabled:opacity-60">

          <SnakeBorder radius={999} />
          {submitting ? 'Sending…' : 'Send reset code'}
        </button>
      </form>

      <p className="mt-6 text-[13.5px] text-neutral-600">
        Remembered it?{' '}
        <Link to="/login" className="font-medium text-ink underline underline-offset-2">
          Log in
        </Link>
      </p>
    </AuthLayout>);

}
