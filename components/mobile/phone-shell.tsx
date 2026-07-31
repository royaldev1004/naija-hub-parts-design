'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, PlusCircle, Store, User, Signal, Wifi, BatteryFull } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/mobile/home', label: 'Home', icon: Home },
  { href: '/mobile/search', label: 'Search', icon: Search },
  { href: '/mobile/add-listing', label: 'Add Listing', icon: PlusCircle },
  { href: '/mobile/dashboard', label: 'My Store', icon: Store },
  { href: '/mobile/account', label: 'Account', icon: User },
]

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 pt-2.5 pb-1 text-xs font-semibold',
        dark ? 'text-white' : 'text-foreground',
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="size-3.5" />
        <Wifi className="size-3.5" />
        <BatteryFull className="size-4" />
      </div>
    </div>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="border-t border-border bg-card">
      <div className="flex items-stretch justify-around px-2 pb-5 pt-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href === '/mobile/dashboard' && pathname.startsWith('/mobile/dashboard'))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold transition-colors',
                active ? 'text-orange' : 'text-muted-foreground',
              )}
            >
              <Icon className={cn('size-5', active && 'fill-orange/10')} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * PhoneShell renders a 390px device frame with a scrollable content area.
 * Set `dark` for splash/onboarding. Set `nav` to render the bottom tab bar.
 */
export function PhoneShell({
  children,
  dark = false,
  nav = false,
  statusBar = true,
  contentClassName,
}: {
  children: React.ReactNode
  dark?: boolean
  nav?: boolean
  statusBar?: boolean
  contentClassName?: string
}) {
  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div
        className={cn(
          'relative flex h-[calc(100dvh-0px)] max-h-[860px] min-h-[720px] flex-col overflow-hidden border-border bg-background sm:rounded-[2.5rem] sm:border-8 sm:border-dark sm:shadow-2xl',
          dark && 'bg-dark',
        )}
      >
        {statusBar && <StatusBar dark={dark} />}
        <div className={cn('flex-1 overflow-y-auto', contentClassName)}>{children}</div>
        {nav && <BottomNav />}
      </div>
    </div>
  )
}
