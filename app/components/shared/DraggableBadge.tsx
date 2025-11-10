'use client'

import {
  useState,
  useRef,
  useId,
  PointerEvent,
  ReactNode,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react'

interface DraggableBadgeProps {
  label?: string
  className?: string
  wrapperClassName?: string
  icon?: ReactNode
  initialOffset?: { x: number; y: number }
  rotationDeg?: number
  rotationSpeed?: number // degrees per second
  constrainToParent?: boolean
}

interface DragState {
  pointerId: number | null
  startPointer: { x: number; y: number }
  startPosition: { x: number; y: number }
}

const defaultIcon = (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rotate-45 fill-white text-white opacity-80"
    aria-hidden="true"
  >
    <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
  </svg>
)

export function DraggableBadge({
  label = 'OPEN TO WORK · OPEN TO WORK ·',
  className = '',
  wrapperClassName = '',
  icon = defaultIcon,
  initialOffset = { x: 0, y: 0 },
  rotationDeg = 160,
  rotationSpeed = 15,
  constrainToParent = true,
}: DraggableBadgeProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const dragState = useRef<DragState>({
    pointerId: null,
    startPointer: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  })
  const badgeRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const containerSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const badgeSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const angleRef = useRef(0)
  const curveId = useId()

  const clampPosition = useCallback(
    (x: number, y: number) => {
      if (!constrainToParent) {
        return { x, y }
      }

      const { width: containerWidth, height: containerHeight } = containerSizeRef.current
      const { width: badgeWidth, height: badgeHeight } = badgeSizeRef.current

      if (!containerWidth || !containerHeight || !badgeWidth || !badgeHeight) {
        return { x, y }
      }

      const halfWidth = badgeWidth / 2
      const halfHeight = badgeHeight / 2

      const minX = halfWidth
      const maxX = containerWidth - halfWidth
      const minY = halfHeight
      const maxY = containerHeight - halfHeight

      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      }
    },
    [constrainToParent]
  )

  const updateMeasurements = useCallback(
    (options?: { initialize?: boolean }) => {
      const element = badgeRef.current
      const parent = element?.parentElement
      if (!element || !parent) return

      containerSizeRef.current = {
        width: parent.clientWidth,
        height: parent.clientHeight,
      }

      badgeSizeRef.current = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      }

      if (options?.initialize) {
        const centerX = containerSizeRef.current.width / 2 + initialOffset.x
        const centerY = containerSizeRef.current.height / 2 + initialOffset.y
        const clamped = clampPosition(centerX, centerY)
        setPosition(clamped)
        dragState.current.startPosition = clamped
        setIsInitialized(true)
      } else {
        setPosition((prev) => clampPosition(prev.x, prev.y))
      }
    },
    [clampPosition, initialOffset.x, initialOffset.y]
  )

  useLayoutEffect(() => {
    updateMeasurements({ initialize: true })
  }, [updateMeasurements])

  useEffect(() => {
    updateMeasurements({ initialize: true })
  }, [initialOffset.x, initialOffset.y, updateMeasurements])

  useEffect(() => {
    const handleResize = () => updateMeasurements()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateMeasurements])

  useEffect(() => {
    updateMeasurements()
  }, [initialOffset.x, initialOffset.y, updateMeasurements])

  useEffect(() => {
    if (!ringRef.current) return

    let animationFrameId: number
    let lastTimestamp: number | null = null

    const animate = (timestamp: number) => {
      if (!ringRef.current) return

      if (lastTimestamp != null) {
        const deltaSeconds = (timestamp - lastTimestamp) / 1000
        angleRef.current = (angleRef.current + deltaSeconds * rotationSpeed) % 360
      }

      const currentAngle = rotationDeg + angleRef.current
      ringRef.current.style.transform = `rotate(${currentAngle}deg)`
      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [rotationDeg, rotationSpeed])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return

    event.preventDefault()

    updateMeasurements()
    setIsDragging(true)

    const { clientX, clientY, pointerId } = event

    dragState.current = {
      pointerId,
      startPointer: { x: clientX, y: clientY },
      startPosition: position,
    }

    event.currentTarget.setPointerCapture(pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return

    const dx = event.clientX - dragState.current.startPointer.x
    const dy = event.clientY - dragState.current.startPointer.y

    const newX = dragState.current.startPosition.x + dx
    const newY = dragState.current.startPosition.y + dy
    setPosition({ x: newX, y: newY })
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return

    event.currentTarget.releasePointerCapture(event.pointerId)
    dragState.current.pointerId = null
    setIsDragging(false)

    setPosition((prev) => {
      const clamped = clampPosition(prev.x, prev.y)
      dragState.current.startPosition = clamped
      return clamped
    })
  }

  return (
    <div
      ref={badgeRef}
      tabIndex={0}
      draggable={false}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} overflow-hidden rounded-full ${wrapperClassName}`}
      style={{
        userSelect: 'none',
        touchAction: 'none',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        visibility: isInitialized ? 'visible' : 'hidden',
        transition: isDragging ? 'none' : 'left 2s ease, top 2s ease',
      }}
    >
      <div
        ref={ringRef}
        className={`relative rounded-full bg-blue-700 p-1.5 font-medium leading-none ${className}`}
      >
        <div className="relative size-[95px] rounded-full bg-black p-2">
          <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="absolute inset-0 h-full w-full origin-center"
              fill="black"
              overflow="visible"
              viewBox="0 0 100 100"
            >
              <path
                d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                fill="transparent"
                id={curveId}
              />
              <text>
                <textPath
                  href={`#${curveId}`}
                  dominantBaseline="hanging"
                  startOffset="0"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    wordSpacing: '5px',
                    letterSpacing: '2.1px',
                    fill: 'rgba(242, 242, 242, 0.9)',
                  }}
                >
                  {label}
                </textPath>
              </text>
            </svg>
          </div>
          {icon}
        </div>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  )
}

export default DraggableBadge
