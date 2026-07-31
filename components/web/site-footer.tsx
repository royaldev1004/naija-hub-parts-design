import Link from 'next/link'
import { Logo } from '@/components/brand/logo'

const columns = [
  {
    title: 'Marketplace',
    links: [
      { href: '/web/browse', label: 'Browse Parts' },
      { href: '/web/stores', label: 'Verified Stores' },
      { href: '/web#how', label: 'How it works' },
      { href: '/web/subscription', label: 'Dealer Plans' },
    ],
  },
  {
    title: 'For Dealers',
    links: [
      { href: '/mobile/register', label: 'Register Your Store' },
      { href: '/mobile/login', label: 'Dealer Sign In' },
      { href: '/web/subscription', label: 'Subscriptions' },
      { href: '/web#sell', label: 'Sell on NHP' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/web#about', label: 'About' },
      { href: '/web#contact', label: 'Contact' },
      { href: '/web#terms', label: 'Terms' },
      { href: '/web#privacy', label: 'Privacy' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="dark" size={40} withWordmark />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Nigeria&apos;s automotive-parts marketplace connecting buyers with verified physical stores.
              Contact sellers directly by phone or WhatsApp.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Operated by Lytod Motors Ltd · RC 1234567</p>
          <p>© 2026 Naija Hub Parts. Automotive-only marketplace.</p>
        </div>
      </div>
    </footer>
  )
}
