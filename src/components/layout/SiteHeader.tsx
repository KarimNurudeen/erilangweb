import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { Brand } from '../Brand';
import { primaryNav } from '../../data/navigation';
import { channels } from '../../data/community';

const dropdownChannels = channels.filter((c) => c.name !== 'Forum');
import { CHANNEL_ICONS } from '../channelIcons';
import { SnakeBorder } from '../SnakeBorder';
import { useAuth } from '../../lib/AuthContext';
import { SearchModal } from '../search/SearchModal';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const communityRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    setOpen(false);
    setCommunityOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!communityOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (communityRef.current && !communityRef.current.contains(e.target as Node)) {
        setCommunityOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCommunityOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [communityOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[#0a2540]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center gap-8 px-5 lg:px-8">
        <Link to="/" aria-label="Erilang home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            if (item.label === 'Community') {
              const isActive = location.pathname.startsWith('/community');
              return (
                <div key={item.to} ref={communityRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setCommunityOpen((v) => !v)}
                    aria-expanded={communityOpen}
                    aria-haspopup="true"
                    className={`eri-snake inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ease-eri ${
                    isActive || communityOpen ? 'text-white' : 'text-muted hover:text-white'}`
                    }>

                    <SnakeBorder radius={999} />
                    {item.label}
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform duration-150 ease-eri ${communityOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true" />

                  </button>

                  <div
                    aria-hidden={!communityOpen}
                    className={`absolute left-1/2 top-full z-50 mt-2 w-80 origin-top rounded-2xl border border-line bg-raised p-2 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-200 ease-eri ${
                    communityOpen ?
                    'pointer-events-auto -translate-x-1/2 translate-y-0 scale-100 opacity-100' :
                    'pointer-events-none -translate-x-1/2 -translate-y-1 scale-95 opacity-0'}`
                    }>
                      <ul className="flex flex-col">
                        {dropdownChannels.map((channel) => {
                          const Icon = CHANNEL_ICONS[channel.icon];
                          return (
                            <li key={channel.name}>
                              <Link
                                to={channel.to}
                                onClick={() => setCommunityOpen(false)}
                                className="eri-snake eri-snake-blue flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-eri hover:bg-surface">

                                <SnakeBorder radius={10} />
                                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} aria-hidden="true" />
                                <span className="min-w-0">
                                  <span className="block text-[13.5px] font-semibold text-white">{channel.name}</span>
                                  <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">
                                    {channel.description}
                                  </span>
                                </span>
                              </Link>
                            </li>);

                        })}
                      </ul>
                      <div className="mt-1 border-t border-line pt-1">
                        <Link
                          to="/community"
                          onClick={() => setCommunityOpen(false)}
                          className="eri-snake eri-snake-blue block rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-accent transition-colors duration-150 ease-eri hover:bg-surface">

                          <SnakeBorder radius={10} />
                          Get involved in the community
                        </Link>
                      </div>
                    </div>
                </div>);

            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                `eri-snake rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ease-eri ${
                isActive ? 'text-white' : 'text-muted hover:text-white'}`

                }>

                <SnakeBorder radius={999} />
                {item.label}
              </NavLink>);

          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="eri-snake eri-snake-blue hidden h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-eri hover:bg-raised hover:text-white md:inline-flex">

            <SnakeBorder radius={999} />
            <SearchIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          {loading ?
          null :
          user ?
          <Link
            to="/account"
            className="eri-snake eri-snake-blue hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 ease-eri hover:bg-raised md:inline-flex">

              <SnakeBorder radius={999} />
              {user.avatar_url ?
            <img src={user.avatar_url} alt="" className="h-6 w-6 rounded-full object-cover" /> :

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-ink">
                  {user.username[0]?.toUpperCase()}
                </span>
            }
              {user.display_name || user.username}
            </Link> :

          <div className="hidden items-center gap-2 md:flex">
              <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-eri hover:text-white">

                Log in
              </Link>
              <Link
              to="/register"
              className="eri-snake eri-snake-blue whitespace-nowrap rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

                <SnakeBorder radius={999} />
                Sign up
              </Link>
            </div>
          }
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="eri-snake eri-snake-blue inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors duration-150 ease-eri hover:bg-raised md:hidden">

            <SnakeBorder radius={999} />
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        aria-label="Mobile"
        aria-hidden={!open}
        className={`overflow-hidden border-line bg-[#0a2540] transition-[max-height,opacity] duration-300 ease-eri md:hidden ${
        open ? 'max-h-[640px] border-t opacity-100' : 'max-h-0 border-t-0 opacity-0'}`
        }>

        <ul className="flex flex-col gap-1 px-5 py-4">
            <li className="pb-1">
              <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-muted">

                <SearchIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                Search
              </button>
            </li>
            {primaryNav.map((item) =>
          <li key={item.to}>
                <Link
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors duration-150 ease-eri ${
              location.pathname === item.to ? 'bg-raised text-white' : 'text-muted'}`
              }>

                  {item.label}
                </Link>
                {item.label === 'Community' ?
            <ul className="mt-1 flex flex-col gap-0.5 pb-1 pl-3">
                    {dropdownChannels.map((channel) =>
              <li key={channel.name}>
                        <Link
                  to={channel.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-[13.5px] text-muted transition-colors duration-150 ease-eri hover:text-white">

                          {channel.name}
                        </Link>
                      </li>
              )}
                  </ul> :
            null}
              </li>
          )}
            {!loading && user ?
          <li className="pt-2">
                <Link
              to="/account"
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium ${
              location.pathname === '/account' ? 'bg-raised text-white' : 'text-muted'}`
              }>

                  My account
                </Link>
              </li> :
          !loading ?
          <>
                <li>
                  <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted">

                    Log in
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-ink">

                    Sign up
                  </Link>
                </li>
              </> :
          null}
          </ul>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>);

}
