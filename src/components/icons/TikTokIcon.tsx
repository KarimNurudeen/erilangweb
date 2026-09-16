import React from 'react';

interface TikTokIconProps {
  className?: string;
}

/** lucide-react has no TikTok glyph, so this fills the gap with a matching 24x24 viewBox. */
export function TikTokIcon({ className }: TikTokIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">

      <path d="M16.6 5.82c-.83-.9-1.29-2.07-1.29-3.32h-3.06v13.44a3.05 3.05 0 0 1-5.49 1.84 3.05 3.05 0 0 1 3.4-4.83v-3.1a6.1 6.1 0 1 0 6.1 6.1V8.53a8.16 8.16 0 0 0 4.75 1.52V6.99a4.85 4.85 0 0 1-4.41-1.17Z" />
    </svg>);

}
