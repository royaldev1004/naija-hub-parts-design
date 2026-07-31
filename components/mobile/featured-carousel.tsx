'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/brand/product-card'
import type { Product } from '@/lib/data'

/**
 * Full-width Featured Parts carousel with scroll-snap paging and
 * tappable pagination dots that reflect the active slide.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false })
  const [active, setActive] = useState(0)

  function onScroll() {
    const el = ref.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActive(index)
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
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
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  function goTo(index: number) {
    const el = ref.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] touch-pan-x select-none [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="w-full shrink-0 snap-start">
            <ProductCard product={p} href={`/mobile/product/${p.id}`} layout="overlay" />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Go to featured item ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === active ? 'w-5 bg-orange' : 'w-2 bg-muted-foreground/30',
            )}
          />
        ))}
      </div>
    </div>
  )
}
