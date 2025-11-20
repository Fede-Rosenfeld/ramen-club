import React from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export function Select({ value, onValueChange, children }) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

export function SelectTrigger({ className, ...props }) {
  // No hace falta en esta versión simplificada
  return <div className={clsx(className)} {...props} />;
}

export function SelectValue(props) {
  return <span {...props} />;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
