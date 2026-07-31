'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, MapPin } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatNaira, type Product } from '@/lib/data'
import { VerifiedBadge, ConditionBadge } from './badges'
import { WhatsAppButton } from './contact-buttons'

export function ProductCard({
  product,
  href,
  layout = 'grid',
}: {
  product: Product
  href: string
  layout?: 'grid' | 'list'
}) {
  const [saved, setSaved] = useState(false)

  if (layout === 'list') {
    return (
      <div className="flex gap-3 rounded-2xl border border-border bg-card p-3">
        <Link href={href} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
          <span className="absolute left-1.5 top-1.5">
            <ConditionBadge condition={product.condition} />
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <Link href={href} className="line-clamp-2 text-sm font-semibold text-foreground">
            {product.name}
          </Link>
          <p className="mt-0.5 font-heading text-base font-bold text-orange">{formatNaira(product.price)}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="truncate">{product.storeName}</span>
            {product.verified && <VerifiedBadge compact />}
          </div>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {product.location} · {product.postedLabel}
            </span>
            <WhatsAppButton size="icon" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Link href={href} className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2">
          <ConditionBadge condition={product.condition} />
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setSaved((v) => !v)
          }}
          aria-label={saved ? 'Remove from saved' : 'Save product'}
          className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur transition-colors hover:bg-card"
        >
          <Bookmark className={cn('size-4', saved && 'fill-orange text-orange')} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <Link href={href} className="line-clamp-2 text-sm font-semibold text-foreground">
          {product.name}
        </Link>
        <p className="mt-1 font-heading text-lg font-bold text-orange">{formatNaira(product.price)}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="truncate">{product.storeName}</span>
          {product.verified && <VerifiedBadge compact />}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          {product.location} · {product.postedLabel}
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href={href}
            className="flex-1 rounded-xl border border-border py-2 text-center text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          >
            View Details
          </Link>
          <WhatsAppButton size="icon" />
        </div>
      </div>
    </div>
  )
}
