'use client';

import {
  BookOpen,
  Boxes,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Folder,
  GitBranch,
  Home,
  Link as LinkIcon,
  type LucideIcon,
  Package,
  Puzzle,
  Repeat,
  Rocket,
  Server,
  Settings,
  Shield,
  Sparkles,
  Target,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { SidebarItem } from '@/lib/content/sidebar';

// Map icon names to Lucide components
const iconComponents: Record<string, LucideIcon> = {
  BookOpen,
  Rocket,
  GitBranch,
  ClipboardList,
  Shield,
  Boxes,
  Link: LinkIcon,
  Terminal,
  FileText,
  Sparkles,
  Puzzle,
  Target,
  Repeat,
  Settings,
  Package,
  Server,
  Folder
};

interface DocsSidebarProps {
  items?: SidebarItem[];
  currentPath?: string;
}

function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Folder;
  return iconComponents[iconName] || Folder;
}

function SidebarItemComponent({
  item,
  level = 0,
  activePath,
  expandedItems,
  onToggle
}: {
  item: SidebarItem;
  level?: number;
  activePath: string;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);
  const isActive = item.path === activePath;
  const isInActivePath = activePath.startsWith(item.path || '');

  const paddingLeft = level * 16 + 12;
  const IconComponent = getIconComponent(item.icon);

  // Render as a link if it has a path
  if (item.path && !hasChildren) {
    return (
      <Link
        href={item.path}
        className={`
          flex items-center gap-3 py-2.5 px-3 rounded-lg text-[15px] leading-snug transition-colors
          ${
            isActive
              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <FileText className="h-4 w-4 flex-shrink-0 opacity-70" />
        <span className="truncate">{item.title}</span>
      </Link>
    );
  }

  // Render as expandable category
  return (
    <div>
      <button
        onClick={() => onToggle(item.id)}
        className={`
          flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-[15px] leading-snug transition-colors text-left
          ${
            isInActivePath && hasChildren
              ? 'text-indigo-700 dark:text-indigo-300 font-semibold'
              : 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <IconComponent className="h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold truncate">{item.title}</span>
        </div>
        {hasChildren &&
          (isExpanded ? (
            <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          ))}
      </button>

      {hasChildren && isExpanded && (
        <div className="mt-1 ml-4 border-l-2 border-gray-200 dark:border-gray-700">
          {item.children?.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              activePath={activePath}
              expandedItems={expandedItems}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocsSidebar({
  items = [],
  currentPath
}: DocsSidebarProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  // Initialize expanded items based on active path
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const expanded = new Set<string>();
    // Expand items that contain the active path
    const expandParents = (items: SidebarItem[], path: string) => {
      for (const item of items) {
        if (item.path && path.startsWith(item.path)) {
          expanded.add(item.id);
        }
        if (item.children) {
          expandParents(item.children, path);
          // If any child is in the path, expand this item
          for (const child of item.children) {
            if (
              expanded.has(child.id) ||
              (child.path && path.startsWith(child.path))
            ) {
              expanded.add(item.id);
            }
          }
        }
      }
    };
    expandParents(items, activePath);
    return expanded;
  });

  // Update expanded items when path changes
  useEffect(() => {
    setExpandedItems((prev) => {
      const expanded = new Set(prev);
      const expandParents = (items: SidebarItem[], path: string) => {
        for (const item of items) {
          if (item.path && path.startsWith(item.path)) {
            expanded.add(item.id);
          }
          if (item.children) {
            expandParents(item.children, path);
            for (const child of item.children) {
              if (
                expanded.has(child.id) ||
                (child.path && path.startsWith(child.path))
              ) {
                expanded.add(item.id);
              }
            }
          }
        }
      };
      expandParents(items, activePath);
      return expanded;
    });
  }, [activePath, items]);

  const handleToggle = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Guard against empty items
  if (!items || items.length === 0) {
    return (
      <nav className="py-6 px-4">
        <Link
          href="/docs"
          className="flex items-center gap-3 px-3 py-2 text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Documentation Home</span>
        </Link>
        <p className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
          Loading navigation...
        </p>
      </nav>
    );
  }

  return (
    <nav className="py-6 px-4">
      {/* Documentation Home Link */}
      <Link
        href="/docs"
        className={`
          flex items-center gap-3 px-4 py-3 mb-5 rounded-lg text-base font-semibold transition-colors
          ${
            activePath === '/docs'
              ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
        `}
      >
        <Home className="h-5 w-5" />
        <span>Documentation</span>
      </Link>

      {/* Sidebar Items */}
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItemComponent
            key={item.id}
            item={item}
            level={0}
            activePath={activePath}
            expandedItems={expandedItems}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </nav>
  );
}
