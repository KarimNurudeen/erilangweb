import React from 'react';

interface FloatingShapesProps {
  variant?: 'scattered' | 'corners';
  className?: string;
}

export function FloatingShapes({ variant = 'scattered', className = '' }: FloatingShapesProps) {
  if (variant === 'corners') {
    return (
      <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden="true">
        <div
          className="eri-shape-sphere-striped eri-float absolute -top-8 -right-8 h-24 w-24"
          style={
          {
            '--eri-float-duration': '10s',
            '--eri-float-y': '-12px',
            '--eri-float-rot-from': '-3deg',
            '--eri-float-rot-to': '5deg'
          } as React.CSSProperties
          } />

        <div
          className="eri-shape-sphere eri-float absolute -top-2 right-16 h-8 w-8"
          style={
          {
            '--eri-float-duration': '7s',
            '--eri-float-delay': '0.5s',
            '--eri-float-y': '-9px'
          } as React.CSSProperties
          } />

        <div
          className="eri-shape-pyramid eri-float absolute -bottom-6 -left-6 h-16 w-[4.5rem]"
          style={
          {
            '--eri-float-duration': '11s',
            '--eri-float-delay': '0.9s',
            '--eri-float-y': '-13px',
            '--eri-float-rot-from': '3deg',
            '--eri-float-rot-to': '-4deg'
          } as React.CSSProperties
          } />

        <div
          className="eri-shape-sphere eri-float absolute bottom-10 left-24 h-5 w-5"
          style={
          {
            '--eri-float-duration': '6s',
            '--eri-float-delay': '1.3s',
            '--eri-float-y': '-8px'
          } as React.CSSProperties
          } />

      </div>);

  }

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden="true">
      <div
        className="eri-shape-sphere-striped eri-float absolute -bottom-10 -right-10 h-40 w-40"
        style={
        {
          '--eri-float-duration': '12s',
          '--eri-float-y': '-14px',
          '--eri-float-rot-from': '-4deg',
          '--eri-float-rot-to': '4deg'
        } as React.CSSProperties
        } />

      <div
        className="eri-shape-sphere-striped eri-float absolute right-[6%] top-[16%] h-20 w-20"
        style={
        {
          '--eri-float-duration': '8s',
          '--eri-float-delay': '0.4s',
          '--eri-float-y': '-18px',
          '--eri-float-rot-from': '2deg',
          '--eri-float-rot-to': '-6deg'
        } as React.CSSProperties
        } />

      <div
        className="eri-shape-sphere eri-float absolute right-[32%] top-[7%] h-10 w-10"
        style={
        {
          '--eri-float-duration': '9s',
          '--eri-float-delay': '1.1s',
          '--eri-float-y': '-12px'
        } as React.CSSProperties
        } />

      <div
        className="eri-shape-sphere eri-float absolute right-[46%] top-[42%] h-3.5 w-3.5"
        style={
        {
          '--eri-float-duration': '6s',
          '--eri-float-delay': '0.2s',
          '--eri-float-y': '-9px'
        } as React.CSSProperties
        } />

      <div
        className="eri-shape-pyramid eri-float absolute right-[18%] top-[52%] h-16 w-[4.5rem]"
        style={
        {
          '--eri-float-duration': '10s',
          '--eri-float-delay': '0.7s',
          '--eri-float-y': '-15px',
          '--eri-float-rot-from': '-3deg',
          '--eri-float-rot-to': '5deg'
        } as React.CSSProperties
        } />

      <div
        className="eri-shape-pyramid eri-float absolute right-[52%] top-[28%] h-9 w-10 opacity-80"
        style={
        {
          '--eri-float-duration': '7s',
          '--eri-float-delay': '1.6s',
          '--eri-float-y': '-10px',
          '--eri-float-rot-from': '4deg',
          '--eri-float-rot-to': '-3deg'
        } as React.CSSProperties
        } />

    </div>);

}
