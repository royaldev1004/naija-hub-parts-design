import Link from 'next/link'
import { MapPin, Package, Clock, ChevronRight } from 'lucide-react'
import { VerifiedBadge } from '@/components/brand/badges'
import { StoreInitials } from '@/components/brand/store-card'
import { stores } from '@/lib/data'

export const metadata = {
  title: 'Verified Stores — Naija Parts Hub',
  description: 'Browse verified automotive parts dealers with physical stores across Nigeria.',
}

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">Verified Stores</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Every dealer below has an approved physical store location in Nigeria. Contact them directly to buy parts.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Link
            key={store.slug}
            href={`/web/store/${store.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-orange/40"
          >
            <div className="flex items-center gap-3">
              <StoreInitials name={store.name} size={56} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-heading text-base font-semibold text-foreground">{store.name}</p>
                </div>
                {store.verified && (
                  <span className="mt-1 inline-flex">
                    <VerifiedBadge compact />
                  </span>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{store.tagline}</p>
            <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-orange" />
                {store.address}
              </li>
              <li className="flex items-center gap-1.5">
                <Package className="size-3.5 text-orange" />
                {store.activeListings} active listings
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-orange" />
                {store.openToday ? 'Open today' : 'Closed today'} · {store.hours}
              </li>
            </ul>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange">
              Visit store
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
