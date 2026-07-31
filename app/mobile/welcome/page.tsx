'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MessageCircle, Store } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { cn } from '@/lib/utils'

const cards = [
  {
    icon: Search,
    title: 'Find Parts Across Nigeria',
    desc: 'Search car, motorcycle, truck, tractor, and heavy-equipment parts from verified stores.',
  },
  {
    icon: MessageCircle,
    title: 'Contact Sellers Directly',
    desc: 'Call or chat with dealers on WhatsApp and arrange payment or delivery directly.',
  },
  {
    icon: Store,
    title: 'Grow Your Automotive Store',
    desc: 'List 10 products free and upgrade when your business needs more visibility.',
  },
]

export default function WelcomeScreen() {
  const [index, setIndex] = useState(0)
  const card = cards[index]
  const Icon = card.icon

  return (
    <PhoneShell>
      <div className="flex h-full flex-col px-6 pb-8 pt-4">
        <div className="flex items-center justify-between">
          <Logo variant="light" size={36} />
          <Link href="/mobile/home" className="text-sm font-semibold text-muted-foreground">
            Skip
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="inline-flex size-24 items-center justify-center rounded-3xl bg-orange/10 text-orange">
            <Icon className="size-11" />
          </span>
          <h2 className="mt-8 text-balance font-heading text-2xl font-bold text-foreground">{card.title}</h2>
          <p className="mt-3 max-w-[280px] text-pretty text-sm leading-relaxed text-muted-foreground">
            {card.desc}
          </p>

          <div className="mt-8 flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'w-6 bg-orange' : 'w-2 bg-border',
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {index < cards.length - 1 ? (
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="w-full rounded-xl bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              Next
            </button>
          ) : (
            <>
              <Link
                href="/mobile/home"
                className="block w-full rounded-xl bg-orange py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                Browse Parts
              </Link>
              <Link
                href="/mobile/register"
                className="block w-full rounded-xl border border-border bg-card py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Register Your Store
              </Link>
              <Link
                href="/mobile/login"
                className="block w-full py-2 text-center text-sm font-semibold text-orange"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </PhoneShell>
  )
}
