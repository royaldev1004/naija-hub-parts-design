'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Eye, EyeOff, RotateCcw, Trash2, Flag } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/brand/badges'
import { formatNaira } from '@/lib/data'
import { cn } from '@/lib/utils'
import { modListings } from '@/lib/admin-data'

const filters = ['active', 'pending', 'reported', 'removed'] as const
type Filter = (typeof filters)[number] | 'all'

export function ModerationClient() {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = modListings.filter((l) => (filter === 'all' ? true : l.status === filter))

  return (
    <div>
      <AdminPageHeader title="Listing Moderation" subtitle="Review reported and pending product listings" />

      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {(['all', ...filters] as Filter[]).map((f) => {
            const count = f === 'all' ? modListings.length : modListings.filter((l) => l.status === f).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors',
                  filter === f
                    ? 'border-orange bg-orange text-white'
                    : 'border-border bg-card text-foreground hover:border-orange/40',
                )}
              >
                {f}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-[10px]',
                    filter === f ? 'bg-white/20' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((l) => (
            <div key={l.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex gap-3 p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image src={l.image || '/placeholder.svg'} alt={l.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-sm font-semibold text-foreground">{l.name}</p>
                    <StatusBadge status={l.status} />
                  </div>
                  <p className="mt-1 font-heading text-base font-bold text-orange">{formatNaira(l.price)}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {l.store} · {l.location}
                  </p>
                  <p className="text-xs text-muted-foreground">{l.category}</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border p-3">
                <Action icon={Eye} label="View" />
                {l.status === 'removed' ? (
                  <Action icon={RotateCcw} label="Restore" />
                ) : (
                  <Action icon={EyeOff} label="Unpublish" />
                )}
                <Action icon={Trash2} label="Remove" tone="error" />
                <Action icon={Flag} label="Flag Seller" tone="warning" />
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No listings in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Action({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  tone?: 'error' | 'warning'
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-muted',
        tone === 'error' && 'text-error',
        tone === 'warning' && 'text-warning',
        !tone && 'text-foreground',
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  )
}
