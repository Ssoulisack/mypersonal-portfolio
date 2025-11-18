import MagicBento from "@/app/components/layout/MagicBento";
import { Hero } from "@/app/components/layout/Hero";
import Works from "@/app/components/layout/Works";
import {Preloading} from "@/app/components/layout/Preloading";
export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 min-h-screen flex flex-col gap-y-2">
        <Preloading />
        <Hero />
        <MagicBento />
        <Works />
      </div>
    </div>
  );
}
