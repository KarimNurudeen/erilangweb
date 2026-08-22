import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, id, className = '', ...props }: TextFieldProps) {
  const fieldId = id || props.name;
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-[13.5px] font-medium text-ink">
        {label}
      </label>
      <input
        id={fieldId}
        {...props}
        className={`w-full rounded-xl border border-neutral-300 bg-neutral-50/60 px-3.5 py-2.5 text-[14.5px] text-ink placeholder:text-neutral-400 transition-shadow duration-150 ease-eri focus:border-accent-deep focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/25 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500 ${className}`} />

    </div>);

}
