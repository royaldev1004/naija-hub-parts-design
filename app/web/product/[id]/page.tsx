import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin, Info, Share2 } from 'lucide-react'
import { ProductGallery } from '@/components/web/product-gallery'
import { VerifiedBadge, ConditionBadge } from '@/components/brand/badges'
import { WhatsAppButton, CallButton } from '@/components/brand/contact-buttons'
import { StoreInitials } from '@/components/brand/store-card'
import { ProductCard } from '@/components/brand/product-card'
import { formatNaira, getProduct, getStore, products } from '@/lib/data'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function WebProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  const store = getStore(product.storeSlug)
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4)
  const relatedList = related.length ? related : fallbackRelated

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/web" className="hover:text-orange">
          Home
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/web/browse" className="hover:text-orange">
          Parts
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{product.category}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex items-center gap-2">
            <ConditionBadge condition={product.condition} />
            {product.inStock && <span className="text-xs font-semibold text-success">In Stock</span>}
          </div>
          <h1 className="mt-2 text-balance font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 font-heading text-3xl font-bold text-orange">{formatNaira(product.price)}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {product.location} · Posted {product.postedLabel}
          </p>

          {/* Specs */}
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-warm p-5 text-sm">
            <Spec label="Part Number" value={product.partNumber} />
            <Spec label="Category" value={product.category} />
            <Spec label="Compatible Vehicles" value={product.compatible} span />
          </dl>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton className="flex-1" />
            <CallButton className="flex-1" />
          </div>
          <div className="mt-3 flex gap-3">
            <Link
              href={`/web/store/${product.storeSlug}`}
              className="flex-1 rounded-xl border border-border py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              View Store
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              <Share2 className="size-4" />
              Share
            </button>
          </div>

          {/* Notice */}
          <div className="mt-6 flex gap-2 rounded-2xl bg-warning/10 p-4 text-xs leading-relaxed text-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-warning" />
            Naija Hub Parts connects buyers and sellers. Payment, delivery, warranty, and product compatibility are
            arranged directly with the seller.
          </div>
        </div>
      </div>

      {/* Description + seller */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Description</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
        {store && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Seller</h2>
            <Link
              href={`/web/store/${store.slug}`}
              className="mt-2 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-orange/40"
            >
              <StoreInitials name={store.name} size={56} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-foreground">{store.name}</p>
                  {store.verified && <VerifiedBadge compact />}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{store.address}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {store.activeListings} active listings · Member since {store.memberSince}
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          </div>
        )}
      </div>

      {/* Related */}
      <div className="mt-12">
        <h2 className="font-heading text-xl font-semibold text-foreground">Related parts</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {relatedList.map((p) => (
            <ProductCard key={p.id} product={p} href={`/web/product/${p.id}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Spec({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-semibold text-foreground">{value}</dd>
    </div>
  )
}
