import React from 'react';
import clsx from 'clsx';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={clsx(
        'flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500',
        className
      )}
      {...props}
    />
  );
}
