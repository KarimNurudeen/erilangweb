import React from 'react';
import { Link } from 'react-router-dom';
import { channels } from '../../data/community';
import { CHANNEL_ICONS } from '../channelIcons';
import { SnakeBorder } from '../SnakeBorder';
import { NewsletterForm } from '../NewsletterForm';
import { ScrollReveal } from '../ScrollReveal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PREVIEW_CHANNEL_NAMES = ['Forum', 'Package index', 'Releases', 'Newsletter'];
const featuredChannels = PREVIEW_CHANNEL_NAMES.
map((name) => channels.find((channel) => channel.name === name)).
filter((channel): channel is (typeof channels)[number] => Boolean(channel));

export function CommunityPreview() {
  const listRef = useScrollReveal<HTMLUListElement>();

  return (
    <section className="bg-neutral-100 py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 lg:px-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 sm:p-12 lg:p-16">
          <ScrollReveal className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                Building this
                <br />
                in the open
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">
                Erilang just shipped 1.0, so the community is really just the people making it and the
                first few trying it out. Ask something in the forum, publish a package, or subscribe for
                release notes.
              </p>
              <Link
                to="/community"
                className="eri-snake eri-snake-blue mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 ease-eri hover:bg-neutral-800">

                <SnakeBorder radius={999} />
                Join in
              </Link>
            </div>

            <ul ref={listRef} className="grid gap-4 sm:grid-cols-2">
              {featuredChannels.map((channel) => {
                const Icon = CHANNEL_ICONS[channel.icon];
                if (channel.name === 'Newsletter') {
                  return (
                    <li key={channel.name} className="h-full">
                      <div className="eri-snake eri-snake-always flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                        <SnakeBorder radius={8} />
                        <Icon className="h-7 w-7 text-ink" strokeWidth={1.6} aria-hidden="true" />
                        <span className="mt-5 text-[15px] font-bold text-ink">{channel.name}</span>
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
                    <Link
                      to={channel.to}
                      className="eri-snake eri-snake-always flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-150 ease-eri hover:border-neutral-400">

                      <SnakeBorder radius={8} />
                      <Icon className="h-7 w-7 text-ink" strokeWidth={1.6} aria-hidden="true" />
                      <span className="mt-5 text-[15px] font-bold text-ink">{channel.name}</span>
                      <span className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
                        {channel.description}
                      </span>
                    </Link>
                  </li>);

              })}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}
