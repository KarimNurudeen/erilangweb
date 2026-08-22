import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { channels, contributionPaths } from '../data/community';
import { CHANNEL_ICONS } from '../components/channelIcons';
import { SnakeBorder } from '../components/SnakeBorder';
import { NewsletterForm } from '../components/NewsletterForm';

const SIGNALS = [
{
  icon: SparklesIcon,
  label: 'Early days',
  body: "We're just past 1.0 — there's still a lot of room to shape what comes next."
}];

const CARD =
'rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 sm:p-12 lg:p-16';

export function Community() {
  return (
    <main className="bg-neutral-100 text-ink">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-16 lg:px-8 lg:py-20">

        <section className={CARD}>
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Get involved in the community
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-neutral-700">
            Erilang just shipped 1.0, and its community is really just getting started — a handful of
            people building the language and the first few trying it out. Ask something in the forum,
            publish a package if you've built one, or subscribe to hear what ships next.
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {SIGNALS.map(({ icon: Icon, label, body }) =>
            <li
              key={label}
              className="flex max-w-xs items-start gap-2.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">

                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" strokeWidth={1.8} aria-hidden="true" />
                <span className="text-[13px] leading-snug text-neutral-600">
                  <span className="block font-bold text-ink">{label}</span>
                  {body}
                </span>
              </li>
            )}
          </ul>
        </section>

        <section className={CARD}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Where the project lives</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
            No separate community platform to track down — these are the only places you need.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.icon];
              const cardClass =
              'eri-snake eri-snake-always flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-150 ease-eri hover:border-neutral-400';

              if (channel.name === 'Newsletter') {
                return (
                  <li key={channel.name} id="newsletter" className="h-full scroll-mt-24">
                    <div className={cardClass}>
                      <SnakeBorder radius={8} />
                      <Icon className="h-8 w-8 text-ink" strokeWidth={1.5} aria-hidden="true" />
                      <span className="mt-6 text-[15px] font-bold">{channel.name}</span>
                      <span className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
                        {channel.description}
                      </span>
                      <div className="mt-4">
                        <NewsletterForm />
                      </div>
                    </div>
                  </li>);

              }

              return (
                <li key={channel.name} className="h-full">
                  <Link to={channel.to} className={cardClass}>
                    <SnakeBorder radius={8} />
                    <Icon className="h-8 w-8 text-ink" strokeWidth={1.5} aria-hidden="true" />
                    <span className="mt-6 text-[15px] font-bold">{channel.name}</span>
                    <span className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
                      {channel.description}
                    </span>
                  </Link>
                </li>);

            })}
          </ul>
        </section>

        <section className={CARD}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get involved today</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">
                There's no source repository to send a pull request to yet — but that's not the same as
                nothing to do. The fastest way in right now is to actually use the language and tell us
                where it breaks.
              </p>
              <Link
                to="/docs/getting-started"
                className="eri-snake eri-snake-blue mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

                <SnakeBorder radius={999} />
                Try the language
              </Link>
            </div>

            <ol className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
              {contributionPaths.map((path) => {
                const isInternal = path.to.startsWith('/');
                const actionContent = (
                  <>
                    <SnakeBorder radius={4} />
                    {path.action}
                    <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </>);

                const actionClass =
                'eri-snake eri-snake-blue inline-flex h-fit shrink-0 items-center gap-1 whitespace-nowrap border-b border-ink pb-0.5 text-[13.5px] font-medium transition-colors duration-150 ease-eri hover:border-accent-deep hover:text-accent-deep';

                return (
                  <li key={path.title} className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-8">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] font-bold">{path.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">{path.body}</p>
                    </div>
                    {isInternal ?
                    <Link to={path.to} className={actionClass}>
                        {actionContent}
                      </Link> :

                    <a href={path.to} className={actionClass}>
                        {actionContent}
                      </a>
                    }
                  </li>);

              })}
            </ol>
          </div>
        </section>

        <section className={CARD}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 lg:p-10">
              <h2 className="text-2xl font-bold tracking-tight">Local meetups</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
                There are no Erilang meetups yet — which means there's no "right" city to start one in.
                If you want to run the first one, online or in person, reach out and we'll help you
                organize it.
              </p>
              <a
                href="#"
                className="eri-snake eri-snake-blue mt-6 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-[14.5px] font-semibold transition-colors duration-150 ease-eri hover:bg-ink hover:text-white">

                <SnakeBorder radius={999} />
                Start a meetup
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-8 lg:p-10">
              <h2 className="text-2xl font-bold tracking-tight">Code of conduct</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
                Every Erilang space — the forum, and anything that follows it — runs under the same code
                of conduct. Reports are handled confidentially.
              </p>
              <a
                href="#"
                className="eri-snake eri-snake-blue mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14.5px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

                <SnakeBorder radius={999} />
                Read the code of conduct
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>);

}
