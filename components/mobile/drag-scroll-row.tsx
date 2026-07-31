'use client'

import { useRef, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * A horizontally scrollable row that also supports click-and-drag (pointer)
 * scrolling so the carousel "flows" on desktop with a mouse, in addition to
 * native touch/trackpad scrolling on mobile.
 */
export function DragScrollRow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    state.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    }
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || !state.current.down) return
    const dx = e.clientX - state.current.startX
    if (Math.abs(dx) > 4) {
      state.current.moved = true
      el.setPointerCapture(e.pointerId)
    }
    el.scrollLeft = state.current.startScroll - dx
  }

  function endDrag() {
    state.current.down = false
  }

  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    // Prevent navigation when the pointer was dragged rather than tapped.
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className={cn(
        'flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] touch-pan-x select-none [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}
