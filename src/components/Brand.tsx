import React from 'react';

interface BrandProps {
  showVersion?: boolean;
}

export function Brand({ showVersion = true }: BrandProps) {
  return (
    <span className="flex items-center gap-2">
      <img src="/erilang-logo-reversed.png" alt="Erilang" className="h-9 w-auto shrink-0" />
      {showVersion ?
      <span className="mt-4 font-mono text-[10px] font-medium text-muted">1.0</span> :
      null}
    </span>);

}