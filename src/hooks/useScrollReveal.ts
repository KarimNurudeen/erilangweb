import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  targets?: 'self' | 'children';
}

export function useScrollReveal<T extends HTMLElement>({
  y = 32,
  duration = 0.7,
  delay = 0,
  stagger = 0.08,
  start = 'top 85%',
  once = true,
  targets = 'children'
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animTargets =
    targets === 'children' && el.children.length > 0 ? Array.from(el.children) : [el];

    if (reduceMotion) {
      gsap.set(animTargets, { opacity: 1, y: 0 });
      return;
    }

    // Fast touch-scroll flicks can carry a reader past a section before a slower,
    // desktop-tuned fade-in finishes — trigger earlier and resolve faster on small screens
    // so the reveal has already landed by the time the section leaves the viewport.
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const effectiveY = isMobile ? Math.min(y, 16) : y;
    const effectiveDuration = isMobile ? Math.min(duration, 0.35) : duration;
    const effectiveStagger = isMobile ? Math.min(stagger, 0.04) : stagger;
    const effectiveStart = isMobile ? 'top 98%' : start;

    const ctx = gsap.context(() => {
      gsap.set(animTargets, { opacity: 0, y: effectiveY });
      gsap.to(animTargets, {
        opacity: 1,
        y: 0,
        duration: effectiveDuration,
        delay,
        stagger: effectiveStagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: effectiveStart,
          toggleActions: once ? 'play none none none' : 'play none none reverse'
        }
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
