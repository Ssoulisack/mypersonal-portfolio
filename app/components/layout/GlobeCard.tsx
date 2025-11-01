import React from 'react'
import Earth from '../ui/globe'

function GlobeCard() {
  // Discord purple theme: #5076fe / hsl(250, 98%, 67%)
  // Converted to normalized RGB [0-1]
  return (
    <>
      {/* <div className='overflow-visible relative'>
        <Earth
          baseColor={[0.314, 0.463, 0.996]}  // Discord purple base
          markerColor={[0.314, 0.463, 0.996]}  // Discord purple marker
          glowColor={[0.314, 0.463, 0.996]}    // Discord purple glow
          mapSamples={80000}  // Higher quality map
          mapBrightness={8}   // Brighter map colors
        />
      </div> */}
      <div className="bg-background flex flex-col items-center justify-center overflow-visible relative w-full h-full min-h-[400px]">
          <div className="absolute -right-0 -bottom-50 mx-auto flex h-full w-full max-w-[450px] items-center justify-center transition-all duration-700 hover:scale-105 md:-right-90 md:-bottom-38 md:-translate-y-8 md:max-w-[550px] lg:-right-18 lg:-bottom-48 lg:-translate-y-8 xl:-right-18 xl:-bottom-48 xl:-translate-y-8">
            <Earth
              baseColor={[0.314, 0.463, 0.996]}  // Discord purple base
              markerColor={[0.314, 0.463, 0.996]}  // Discord purple marker
              glowColor={[0.314, 0.463, 0.996]}    // Discord purple glow
            />
          </div>
      </div>

    </>
  )
}

export default GlobeCard
