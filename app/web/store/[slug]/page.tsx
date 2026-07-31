import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Clock, Package, Share2, Star } from 'lucide-react'
import { VerifiedBadge } from '@/components/brand/badges'
import { WhatsAppButton, CallButton } from '@/components/brand/contact-buttons'
import { StoreInitials } from '@/components/brand/store-card'
import { getStore, productsByStore, stores } from '@/lib/data'
import { StoreProducts } from './store-products'

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }))
}

export default async function WebStorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = getStore(slug)
  if (!store) notFound()
  const items = productsByStore(slug)

  return (
    <div>
      {/* Banner */}
      <div className="relative h-40 bg-dark sm:h-52">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,0,0.25),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Store header */}
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="rounded-2xl border-4 border-background">
              <StoreInitials name={store.name} size={88} />
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-foreground">{store.name}</h1>
                {store.verified && <VerifiedBadge />}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{store.tagline}</p>
            </div>
          </div>
          <div className="flex gap-2 pb-1">
            <CallButton label="Call Store" size="sm" />
            <WhatsAppButton label="WhatsApp Store" size="sm" />
            <button
              aria-label="Share store"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-muted"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat icon={Package} label="Active Listings" value={String(store.activeListings)} />
          <Stat icon={Star} label="Store Rating" value={store.rating.toFixed(1)} />
          <Stat icon={Clock} label="Status" value={store.openToday ? 'Open Today' : 'Closed Today'} />
          <Stat icon={MapPin} label="Location" value={store.state} />
        </div>

        <div className="mt-8 grid gap-8 pb-16 lg:grid-cols-[1fr_300px]">
          {/* Products */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Products ({items.length})
            </h2>
            <StoreProducts items={items} />
          </div>

          {/* About / contact sidebar */}
          <aside className="order-1 space-y-4 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">About</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{store.about}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">Contact & Hours</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-orange" />
                  {store.address}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4 shrink-0 text-orange" />
                  {store.phone}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-orange" />
                  {store.hours}
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">Categories</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {store.categories.map((c) => (
                  <span key={c} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="px-1 text-xs text-muted-foreground">
              Store URL: naijahubparts.ng/store/{store.slug}
            </p>
            <Link
              href="/web/stores"
              className="block text-center text-sm font-semibold text-orange hover:text-orange-hover"
            >
              ← Back to all stores
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="size-5 text-orange" />
      <p className="mt-2 font-heading text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
