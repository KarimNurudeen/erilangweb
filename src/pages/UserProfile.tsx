import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { MessageSquareIcon, PackageIcon, PencilLineIcon } from 'lucide-react';
import { users, packages as packagesApi, PublicProfile, PackageSummary, ApiError } from '../lib/api';
import { LoadingBanner, ErrorBanner } from '../components/StatusBanner';

export function UserProfile() {
  const { username = '' } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userPackages, setUserPackages] = useState<PackageSummary[] | null>(null);

  useEffect(() => {
    setProfile(null);
    setError(null);
    setUserPackages(null);
    users.
    get(username).
    then(setProfile).
    catch((err) => setError(err instanceof ApiError ? err.message : 'Something went wrong.'));
    packagesApi.
    browse({ author: username, per_page: 6 }).
    then((res) => setUserPackages(res.results)).
    catch(() => setUserPackages([]));
  }, [username]);

  if (error) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-page items-center justify-center bg-white px-5 text-ink">
        <ErrorBanner message={error} />
      </main>);

  }

  if (!profile) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <LoadingBanner />
      </main>);

  }

  return (
    <main className="bg-white text-ink">
      <div className="h-28 bg-gradient-to-r from-[#0a2540] to-accent-deep sm:h-36" />

      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="-mt-12 flex flex-wrap items-end gap-5 sm:-mt-14">
          {profile.avatar_url ?
          <img
            src={profile.avatar_url}
            alt=""
            className="h-24 w-24 shrink-0 rounded-full border-4 border-white object-cover shadow-sm sm:h-28 sm:w-28" /> :


          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-neutral-800 text-3xl font-bold text-white shadow-sm sm:h-28 sm:w-28">
              {profile.username[0]?.toUpperCase()}
            </div>
          }
          <div className="pb-1">
            <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
              {profile.display_name || profile.username}
              {profile.is_staff ?
              <span className="rounded-full bg-accent-deep px-2.5 py-1 text-[11px] font-semibold text-white">
                  Staff
                </span> :
              null}
            </h1>
            <p className="text-[14px] text-neutral-500">
              @{profile.username} · joined {format(new Date(profile.joined_at), 'MMMM yyyy')}
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          <li className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[13.5px] text-neutral-700">
            <MessageSquareIcon className="h-4 w-4 text-accent-deep" strokeWidth={1.8} aria-hidden="true" />
            <span className="font-semibold text-ink">{profile.forum_thread_count}</span> threads
          </li>
          <li className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[13.5px] text-neutral-700">
            <PencilLineIcon className="h-4 w-4 text-accent-deep" strokeWidth={1.8} aria-hidden="true" />
            <span className="font-semibold text-ink">{profile.forum_reply_count}</span> replies
          </li>
          <li className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[13.5px] text-neutral-700">
            <PackageIcon className="h-4 w-4 text-accent-deep" strokeWidth={1.8} aria-hidden="true" />
            <span className="font-semibold text-ink">{profile.package_count}</span> packages
          </li>
        </ul>

        <div className="mb-16 mt-12 border-t border-neutral-200 pt-10">
          <h2 className="text-lg font-bold text-ink">Packages</h2>
          {userPackages === null ?
          <LoadingBanner /> :
          userPackages.length === 0 ?
          <p className="mt-3 text-[14px] text-neutral-500">No published packages yet.</p> :

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userPackages.map((pkg) =>
            <li key={pkg.name}>
                  <Link
                to={`/packages/${pkg.name}`}
                className="flex h-full flex-col rounded-xl border border-neutral-200 p-5 transition-colors duration-150 ease-eri hover:border-ink">

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[14.5px] font-semibold text-ink">{pkg.name}</span>
                      <span className="shrink-0 text-[12px] text-neutral-500">
                        {pkg.latest ? `v${pkg.latest}` : 'unreleased'}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-neutral-500">
                      {pkg.description}
                    </p>
                  </Link>
                </li>
            )}
            </ul>
          }
        </div>
      </div>
    </main>);

}
