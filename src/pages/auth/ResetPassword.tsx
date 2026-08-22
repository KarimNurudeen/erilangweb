import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField } from '../../components/TextField';
import { ErrorBanner } from '../../components/StatusBanner';
import { SnakeBorder } from '../../components/SnakeBorder';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { auth as authApi, setToken, ApiError } from '../../lib/api';
import { useAuth } from '../../lib/AuthContext';

export function ResetPassword() {
  const { refresh } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = (location.state as {email?: string;} | null)?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await authApi.resetPassword(email, code, newPassword);
      setToken(token);
      await refresh();
      navigate('/account');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Set a new password</h1>
      <p className="mt-2 text-[14.5px] text-neutral-600">
        Enter the code from your email and choose a new password.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        {error ? <ErrorBanner message={error} /> : null}
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <TextField
          label="Reset code"
          name="code"
          inputMode="numeric"
          maxLength={6}
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="tracking-[0.4em]" />

        <TextField
          label="New password"
          name="new_password"
          type="password"
          autoComplete="new-password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} />

        <button
          type="submit"
          disabled={submitting}
          className="eri-snake eri-snake-blue mt-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 ease-eri hover:bg-neutral-800 disabled:opacity-60">

          <SnakeBorder radius={999} />
          {submitting ? 'Resetting…' : 'Reset password'}
        </button>
      </form>
    </AuthLayout>);

}
