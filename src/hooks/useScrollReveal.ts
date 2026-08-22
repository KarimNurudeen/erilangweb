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

    const ctx = gsap.context(() => {
      gsap.set(animTargets, { opacity: 0, y });
      gsap.to(animTargets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse'
        }
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
