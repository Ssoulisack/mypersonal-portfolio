"use client";

import { useEffect, useState } from "react";

const Scrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll event listener - direct update for maximum responsiveness
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div className="hide-during-preloading fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
      {/* Background track */}
      <div className="h-[150px] w-[5px] bg-gray-800 rounded-2xl relative overflow-hidden">
        {/* Progress fill - starts from top */}
        <div 
          className="absolute top-0 left-0 w-full rounded-2xl"
          style={{ 
            height: `${scrollProgress}%`,
            opacity: scrollProgress > 0 ? 1 : 0,
            background: 'linear-gradient(to bottom, rgb(88, 101, 220), rgb(88, 101, 240))'
          }}
        />
      </div>
    </div>
  );
};

export default Scrollbar;