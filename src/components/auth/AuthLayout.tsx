import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../Brand';
import { FloatingShapes } from '../FloatingShapes';

const BULLETS = [
{
  title: 'One account, everywhere',
  body: 'Publish packages, comment on the blog, and post in the forum with a single login.'
},
{
  title: 'No reset links to lose track of',
  body: 'Verification and password resets both use a 6-digit code sent straight to your inbox.'
},
{
  title: 'Built for the CLI first',
  body: 'Log in once here, then publish and yank packages straight from the erilang command line.'
}];


export function AuthLayout({ children }: {children: React.ReactNode;}) {
  return (
    <main className="flex min-h-[calc(100vh-8.5rem)] w-full items-center justify-center bg-neutral-100 px-5 py-10 lg:px-8 lg:py-14">
      <div className="grid w-full max-w-page items-stretch gap-6 lg:grid-cols-[42%_1fr] lg:gap-8">

        <div className="eri-grid relative z-0 hidden flex-col justify-between overflow-hidden rounded-[2rem] bg-[#0a2540] px-10 py-12 shadow-2xl shadow-black/10 lg:flex xl:px-14">
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <img
              src="/modules-card-bg.avif"
              alt=""
              className="h-full w-full object-cover opacity-20" />

          </div>

          <FloatingShapes variant="scattered" />

          <div className="relative">
            <Link to="/" aria-label="Erilang home">
              <Brand />
            </Link>
            <p className="mt-16 max-w-xs text-[28px] font-medium leading-snug text-white">
              Readable.
              <br />
              Declarative.
              <br />
              Accessible.
            </p>
          </div>

          <ul className="relative flex flex-col gap-7">
            {BULLETS.map((b) =>
            <li key={b.title}>
                <p className="text-[14.5px] font-semibold text-white">{b.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{b.body}</p>
              </li>
            )}
          </ul>

          <p className="relative w-fit rounded-full border border-white/15 px-5 py-3 font-mono text-[12.5px] text-white/60">
            <span className="text-accent">$</span> erilang publish
          </p>
        </div>

        <div className="relative z-0 flex items-center justify-center overflow-hidden rounded-[2rem] bg-white px-6 py-16 text-ink shadow-2xl shadow-black/5 sm:px-10">
          <FloatingShapes variant="corners" className="opacity-60" />
          <div className="relative w-full max-w-sm">{children}</div>
        </div>

      </div>
    </main>);

}
