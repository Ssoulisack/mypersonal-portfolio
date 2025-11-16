import type { IconType } from "react-icons";

interface TimelineEntryProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  isLeft: boolean;
  icon: IconType;
}

interface TimelineItem {
    date: string;
    title: string;
    subtitle: string;
    description: string;
    icon: IconType;
}
export type { TimelineEntryProps, TimelineItem };