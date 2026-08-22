import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../../components/TextField';
import { ErrorBanner } from '../../components/StatusBanner';
import { SnakeBorder } from '../../components/SnakeBorder';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { useAuth } from '../../lib/AuthContext';
import { ApiError } from '../../lib/api';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        navigate('/verify-email', { state: { email } });
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Log in</h1>
      <p className="mt-2 text-[14.5px] text-neutral-600">Welcome back.</p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        {error ? <ErrorBanner message={error} /> : null}
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[13px] font-medium text-neutral-600 underline underline-offset-2 hover:text-ink">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="eri-snake eri-snake-blue mt-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 ease-eri hover:bg-neutral-800 disabled:opacity-60">

          <SnakeBorder radius={999} />
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-[13.5px] text-neutral-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-ink underline underline-offset-2">
          Create one
        </Link>
      </p>
    </AuthLayout>);

}
