import React from 'react';
import { NavLink } from 'react-router-dom';
import { docsSidebar } from '../../data/docs';

export function DocsSidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 px-6 py-8 lg:block">
      <nav
        aria-label="Documentation"
        className="h-full overflow-y-auto rounded-2xl bg-[#0a2540] py-6 shadow-xl shadow-ink/10">

        {docsSidebar.map((section) =>
        <div key={section.title} className="mb-5">
            <h2 className="mb-1 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              {section.title}
            </h2>
            <ul className="px-3">
              {section.items.map((item) =>
            <li key={item.slug || 'home'}>
                  <NavLink
                to={item.slug ? `/docs/${item.slug}` : '/docs'}
                end={item.slug === ''}
                className={({ isActive }) =>
                `block w-full rounded-lg border px-3.5 py-2 text-left text-[14px] transition-colors duration-150 ease-eri ${
                isActive ?
                'border-red-500 bg-white font-semibold text-ink' :
                'border-red-500/50 text-white/65 hover:border-red-500 hover:bg-white/10 hover:text-white'}`
                }>

                    {item.label}
                  </NavLink>
                </li>
            )}
            </ul>
          </div>
        )}
      </nav>
    </aside>);

}
