import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <div className={cn("bg-white rounded-2xl shadow-sm border border-secondary/5 p-6", className)}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' }) => {
  const variants = {
    default: 'bg-secondary/10 text-secondary/60',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest", variants[variant])}>
      {children}
    </span>
  );
};

export const Table = ({ headers, children }: { headers: string[], children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-secondary/5">
          {headers.map((h, i) => (
            <th key={i} className="py-4 px-4 text-[10px] font-black text-secondary/30 uppercase tracking-widest">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-secondary/5">
        {children}
      </tbody>
    </table>
  </div>
);
