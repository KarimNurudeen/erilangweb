import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../../lib/lenis';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        if (lenis) lenis.scrollTo(el, { immediate: true });else
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });else
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
