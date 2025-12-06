import { loadConfig } from '@/lib/content/resolver';
import Header from './Header';

interface Section {
  id: string;
  name: string;
  title?: string;
}

interface HeaderContainerProps {
  sections: Section[];
  orderedSectionIds: string[];
}

export default async function HeaderContainer({
  sections,
  orderedSectionIds
}: HeaderContainerProps) {
  // Load config on the server
  const _config = loadConfig();

  // Create a map for O(1) lookup of order indices
  const orderMap = new Map(orderedSectionIds.map((id, index) => [id, index]));

  // Process sections with config ordering
  const orderedSections = sections
    .map((section) => ({
      ...section,
      // Title case the section title or ID if no title is provided
      title:
        section.title ||
        section.id
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      // Use order from orderedSectionIds if available, otherwise use Infinity
      order: orderMap.get(section.id) ?? Infinity
    }))
    .sort((a, b) => a.order - b.order);

  return <Header sections={orderedSections} />;
}
