import type { ReactNode } from 'react';

interface SelectableCardProps {
  children: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
  className?: string;
}

export default function SelectableCard({
  children,
  isSelected,
  onSelect,
  badge,
  className = '',
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative w-full p-6 rounded-xl border-2 text-left transition-all
        bg-white shadow-sm
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${isSelected 
          ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
        ${className}
      `}
    >
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
          {badge}
        </span>
      )}
      {children}
    </button>
  );
}


