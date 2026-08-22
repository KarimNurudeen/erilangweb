import React from 'react';

export function DocsContentCard({ children }: {children: React.ReactNode;}) {
  return (
    <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:py-8 lg:pr-8">
      <div className="rounded-2xl bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-neutral-200 sm:p-10 lg:p-14">
        {children}
      </div>
    </div>);

}
