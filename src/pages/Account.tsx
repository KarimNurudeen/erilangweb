import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CameraIcon, PackageIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { auth as authApi, packages as packagesApi, ApiError, PackageSummary } from '../lib/api';
import { TextField } from '../components/TextField';
import { ErrorBanner, LoadingBanner } from '../components/StatusBanner';

type Tab = 'profile' | 'security' | 'packages';

const TABS: {id: Tab;label: string;icon: typeof UserIcon;}[] = [
{ id: 'profile', label: 'Profile', icon: UserIcon },
{ id: 'security', label: 'Security', icon: ShieldIcon },
{ id: 'packages', label: 'Packages', icon: PackageIcon }];


export function Account() {
  const { user, loading, logout, setUser } = useAuth();
  const [tab, setTab] = useState<Tab>('profile');

  const [displayName, setDisplayName] = useState('');
  const [notify, setNotify] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [myPackages, setMyPackages] = useState<(PackageSummary & {version_count: number;})[] | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || '');
      setNotify(user.notify_feature_updates);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    packagesApi.mine().
    then((res) => setMyPackages(res.results)).
    catch(() => setMyPackages([]));
  }, [user]);

  if (loading) return <main className="flex min-h-[60vh] items-center justify-center bg-white"><LoadingBanner /></main>;
  if (!user) return <Navigate to="/login" replace />;

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileMessage(null);
    setSavingProfile(true);
    try {
      const updated = await authApi.updateMe({
        display_name: displayName || undefined,
        notify_feature_updates: notify
      });
      setUser(updated);
      setProfileMessage('Profile updated.');
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setSavingProfile(false);
    }
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError(null);
    setAvatarUploading(true);
    try {
      const { avatar_url } = await authApi.uploadAvatar(file);
      setUser({ ...user, avatar_url });
    } catch (err) {
      setAvatarError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);
    setChangingPassword(true);
    try {
      const res = await authApi.changePassword(currentPassword, newPassword);
      setPasswordMessage(res.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <main className="bg-white text-ink">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-page px-5 py-10 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="group relative shrink-0">
                {user.avatar_url ?
                <img src={user.avatar_url} alt="" className="h-14 w-14 rounded-full object-cover" /> :

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-bold text-white">
                    {user.username[0]?.toUpperCase()}
                  </div>
                }
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-ink/0 text-transparent transition-colors duration-150 ease-eri group-hover:bg-ink/50 group-hover:text-white">
                  <CameraIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Change avatar</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={onAvatarChange}
                    disabled={avatarUploading}
                    className="sr-only" />

                </label>
              </div>
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-ink">
                  {user.display_name || user.username}
                  {user.is_staff ?
                  <span className="rounded-full bg-accent-deep px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      Staff
                    </span> :
                  null}
                </h1>
                <p className="text-[13.5px] text-neutral-500">
                  @{user.username}
                  {avatarUploading ? ' · uploading avatar…' : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-150 ease-eri hover:border-ink">

              Log out
            </button>
          </div>
          {avatarError ? <div className="mt-4 max-w-sm"><ErrorBanner message={avatarError} /></div> : null}
        </div>
      </div>

      <div className="mx-auto max-w-page px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
          <nav aria-label="Account settings" className="flex gap-1 overflow-x-auto lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible">
            {TABS.map(({ id, label, icon: Icon }) =>
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-left text-[14px] font-medium transition-colors duration-150 ease-eri ${
              tab === id ? 'bg-neutral-100 text-ink' : 'text-neutral-500 hover:bg-neutral-50 hover:text-ink'}`
              }>

                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </button>
            )}
          </nav>

          <div className="min-w-0 max-w-2xl">
            {tab === 'profile' ?
            <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-ink">Profile</h2>
                <p className="mt-1 text-[13.5px] text-neutral-500">
                  This information may be visible on your public profile.
                </p>

                <form onSubmit={onSaveProfile} className="mt-6 flex flex-col gap-4">
                  {profileError ? <ErrorBanner message={profileError} /> : null}
                  {profileMessage ?
                <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[13.5px] text-neutral-700">
                      {profileMessage}
                    </p> :
                null}
                  <TextField label="Username" value={user.username} disabled readOnly />
                  <TextField
                  label="Email"
                  value={user.email}
                  disabled
                  readOnly />

                  <TextField
                  label="Display name"
                  name="display_name"
                  placeholder={user.username}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)} />

                  <label className="flex items-center gap-2.5 text-[14px] text-ink">
                    <input
                    type="checkbox"
                    checked={notify}
                    onChange={(e) => setNotify(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-accent-deep focus:ring-accent-deep" />

                    Email me about feature updates
                  </label>
                  <button
                  type="submit"
                  disabled={savingProfile}
                  className="mt-1 self-start rounded-full bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800 disabled:opacity-60">

                    {savingProfile ? 'Saving…' : 'Save profile'}
                  </button>
                </form>

                <div className="mt-8 border-t border-neutral-200 pt-6">
                  <Link
                  to={`/users/${user.username}`}
                  className="text-[13.5px] font-medium text-ink underline underline-offset-2">

                    View your public profile →
                  </Link>
                </div>
              </div> :
            null}

            {tab === 'security' ?
            <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-ink">Change password</h2>
                <p className="mt-1 text-[13.5px] text-neutral-500">
                  Changing your password signs you out of any other active sessions.
                </p>

                <form onSubmit={onChangePassword} className="mt-6 flex flex-col gap-4">
                  {passwordError ? <ErrorBanner message={passwordError} /> : null}
                  {passwordMessage ?
                <p className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[13.5px] text-neutral-700">
                      {passwordMessage}
                    </p> :
                null}
                  <TextField
                  label="Current password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} />

                  <TextField
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />

                  <button
                  type="submit"
                  disabled={changingPassword}
                  className="self-start rounded-full bg-ink px-6 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800 disabled:opacity-60">

                    {changingPassword ? 'Updating…' : 'Update password'}
                  </button>
                </form>
              </div> :
            null}

            {tab === 'packages' ?
            <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-ink">Your packages</h2>
                {myPackages === null ?
              <LoadingBanner /> :
              myPackages.length === 0 ?
              <p className="mt-3 text-[14px] text-neutral-500">
                    You haven't published any packages yet.
                  </p> :

              <ul className="mt-4 flex flex-col gap-3">
                    {myPackages.map((pkg) =>
                <li key={pkg.name}>
                        <Link
                    to={`/packages/${pkg.name}`}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors duration-150 ease-eri hover:border-ink">

                          <span>
                            <span className="block font-mono text-[14.5px] font-semibold text-ink">{pkg.name}</span>
                            <span className="mt-1 block text-[13.5px] text-neutral-500">
                              {pkg.latest ? `v${pkg.latest} · ` : ''}
                              {pkg.version_count} version{pkg.version_count === 1 ? '' : 's'}
                            </span>
                          </span>
                        </Link>
                      </li>
                )}
                  </ul>
              }
                <p className="mt-6 rounded-lg bg-neutral-900 px-4 py-3 font-mono text-[12.5px] text-neutral-100">
                  <span className="text-accent">$</span> erilang publish
                </p>
              </div> :
            null}
          </div>
        </div>
      </div>
    </main>);

}
