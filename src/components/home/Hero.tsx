import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CpuIcon,
  GlobeIcon,
  ServerIcon,
  SmartphoneIcon,
  TerminalIcon } from
'lucide-react';
import { targets } from '../../data/targets';
import { SnakeBorder } from '../SnakeBorder';
import { HeroRobot } from './HeroRobot';

const ICONS = {
  server: ServerIcon,
  terminal: TerminalIcon,
  globe: GlobeIcon,
  cpu: CpuIcon,
  smartphone: SmartphoneIcon
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line py-10 lg:py-14">
      <div className="eri-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <HeroRobot />

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <img src="/hero-crystal-bg.avif" alt="" className="h-full w-full object-cover opacity-20" />
      </div>

      <div className="relative mx-auto max-w-page pl-8 pr-5 sm:pl-12 sm:pr-6 lg:pl-20 lg:pr-8 xl:pl-28 xl:pr-8">
        <div className="eri-card-glow relative overflow-hidden rounded-[2rem] bg-[#0a2540] px-6 py-14 sm:px-10 sm:py-16 lg:bg-transparent lg:px-14 lg:py-20">

          <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>

              <h1 className="text-[clamp(3.75rem,9.5vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-white">
                Erilang
              </h1>
              <p className="mt-5 text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight text-white">
                Readable. Declarative. Accessible.
              </p>

              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-white/70">
                Code should read the way you would explain it out loud. Erilang favors full English
                keywords over dense symbols, designed from the ground up for programmers using screen
                readers — and for everyone else besides.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/docs"
                  className="eri-snake eri-snake-blue inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft">

                  <SnakeBorder radius={999} />
                  Get started
                </Link>
                <span className="rounded-full border border-white/15 px-5 py-3 font-mono text-[13px] text-white/70">
                  <span className="text-accent">$</span> erilang run hello.eri
                </span>
              </div>
            </motion.div>

            <div>
              <ul className="flex flex-col gap-2.5">
                {targets.map((target, index) => {
                  const Icon = ICONS[target.icon];
                  return (
                    <motion.li
                      key={target.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.06 + index * 0.045, ease: [0.23, 1, 0.32, 1] }}>

                      <a
                        href="#why"
                        className="eri-snake eri-snake-always group flex items-center gap-5 rounded-xl border border-white/15 bg-[#0a2540]/70 px-6 py-5 backdrop-blur-sm transition-colors duration-150 ease-eri hover:bg-[#0a2540]/85">

                        <SnakeBorder radius={12} />
                        <Icon className="h-7 w-7 shrink-0 text-white" strokeWidth={1.5} aria-hidden="true" />
                        <span className="text-[17px] font-medium text-white">{target.label}</span>
                        <ArrowRightIcon
                          className="ml-auto h-6 w-6 shrink-0 text-white transition-transform duration-200 ease-eri group-hover:translate-x-1"
                          strokeWidth={2}
                          aria-hidden="true" />

                      </a>
                    </motion.li>);

                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
