import type { ReactNode } from "react";

export interface StickyScrollContentItem {
  title: string;
  description: string;
  content?: ReactNode;
}

export interface StickyScrollProps {
  content: StickyScrollContentItem[];
  contentClassName?: string;
}

export interface ScrollBoundary {
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollingDown: boolean;
  scrollingUp: boolean;
}