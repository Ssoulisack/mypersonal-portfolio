import { SpringOptions } from "framer-motion";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: string;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};
