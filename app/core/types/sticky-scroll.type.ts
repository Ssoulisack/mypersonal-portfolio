
export interface TechStackItem {
  icon?: string;
  name: string;
  url?: string;
}

export interface KeyFeature {
  title: string;
  description?: string;
}

export interface Challenge {
  title: string;
  description?: string;
}

export interface WorkItems {
  id: number;
  title: string;
  description: string;
  content?: string;
  url?: string
  keyFeatures?: KeyFeature[];
  techStack?: TechStackItem[];
  challenges?: Challenge[];
  outcome?: string;
  colorCode?: string;
}

export interface StickyScrollProps {
  content: WorkItems[];
  contentClassName?: string;
  limit?: number;
}

export interface ScrollBoundary {
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollingDown: boolean;
  scrollingUp: boolean;
}

export interface CardSectionProps {
  item: WorkItems;
  isActive: boolean;
}

export interface ActiveCardDisplayProps {
  activeItem: WorkItems;
  activeCard: number;
}

export interface ScrollableCardListProps {
  content: WorkItems[];
  activeCard: number;
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  setActiveCard: (index: number) => void;
}
