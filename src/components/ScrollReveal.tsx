import React from 'react';
import { useScrollReveal, ScrollRevealOptions } from '../hooks/useScrollReveal';

interface ScrollRevealProps extends ScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = '', ...options }: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(options);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>);

}
