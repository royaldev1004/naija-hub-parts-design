'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Share2, Bookmark, MapPin, Info, ChevronRight } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { VerifiedBadge, ConditionBadge } from '@/components/brand/badges'
import { WhatsAppButton, CallButton } from '@/components/brand/contact-buttons'
import { StoreInitials } from '@/components/brand/store-card'
import { formatNaira, type Product } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProductDetailView({ product }: { product: Product }) {
  const [img, setImg] = useState(0)
  const [saved, setSaved] = useState(false)

  return (
    <PhoneShell statusBar>
      <div className="pb-28">
        {/* Gallery */}
        <div className="relative">
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.images[img] || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute left-0 right-0 top-2 flex items-center justify-between px-4">
            <BackButton fallback="/mobile/home" className="bg-card/90 backdrop-blur hover:bg-card" />
            <div className="flex gap-2">
              <button
                aria-label="Share listing"
                className="inline-flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur"
              >
                <Share2 className="size-4" />
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                aria-label="Save product"
                className="inline-flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur"
              >
                <Bookmark className={cn('size-4', saved && 'fill-orange text-orange')} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                aria-label={`Image ${i + 1}`}
                className={cn('h-1.5 rounded-full transition-all', i === img ? 'w-5 bg-orange' : 'w-1.5 bg-card/80')}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 px-4 py-3">
          {product.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setImg(i)}
              className={cn(
                'relative size-16 overflow-hidden rounded-lg border-2',
                i === img ? 'border-orange' : 'border-transparent',
              )}
            >
              <Image src={src || '/placeholder.svg'} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>

        <div className="space-y-5 px-4">
          <div>
            <div className="flex items-center gap-2">
              <ConditionBadge condition={product.condition} />
              {product.inStock && (
                <span className="text-xs font-semibold text-success">In Stock</span>
              )}
            </div>
            <h1 className="mt-2 text-balance font-heading text-xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-1 font-heading text-2xl font-bold text-orange">{formatNaira(product.price)}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {product.location} · Posted {product.postedLabel}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-warm p-4 text-sm">
            <Spec label="Part Number" value={product.partNumber} />
            <Spec label="Category" value={product.category} />
            <Spec label="Compatible Vehicles" value={product.compatible} span />
          </div>

          <div>
            <h2 className="font-heading text-base font-semibold text-foreground">Description</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          {/* Seller card */}
          <Link
            href={`/mobile/store/${product.storeSlug}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <StoreInitials name={product.storeName} size={52} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-foreground">{product.storeName}</p>
                {product.verified && <VerifiedBadge compact />}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{product.location}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Member since 2026 · 24 active listings</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>

          {/* Notice */}
          <div className="flex gap-2 rounded-2xl bg-warning/10 p-3.5 text-xs leading-relaxed text-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-warning" />
            Naija Hub Parts connects buyers and sellers. Payment, delivery, warranty, and product compatibility are
            arranged directly with the seller.
          </div>

          <div className="flex gap-2 pb-2">
            <button className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
              Share Listing
            </button>
            <Link
              href={`/mobile/store/${product.storeSlug}`}
              className="flex-1 rounded-xl border border-border py-2.5 text-center text-sm font-semibold text-foreground hover:bg-muted"
            >
              View Store
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky actions */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-border bg-card px-4 pb-6 pt-3">
        <CallButton className="flex-1" />
        <WhatsAppButton className="flex-[1.4]" />
      </div>
    </PhoneShell>
  )
}

function Spec({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold text-foreground">{value}</p>
    </div>
  )
}
