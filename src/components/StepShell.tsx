import type { ReactNode } from 'react';

interface StepShellProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function StepShell({ children, title, description }: StepShellProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
          Security Setup
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}


