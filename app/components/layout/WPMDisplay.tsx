"use client"

import React, { useState } from 'react'
import { useWPMData } from '@/app/hooks/useWPMData'

interface WPMDisplayProps {
  uid?: string
  showChart?: boolean
  autoRefresh?: boolean
  /**
   * Visual presentation. "card" renders its own surface; "plain" lets parent card (e.g., MagicBento) provide the background.
   */
  variant?: 'card' | 'plain'
}

export function WPMDisplay({ showChart = true, variant = 'card' }: WPMDisplayProps) {
  const { data: wpmData, loading, error, refetch, latestResult } = useWPMData()
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use the latest result from the API
  const wpm = latestResult?.wpm ?? 0
  const rawWpm = latestResult?.rawWpm ?? 0
  const accuracy = latestResult?.acc ?? 0
  const consistency = latestResult?.consistency ?? 0
  const testDuration = latestResult?.testDuration ?? 0
  const isPersonalBest = latestResult?.isPb ?? false
  const mode = latestResult?.mode ?? 'time'
  const mode2 = latestResult?.mode2 ?? '60'
  const timestamp = latestResult?.timestamp ? new Date(latestResult.timestamp) : null

  // Transform charStats array to object
  const charStats = latestResult?.charStats ? {
    correct: latestResult.charStats[0] || 0,
    incorrect: latestResult.charStats[1] || 0,
    extra: latestResult.charStats[2] || 0,
    missed: latestResult.charStats[3] || 0
  } : null

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading typing data...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-destructive text-xl mr-2">⚠️</div>
          <div>
            <h3 className="text-destructive font-semibold">Error Loading Data</h3>
            <p className="text-destructive/80 text-xs">{error}</p>
            <button
              onClick={refetch}
              className="mt-2 px-3 py-1 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded text-xs border border-destructive/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No data state
  if (!latestResult) {
    return (
      <div className="bg-muted border border-border rounded-lg p-4">
        <p className='text-muted-foreground'>No typing data available. Please try again later.</p>
      </div>
    )
  }

  // Calculate additional stats from results array
  const testsStarted = wpmData ? wpmData.length : 0
  const testsCompleted = wpmData ? wpmData.length : 0
  const totalTimeTyping = wpmData ? wpmData.reduce((total, result) => total + result.testDuration, 0) : 0
  
  // Format time as HH:MM:SS (without .00 seconds)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Get test results by mode and duration from array
  const getTestResult = (testMode: string, duration: string) => {
    if (wpmData && wpmData.length > 0) {
      const result = wpmData.find(r => r.mode === testMode && r.mode2 === duration)
      return result ? { wpm: result.wpm, acc: result.acc, isPb: result.isPb } : null
    }
    return null
  }

  // Success state - Display the data
  const containerClass =
    variant === 'plain'
      ? "w-full bg-background rounded-none shadow-none text-white"
      : "w-full bg-background rounded-lg p-4 shadow-lg text-white"

  return (
    <div className={containerClass}>
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        </div>
        <div>
          <div className="text-xs text-gray-400">MonkeyType</div>
        </div>
        <div className="ml-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">tests started</div>
            <div className="text-2xl font-bold">{testsStarted}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">tests completed</div>
            <div className="text-2xl font-bold">{testsCompleted}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">time typing</div>
            <div className="text-2xl font-bold">{formatTime(totalTimeTyping)}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold">{testsCompleted}</span>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((testsCompleted / Math.max(testsCompleted, 296)) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">{testsCompleted}/296</span>
        </div>
      </div>

      {/* Test Results Table */}
      <div className="grid grid-cols-2 gap-6">
        {/* Time-based tests */}
        <div>
          <div className="grid grid-cols-4 gap-2 mb-2 text-xs text-gray-400">
            <div>15 seconds</div>
            <div>30 seconds</div>
            <div>60 seconds</div>
            <div>120 seconds</div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-1">
            {['15', '30', '60', '120'].map((duration) => {
              const result = getTestResult('time', duration)
              const isCurrentTest = mode === 'time' && mode2 === duration
              return (
                <div key={duration} className="text-center">
                  <div className={`text-2xl font-bold ${
                    result?.isPb ? 'text-yellow-400' : 
                    isCurrentTest ? 'text-blue-400' : 
                    result ? 'text-white' : 'text-gray-500'
                  }`}>
                    {result ? Math.round(result.wpm) : '-'}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
            {['15', '30', '60', '120'].map((duration) => {
              const result = getTestResult('time', duration)
              return (
                <div key={duration} className="text-center">
                  {result ? `${Math.round(result.acc)}%` : '-'}
                </div>
              )
            })}
          </div>
        </div>

        {/* Word-based tests */}
        <div>
          <div className="grid grid-cols-4 gap-2 mb-2 text-xs text-gray-400">
            <div>10 words</div>
            <div>25 words</div>
            <div>50 words</div>
            <div>100 words</div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-1">
            {['10', '25', '50', '100'].map((wordCount) => {
              const result = getTestResult('words', wordCount)
              const isCurrentTest = mode === 'words' && mode2 === wordCount
              return (
                <div key={wordCount} className="text-center">
                  <div className={`text-2xl font-bold ${
                    result?.isPb ? 'text-yellow-400' : 
                    isCurrentTest ? 'text-blue-400' : 
                    result ? 'text-white' : 'text-gray-500'
                  }`}>
                    {result ? Math.round(result.wpm) : '-'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Personal Best Indicator */}
      {isPersonalBest && (
        <div className="mt-4 text-center">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            PERSONAL BEST
          </span>
        </div>
      )}

      {/* Additional Stats */}
      {showChart && (
        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-gray-400">Consistency</div>
              <div className="font-bold">{consistency.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-gray-400">Raw WPM</div>
              <div className="font-bold">{rawWpm.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-gray-400">Characters</div>
              <div className="font-bold">
                {charStats ? `${charStats.correct}/${charStats.incorrect}/${charStats.extra}/${charStats.missed}` : '-'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}