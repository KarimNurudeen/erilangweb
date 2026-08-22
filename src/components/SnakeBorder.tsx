import React, { useEffect, useRef, useState } from 'react';

interface SnakeBorderProps {
  radius?: number;
}

/**
 * Traces a glowing dash around the host element's actual border at constant speed.
 *
 * Three things had to be corrected versus the obvious approach:
 * - `rx`/`ry` clamp independently against width/2 and height/2, so a huge "pill" radius
 *   on a wide flat button renders as a stretched ellipse. CSS border-radius clamps both
 *   to the same min(width, height)/2, which is what actually makes `rounded-full` a
 *   clean stadium. We replicate that by measuring the host and clamping ourselves.
 * - SVG's `pathLength` normalization for dasharray/dashoffset renders incorrectly on
 *   rounded rects/circles in Chromium (the dash collapses to a disconnected blob), so
 *   the perimeter is computed from the measured box instead of relying on it.
 * - Driving the motion with a CSS `@keyframes` whose value depends on a custom property
 *   set via inline style hits a separate Chromium repaint bug: the animation timeline
 *   runs (`currentTime` advances) but the pixels never update, so it looks frozen —
 *   Safari doesn't have this bug, which is why it only ever broke in Chrome. The Web
 *   Animations API below drives the same motion with literal numbers instead, which
 *   sidesteps the bug entirely.
 *
 * Requires the host to have the `eri-snake` class.
 */
export function SnakeBorder({ radius = 12 }: SnakeBorderProps) {
  const rectRef = useRef<SVGRectElement>(null);
  const [radiusPx, setRadiusPx] = useState(radius);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const el = rectRef.current;
    const host = el?.closest('.eri-snake') as HTMLElement | null;
    if (!el || !host) return;

    const measure = () => {
      const { width, height } = host.getBoundingClientRect();
      const r = Math.min(radius, width / 2, height / 2);
      setRadiusPx(r);
      setLength(2 * (width + height) - 8 * r + 2 * Math.PI * r);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [radius]);

  useEffect(() => {
    const el = rectRef.current;
    if (!el || !length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const anim = el.animate(
      [{ strokeDashoffset: 0 }, { strokeDashoffset: -length }],
      { duration: 7000, iterations: Infinity, easing: 'linear' }
    );
    return () => anim.cancel();
  }, [length]);

  const dash = length * 0.12;
  const gap = length - dash;

  return (
    <svg className="eri-snake-svg" aria-hidden="true" focusable="false">
      <rect
        ref={rectRef}
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radiusPx}
        ry={radiusPx}
        vectorEffect="non-scaling-stroke"
        style={
        length ?
        ({ strokeDasharray: `${dash} ${gap}` } as React.CSSProperties) :
        { opacity: 0 }
        } />

    </svg>);

}
