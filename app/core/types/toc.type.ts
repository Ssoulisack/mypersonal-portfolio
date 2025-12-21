export interface TocItem {
  id: number;
  label: string;
  href: string;
  level: number; // 0 for top level, 1 for nested
  icon?: string; // Optional emoji or icon
}

export interface TocData {
  items: TocItem[];
}

