export interface TocItem {
  id: string;
  label: string;
  href: string;
  level: number; // 0 for top level, 1 for nested
  icon?: string; // Optional emoji or icon
  subContent?: TocItem[];
}

export interface TocData {
  items: TocItem[];
}

