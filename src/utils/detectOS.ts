export type DetectedOS = 'windows' | 'macos' | 'linux' | null;

/** Best-effort client OS detection so we can show the visitor's own download first. */
export function detectOS(): DetectedOS {
  if (typeof navigator === 'undefined') return null;
  const ua = `${navigator.userAgent} ${navigator.platform || ''}`.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) return 'macos';
  if (ua.includes('linux') || ua.includes('x11')) return 'linux';
  return null;
}
