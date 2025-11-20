import React from 'react';
import clsx from 'clsx';

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  const base =
    'inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-300 text-slate-900 bg-white hover:bg-slate-50',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100',
  };

  const sizes = {
    default: 'h-10 px-4 py-2 rounded-md',
    icon: 'h-10 w-10 rounded-md',
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
