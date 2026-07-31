import Link from 'next/link'
import { Smartphone, Globe, ShieldCheck, Palette, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/brand/logo'

const entries = [
  {
    href: '/mobile',
    title: 'Mobile App',
    desc: 'iOS & Android buyer and dealer experience — 16 connected screens from splash to store management.',
    icon: Smartphone,
    tag: 'Buyer & Dealer',
  },
  {
    href: '/web',
    title: 'Web Platform',
    desc: 'Responsive marketplace: homepage, search, product, virtual store and dealer subscriptions.',
    icon: Globe,
    tag: 'Public web',
  },
  {
    href: '/admin',
    title: 'Admin Dashboard',
    desc: 'Verification, listing moderation and subscription management for the operations team.',
    icon: ShieldCheck,
    tag: 'Operators',
  },
  {
    href: '/style-guide',
    title: 'Style Guide',
    desc: 'Colors, typography, spacing, buttons, cards, badges and component behaviour.',
    icon: Palette,
    tag: 'Developers',
  },
]

export default function HubPage() {
  return (
    <main className="min-h-dvh bg-dark text-white">
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-16">
        <header className="flex items-center justify-between">
          <Logo variant="dark" size={44} withWordmark />
          <span className="hidden rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70 sm:inline">
            Phase 1 Prototype
          </span>
        </header>

        <div className="mt-14 max-w-2xl sm:mt-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange">
            High-fidelity clickable mockup
          </span>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Naija Hub Parts
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            A trusted Nigerian automotive-parts marketplace connecting buyers with verified physical stores.
            Buyers discover parts and contact sellers directly — payment, negotiation and delivery happen
            off-platform in Phase 1.
          </p>
        </div>

        <div className="mt-12 grid flex-1 grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
          {entries.map((e) => {
            const Icon = e.icon
            return (
              <Link
                key={e.href}
                href={e.href}
                className="group flex flex-col rounded-2xl border border-white/10 bg-soft-black p-6 transition-colors hover:border-orange/50"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange/15 text-orange">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/50">
                    {e.tag}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-xl font-semibold">{e.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{e.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange">
                  Open
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          Operated by Lytod Motors Ltd · Automotive Marketplace · Design-only prototype
        </footer>
      </div>
    </main>
  )
}
