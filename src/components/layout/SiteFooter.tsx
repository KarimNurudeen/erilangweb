import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, MessagesSquareIcon, RssIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import { Brand } from '../Brand';
import { footerGroups } from '../../data/navigation';
import { SnakeBorder } from '../SnakeBorder';
import { FloatingShapes } from '../FloatingShapes';

const socials = [
{ label: 'GitHub', Icon: GithubIcon, to: '#' },
{ label: 'Forum', Icon: MessagesSquareIcon, to: '/forum' },
{ label: 'X', Icon: TwitterIcon, to: '#' },
{ label: 'YouTube', Icon: YoutubeIcon, to: '#' },
{ label: 'Blog', Icon: RssIcon, to: '/blog' }];


export function SiteFooter() {
  return (
    <footer className="eri-sand border-t border-line">
      <div className="relative z-0 mx-auto max-w-page overflow-hidden px-5 py-14 lg:px-8">
        <FloatingShapes variant="corners" className="opacity-30" />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Brand showVersion={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              An open source, general-purpose language for data science, backend services, CLI
              tools, and everyday automation.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map(({ label, Icon, to }) =>
              <li key={label}>
                  <Link
                  to={to}
                  aria-label={label}
                  className="eri-snake eri-snake-blue inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-150 ease-eri hover:border-accent hover:text-accent">

                    <SnakeBorder radius={999} />
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) =>
            <div key={group.title}>
                <h2 className="text-[13px] font-semibold text-white">{group.title}</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) =>
                <li key={link.label}>
                      <Link
                    to={link.to}
                    className="eri-snake eri-snake-blue text-sm text-muted transition-colors duration-150 ease-eri hover:text-white">

                        <SnakeBorder radius={4} />
                        {link.label}
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Erilang is a new, actively developed language.</p>
          <p>© 2026 The Erilang Project</p>
        </div>
      </div>
    </footer>);

}