'use client'

import { useState } from 'react'
import { Share2, MapPin, Phone, Clock, Package } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { VerifiedBadge } from '@/components/brand/badges'
import { StoreInitials } from '@/components/brand/store-card'
import { WhatsAppButton, CallButton } from '@/components/brand/contact-buttons'
import { ProductCard } from '@/components/brand/product-card'
import { SearchBar, EmptyState } from '@/components/brand/ui-bits'
import type { Product, Store } from '@/lib/data'
import { cn } from '@/lib/utils'

const tabs = ['Products', 'About', 'Contact'] as const

export function StoreView({ store, products }: { store: Store; products: Product[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Products')
  const [query, setQuery] = useState('')

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <PhoneShell statusBar>
      <div className="pb-28">
        {/* Header banner */}
        <div className="relative bg-dark px-4 pb-4 pt-2 text-white">
          <div className="flex items-center justify-between">
            <BackButton fallback="/mobile/home" className="bg-white/10 text-white hover:bg-white/20" />
            <button aria-label="Share store" className="inline-flex size-9 items-center justify-center rounded-full bg-white/10">
              <Share2 className="size-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <StoreInitials name={store.name} size={60} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate font-heading text-lg font-bold">{store.name}</h1>
              </div>
              {store.verified && <VerifiedBadge className="mt-1 bg-success/20" />}
              <p className="mt-1 text-xs text-white/60">{store.tagline}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/5 p-3 text-center">
            <Stat value={String(store.activeListings)} label="Listings" />
            <Stat value={store.rating.toFixed(1)} label="Store Rating" />
            <Stat value={store.openToday ? 'Open' : 'Closed'} label="Today" accent={store.openToday} />
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-10 flex border-b border-border bg-card">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 border-b-2 py-3 text-sm font-semibold transition-colors',
                tab === t ? 'border-orange text-orange' : 'border-transparent text-muted-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          {tab === 'Products' && (
            <div className="space-y-4">
              <SearchBar placeholder="Search this store" value={query} onChange={setQuery} withVoice={false} />
              {filtered.length === 0 ? (
                <EmptyState
                  title="No active listings"
                  message="This store has no products matching your search right now."
                  icon={Package}
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} href={`/mobile/product/${p.id}`} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'About' && (
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed text-muted-foreground">{store.about}</p>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">Categories</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {store.categories.map((c) => (
                    <span key={c} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <InfoRow icon={Clock} label="Opening hours" value={store.hours} />
              <InfoRow icon={Package} label="Member since" value={store.memberSince} />
            </div>
          )}

          {tab === 'Contact' && (
            <div className="space-y-3 text-sm">
              <InfoRow icon={MapPin} label="Address" value={store.address} />
              <InfoRow icon={Phone} label="Phone" value={store.phone} />
              <InfoRow icon={Clock} label="Opening hours" value={store.hours} />
            </div>
          )}
        </div>
      </div>

      {/* Sticky contact */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-border bg-card px-4 pb-6 pt-3">
        <CallButton label="Call Store" className="flex-1" />
        <WhatsAppButton label="WhatsApp Store" className="flex-[1.4]" />
      </div>
    </PhoneShell>
  )
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <p className={cn('font-heading text-lg font-bold', accent ? 'text-orange' : 'text-white')}>{value}</p>
      <p className="text-[11px] text-white/50">{label}</p>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}
