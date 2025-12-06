'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, type ReactNode, useState } from 'react';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';

// Blog context for managing blog state
export const BlogContext = createContext<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}>({
  searchQuery: '',
  setSearchQuery: () => {}
});

export function Providers({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MobileMenuProvider>
        <BlogContext.Provider value={{ searchQuery, setSearchQuery }}>
          {children}
        </BlogContext.Provider>
      </MobileMenuProvider>
    </ThemeProvider>
  );
}
