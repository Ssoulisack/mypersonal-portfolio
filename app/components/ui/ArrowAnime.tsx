import { ArrowRight } from "lucide-react";

interface AnimatedArrowProps {
    ArrowClass?: string;
    MainClass?: string;
}

// Animated arrow icon component
export const AnimatedArrow = ({ ArrowClass, MainClass }: AnimatedArrowProps) => (
    <div className={`size-[25px] overflow-hidden border border-neutral-600 rounded-full transition-all duration-500 group-hover:bg-neutral-20 ${MainClass}`}>
      <div className="-translate-x-1/2 flex w-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
        <span className="flex size-6">
          <ArrowRight className={`m-auto size-[14px] ${ArrowClass}`} aria-hidden="true" />
        </span>
        <span className="flex size-6">
          <ArrowRight className={`m-auto size-[14px] ${ArrowClass}`} aria-hidden="true" />
        </span>
      </div>
    </div>
  );