import Link from 'next/link'
import {
  Bell,
  User,
  PlusCircle,
  ListChecks,
  Store,
  UserCog,
  Eye,
  MessageCircle,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { VerifiedBadge } from '@/components/brand/badges'
import { ProductCard } from '@/components/brand/product-card'
import { productsByStore } from '@/lib/data'

const quickActions = [
  { label: 'Add New Listing', icon: PlusCircle, href: '/mobile/add-listing' },
  { label: 'Manage Listings', icon: ListChecks, href: '/mobile/listings' },
  { label: 'View Public Store', icon: Store, href: '/mobile/store/ladipo-auto-spares' },
  { label: 'Edit Store Profile', icon: UserCog, href: '/mobile/store-profile' },
]

const stats = [
  { label: 'Active Listings', value: '8', icon: ListChecks },
  { label: 'Draft Listings', value: '3', icon: PlusCircle },
  { label: 'Product Views', value: '142', icon: Eye },
  { label: 'WhatsApp Contacts', value: '27', icon: MessageCircle },
]

export default function DashboardScreen() {
  const recent = productsByStore('ladipo-auto-spares')
  return (
    <PhoneShell nav>
      <header className="bg-dark px-4 pb-5 pt-2 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/60">Good morning,</p>
            <h1 className="font-heading text-xl font-bold">Tinuoye</h1>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-sm text-white/70">Ladipo Auto Spares</span>
              <VerifiedBadge compact className="bg-success/20" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/mobile/notifications"
              aria-label="Notifications"
              className="relative inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-orange" />
            </Link>
            <Link
              href="/mobile/account"
              aria-label="Your profile"
              className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <User className="size-5" />
            </Link>
          </div>
        </div>

        {/* Subscription card */}
        <div className="mt-4 rounded-2xl bg-soft-black p-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">Free Plan</span>
            <span className="text-xs text-white/60">8 of 10 listings used</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-orange" style={{ width: '80%' }} />
          </div>
          <Link
            href="/mobile/limit"
            className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-orange py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            Manage Plan on Website
          </Link>
        </div>
      </header>

      <div className="space-y-6 px-4 py-5">
        {/* Sync banner */}
        <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3.5 py-2.5 text-sm font-semibold text-success">
          <RefreshCw className="size-4" />
          Everything is synced
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Icon className="size-4" />
                </span>
                <p className="mt-3 font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {quickActions.map((a) => {
              const Icon = a.icon
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3.5 text-sm font-semibold text-foreground transition-colors hover:border-orange/40"
                >
                  <Icon className="size-5 text-orange" />
                  {a.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent listings */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">Recent Listings</h2>
            <Link href="/mobile/listings" className="flex items-center text-xs font-semibold text-orange">
              Manage <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {recent.map((p) => (
              <ProductCard key={p.id} product={p} href={`/mobile/product/${p.id}`} layout="list" />
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  )
}
