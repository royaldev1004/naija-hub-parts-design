'use client'

import Link from 'next/link'
import { ArrowLeft, BadgeCheck, Package, Tag, ShieldCheck, MessageCircle } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'

const notifications = [
  {
    id: 1,
    icon: BadgeCheck,
    title: 'Your store is verified',
    body: 'Ladipo Auto Spares is now a verified dealer. The badge is live on your listings.',
    time: 'Just now',
    unread: true,
  },
  {
    id: 2,
    icon: MessageCircle,
    title: 'New buyer enquiry',
    body: 'A buyer asked about your Toyota Corolla Front Brake Pad listing.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 3,
    icon: Package,
    title: 'Listing approved',
    body: 'Honda Accord 2013 Alternator is now visible in search results.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 4,
    icon: Tag,
    title: 'Price tip',
    body: 'Similar brake pads are selling for ₦26,000–₦30,000 in Lagos.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: 'Keep your account secure',
    body: 'Never share your OTP. NHP staff will never ask for it.',
    time: '3 days ago',
    unread: false,
  },
]

export default function NotificationsPage() {
  return (
    <PhoneShell nav>
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-card px-4 py-3">
        <Link
          href="/mobile/home"
          aria-label="Back"
          className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-base font-semibold text-foreground">Notifications</h1>
      </header>

      <div className="divide-y divide-border">
        {notifications.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.id}
              className={'flex items-start gap-3 px-4 py-4 ' + (n.unread ? 'bg-orange/5' : 'bg-card')}
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                  {n.unread && <span className="size-2 shrink-0 rounded-full bg-orange" />}
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </PhoneShell>
  )
}
