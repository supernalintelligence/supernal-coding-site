'use client';

import { Grid2x2, Grid3x3, List } from 'lucide-react';
import type React from 'react';

export type ViewType = 'cards' | 'list' | 'icons';

interface ViewTypeSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({
  currentView,
  onViewChange,
  className = ''
}) => {
  const viewOptions = [
    { type: 'cards' as ViewType, icon: Grid2x2, label: 'Cards' },
    { type: 'list' as ViewType, icon: List, label: 'List' },
    { type: 'icons' as ViewType, icon: Grid3x3, label: 'Icons' }
  ];

  return (
    <div
      className={`flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}
    >
      {viewOptions.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onViewChange(type)}
          className={`
            flex items-center justify-center p-2 rounded-md transition-all duration-200
            ${
              currentView === type
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }
          `}
          title={label}
          aria-label={`Switch to ${label.toLowerCase()} view`}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
};

export default ViewTypeSelector;
