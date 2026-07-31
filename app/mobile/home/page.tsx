import Link from 'next/link'
import { Bell, User } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { DragScrollRow } from '@/components/mobile/drag-scroll-row'
import { ProductCard } from '@/components/brand/product-card'
import { StoreCard } from '@/components/brand/store-card'
import { SectionHeader } from '@/components/brand/ui-bits'
import { products, stores } from '@/lib/data'

export default function HomeScreen() {
  return (
    <PhoneShell nav>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 px-4 pb-3 pt-1 backdrop-blur">
        <div className="flex items-center justify-between">
          <Logo variant="light" size={34} />
          <div className="flex items-center gap-1">
            <Link
              href="/mobile/notifications"
              aria-label="Notifications"
              className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-orange" />
            </Link>
            <Link
              href="/mobile/account"
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
            >
              <User className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="space-y-6 px-4 pb-6 pt-2">
        {/* Featured — horizontal scroll */}
        <div>
          <SectionHeader title="Featured Parts" href="/mobile/search" actionLabel="View all" />
          <DragScrollRow className="-mr-4 mt-3 pr-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="w-[74%] shrink-0 snap-start">
                <ProductCard product={p} href={`/mobile/product/${p.id}`} layout="featured" />
              </div>
            ))}
          </DragScrollRow>
        </div>

        {/* Recently added */}
        <div>
          <SectionHeader title="Recently Added" href="/mobile/search" />
          <div className="mt-3 space-y-3">
            {products.slice(4, 6).map((p) => (
              <ProductCard key={p.id} product={p} href={`/mobile/product/${p.id}`} layout="list" />
            ))}
          </div>
        </div>

        {/* Verified stores */}
        <div>
          <SectionHeader title="Verified Stores Near You" href="/mobile/search" />
          <div className="mt-3 space-y-3">
            {stores.slice(0, 3).map((s) => (
              <StoreCard key={s.slug} store={s} href={`/mobile/store/${s.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  )
}
