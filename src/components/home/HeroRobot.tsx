import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LINES = [
"Hi! I read like English, using full keywords instead of dense symbols.",
"Built for accessibility first, especially screen readers.",
"INCLUDE brings in another file directly, with no binding layer.",
"Try `erilang run hello.eri` and you're building in minutes.",
"TRY, CATCH, and RAISE let errors carry a plain-language message.",
"ASYNC DEFINE and AWAIT let you make network calls without blocking.",
"Real classes, real errors, real async. That's Erilang."];


/**
 * A large photo-real robot mascot standing in the hero section's left margin,
 * scoped to the hero only (not a global fixed element). It's a single flat
 * image with no separable layers, so instead of animating individual limbs
 * it's animated as a lively whole — bobbing, swaying, and gently breathing.
 * A speech bubble beside it cycles through lines about the language.
 */
export function HeroRobot() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLineIndex((i) => (i + 1) % LINES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-y-0 -left-10 z-10 hidden items-end lg:flex xl:-left-4"
      aria-hidden="true">

      <div className="relative h-[42%] shrink-0 xl:h-[50%] 2xl:h-[60%]" style={{ aspectRatio: '0.7' }}>
        <motion.img
          src="/robot-mascot.png"
          alt=""
          className="h-full w-full object-cover drop-shadow-[0_24px_28px_rgba(0,0,0,0.5)]"
          style={{ objectPosition: '52% 6%' }}
          animate={{
            y: [0, -14, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }} />


        <div className="absolute left-[58%] top-[6%] hidden w-44 origin-bottom-left -rotate-6 xl:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={lineIndex}
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-2xl border border-white/15 bg-[#0a2540] px-3.5 py-2.5 text-[11.5px] leading-snug text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]">

              {LINES[lineIndex]}
              <span
                className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 border-b border-r border-white/15 bg-[#0a2540]"
                aria-hidden="true" />

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>);

}
