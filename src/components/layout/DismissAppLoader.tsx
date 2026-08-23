import { useEffect } from 'react';

export function DismissAppLoader() {
  useEffect(() => {
    const loader = document.getElementById('app-loader');
    if (!loader) return;

    const remove = () => loader.remove();
    loader.addEventListener('transitionend', remove, { once: true });
    loader.classList.add('app-loader-hidden');

    const fallback = window.setTimeout(remove, 700);
    return () => window.clearTimeout(fallback);
  }, []);

  return null;
}
