import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Earth from '../ui/globe'
import { Button } from '@/app/components/ui/button'
import { Clipboard, Check, Mail } from 'lucide-react'
import { INFORMATION } from '@/app/core/config/constants'


function GlobeCard() {
  // Discord purple theme: #5076fe / hsl(250, 98%, 67%)
  // Converted to normalized RGB [0-1]
  const email = INFORMATION.EMAIL || '';
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first (requires HTTPS or localhost)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers/mobile - create temporary textarea
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
      }
      
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setIsCopied(false);
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy email:', error);
      // Still show toast even if copy fails
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

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
      <div className="p-8 lg:pt-16 overflow-visible relative w-full h-full min-h-[400px]">
        <div className="flex flex-col items-center justify-center relative z-10">
          <p className="font-instrument-serif text-sm lg:text-xl 2xl:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)">Let's work together on you next project </p>
          <p className="text-xs lg:text-sm text-gray-500">I'm available for freelance projects</p>
          <Button onClick={handleCopy} className="flex items-center bg-gray-950 border border-gray-900 hover:cursor-pointer hover:bg-gray-900 mt-4">
            <span className="text-sm text-white/50">{email}</span>
            {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4 text-white/50" />}
          </Button>
        </div>
        <div className="absolute -right-0 -bottom-50 mx-auto flex h-full w-full max-w-[450px] items-center justify-center transition-all duration-700 hover:scale-105 md:-right-90 md:-bottom-38 md:-translate-y-8 md:max-w-[550px] lg:-right-18 lg:-bottom-48 lg:-translate-y-8 xl:-right-18 xl:-bottom-48 xl:-translate-y-8 z-0">
          <Earth
            baseColor={[0.314, 0.463, 0.996]}  // Discord purple base
            markerColor={[0.314, 0.463, 0.996]}  // Discord purple marker
            glowColor={[0.314, 0.463, 0.996]}    // Discord purple glow
          />
        </div>
      </div>

      {/* Toast Notification - Rendered via Portal to document body */}
      {showToast && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed right-6 bottom-6 z-[9999] animate-in slide-in-from-right-2 fade-in-0 transition-all duration-500"
          style={{ position: 'fixed' }}
        >
          <div className="flex items-center gap-3 w-full max-w-xs p-4 rounded-lg bg-[rgba(31,30,30,0.9)] border border-[rgba(66,66,66,0.3)] backdrop-blur-[2.9px] shadow-lg">
            <div className="flex items-center gap-2 w-full">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div className="text-sm text-[var(--nav-fg)]">Email address copied successfully</div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-black hover:!bg-gray-100 hover:cursor-pointer dark:!bg-white dark:!text-black"
              onClick={() => window.location.href = `mailto:${email}`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GlobeCard
