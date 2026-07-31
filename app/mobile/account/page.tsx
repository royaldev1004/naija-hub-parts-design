'use client'

import Link from 'next/link'
import {
  ChevronRight,
  Store,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  BadgeCheck,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { setSignedIn } from '@/lib/prototype-auth'

const groups = [
  {
    title: 'My activity',
    items: [
      { label: 'My Store', icon: Store, href: '/mobile/dashboard' },
      { label: 'Saved parts', icon: Heart, href: '/mobile/search' },
      { label: 'Notifications', icon: Bell, href: '/mobile/account' },
    ],
  },
  {
    title: 'Support & legal',
    items: [
      { label: 'Verification status', icon: Shield, href: '/mobile/pending' },
      { label: 'Help centre', icon: HelpCircle, href: '/mobile/account' },
      { label: 'Terms & privacy', icon: FileText, href: '/mobile/account' },
    ],
  },
]

export default function AccountPage() {
  const router = useRouter()
  return (
    <PhoneShell nav>
      <header className="border-b border-border bg-card px-4 py-3">
        <h1 className="font-heading text-base font-semibold text-foreground">Account</h1>
      </header>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-orange/10 font-heading text-lg font-bold text-orange">
            LA
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate font-heading text-base font-semibold text-foreground">Ladipo Auto Spares</p>
              <BadgeCheck className="size-4 shrink-0 text-orange" />
            </div>
            <p className="truncate text-xs text-muted-foreground">+234 903 672 6262</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
              Verified dealer
            </span>
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="mt-6">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {group.items.map((item, i) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={
                      'flex items-center gap-3 px-4 py-3.5 hover:bg-warm ' +
                      (i > 0 ? 'border-t border-border' : '')
                    }
                  >
                    <Icon className="size-5 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            setSignedIn(false)
            router.push('/mobile/welcome')
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-destructive hover:bg-warm"
        >
          <LogOut className="size-4" />
          Log out
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          NHP by LYTOD MOTORS LTD · v1.0.0
        </p>
      </div>
    </PhoneShell>
  )
}
