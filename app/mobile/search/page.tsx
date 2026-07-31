'use client'

import { useState, useMemo } from 'react'
import { LayoutGrid, List, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { ProductCard } from '@/components/brand/product-card'
import { SearchBar, FilterChip, EmptyState } from '@/components/brand/ui-bits'
import { products } from '@/lib/data'
import { cn } from '@/lib/utils'

const filters = ['Category', 'Location', 'Condition', 'Price', 'Vehicle', 'Verified Sellers']
const sorts = ['Most Relevant', 'Newest', 'Price: Low to High', 'Price: High to Low']

export default function SearchScreen() {
  const [query, setQuery] = useState('Toyota Corolla brake pad')
  const [active, setActive] = useState<string[]>(['Verified Sellers'])
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [sort, setSort] = useState(sorts[0])
  const [sortOpen, setSortOpen] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.vehicleMake.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q),
    )
  }, [query])

  const toggle = (f: string) =>
    setActive((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  return (
    <PhoneShell nav>
      <header className="sticky top-0 z-10 space-y-3 bg-card/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <BackButton fallback="/mobile/home" className="shrink-0" />
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} withVoice={false} />
          </div>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          <FilterChip label="Filters" active={false} />
          {filters.map((f) => (
            <FilterChip key={f} label={f} active={active.includes(f)} onClick={() => toggle(f)} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground"
            >
              <SlidersHorizontal className="size-3.5" />
              {sort}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            {sortOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                {sorts.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSort(s)
                      setSortOpen(false)
                    }}
                    className={cn(
                      'block w-full px-3 py-2.5 text-left text-sm hover:bg-muted',
                      s === sort ? 'font-semibold text-orange' : 'text-foreground',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{results.length} results</span>
            <div className="flex rounded-lg border border-border p-0.5">
              <button
                onClick={() => setView('grid')}
                aria-label="Grid view"
                className={cn(
                  'inline-flex size-7 items-center justify-center rounded-md',
                  view === 'grid' ? 'bg-orange text-white' : 'text-muted-foreground',
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setView('list')}
                aria-label="List view"
                className={cn(
                  'inline-flex size-7 items-center justify-center rounded-md',
                  view === 'list' ? 'bg-orange text-white' : 'text-muted-foreground',
                )}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {results.length === 0 ? (
          <EmptyState
            title="No matching parts found"
            message="Try another part name, vehicle model, category, or location."
            actionLabel="Clear Filters"
            onAction={() => {
              setQuery('')
              setActive([])
            }}
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} href={`/mobile/product/${p.id}`} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} href={`/mobile/product/${p.id}`} layout="list" />
            ))}
          </div>
        )}
      </div>
    </PhoneShell>
  )
}
