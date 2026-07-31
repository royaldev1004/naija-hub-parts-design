'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoreVertical, Eye, PlusCircle } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { StatusBadge } from '@/components/brand/badges'
import { EmptyState } from '@/components/brand/ui-bits'
import { products, formatNaira } from '@/lib/data'
import { cn } from '@/lib/utils'

const tabs = ['Active', 'Draft', 'Archived'] as const
const menuActions = ['Edit', 'Unpublish', 'Archive', 'Delete', 'Share', 'View Public Page']

type Row = {
  id: string
  name: string
  price: number
  image: string
  views: number
  updated: string
}

const active: Row[] = products.slice(0, 5).map((p, i) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.image,
  views: [142, 88, 54, 39, 21][i] ?? 12,
  updated: ['Today', '2 days ago', '3 days ago', '5 days ago', '1 week ago'][i] ?? 'Recently',
}))

const draft: Row[] = products.slice(5, 7).map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.image,
  views: 0,
  updated: 'Not published',
}))

export default function ListingsScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<(typeof tabs)[number]>('Active')
  const [menu, setMenu] = useState<string | null>(null)

  const rows = tab === 'Active' ? active : tab === 'Draft' ? draft : []

  return (
    <PhoneShell nav>
      <header className="sticky top-0 z-10 bg-card/95 px-4 pb-2 pt-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <BackButton fallback="/mobile/dashboard" />
          <h1 className="font-heading text-lg font-bold text-foreground">My Listings</h1>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-orange/10 px-3.5 py-2 text-xs font-semibold text-orange">
          8 of 10 free listings used
          <Link href="/mobile/limit" className="underline">
            Upgrade
          </Link>
        </div>
        <div className="mt-2 flex border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 border-b-2 py-2.5 text-sm font-semibold transition-colors',
                tab === t ? 'border-orange text-orange' : 'border-transparent text-muted-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-4">
        {rows.length === 0 ? (
          <EmptyState
            title="No active listings"
            message="You have no listings in this tab yet. Create a new listing to get started."
            actionLabel="Add Listing"
            onAction={() => router.push('/mobile/add-listing')}
          />
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="relative flex gap-3 rounded-2xl border border-border bg-card p-3">
                <Link href={`/mobile/product/${r.id}`} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image src={r.image || '/placeholder.svg'} alt={r.name} fill className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="mt-0.5 font-heading text-base font-bold text-orange">{formatNaira(r.price)}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusBadge status={tab === 'Active' ? 'active' : 'draft'} />
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="size-3" />
                      {r.views}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Updated {r.updated}</p>
                </div>
                <button
                  onClick={() => setMenu(menu === r.id ? null : r.id)}
                  aria-label="More actions"
                  className="self-start rounded-full p-1 text-muted-foreground hover:bg-muted"
                >
                  <MoreVertical className="size-5" />
                </button>
                {menu === r.id && (
                  <div className="absolute right-3 top-12 z-20 w-44 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                    {menuActions.map((a) => (
                      <button
                        key={a}
                        onClick={() => setMenu(null)}
                        className={cn(
                          'block w-full px-3 py-2.5 text-left text-sm hover:bg-muted',
                          a === 'Delete' ? 'text-error' : 'text-foreground',
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/mobile/add-listing"
        className="absolute bottom-24 right-5 inline-flex items-center gap-2 rounded-full bg-orange px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-orange-hover"
      >
        <PlusCircle className="size-5" />
        Add Listing
      </Link>
    </PhoneShell>
  )
}
