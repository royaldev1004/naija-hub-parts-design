'use client'

import Link from 'next/link'
import { Check, Crown, Store, TrendingUp, Headphones } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { NAIRA } from '@/lib/data'

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free',
    highlight: false,
    features: ['Up to 10 active listings', 'Buyer call & WhatsApp', 'Standard search placement'],
  },
  {
    name: 'Dealer Pro',
    price: 7500,
    period: 'per month',
    highlight: true,
    features: [
      'Unlimited active listings',
      'Priority search placement',
      'Verified Pro store badge',
      'Listing performance insights',
      'Priority dealer support',
    ],
  },
]

const perks = [
  { icon: Store, label: 'Unlimited listings' },
  { icon: TrendingUp, label: 'Top of search' },
  { icon: Headphones, label: 'Priority support' },
]

export default function LimitScreen() {
  return (
    <PhoneShell>
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-card/95 px-4 py-2 backdrop-blur">
        <BackButton fallback="/mobile/listings" />
        <h1 className="font-heading text-lg font-bold text-foreground">Upgrade Your Store</h1>
      </header>

      <div className="px-4 py-4">
        <div className="rounded-2xl bg-dark p-5 text-center text-white">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange/20 text-orange">
            <Crown className="size-6" />
          </span>
          <h2 className="mt-3 font-heading text-lg font-bold text-balance">
            {"You've reached your free listing limit"}
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Upgrade to Dealer Pro to list unlimited parts and reach more buyers across Nigeria.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {perks.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.label} className="flex flex-col items-center gap-1">
                  <Icon className="size-5 text-orange" />
                  <span className="text-[10px] font-medium text-white/80">{p.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                'rounded-2xl border bg-card p-4 ' +
                (plan.highlight ? 'border-orange ring-1 ring-orange' : 'border-border')
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-base font-bold text-foreground">{plan.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {plan.price === 0 ? 'Current plan' : `${NAIRA}${plan.price.toLocaleString('en-NG')} ${plan.period}`}
                  </p>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold text-white">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <ul className="mt-3 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button className="mt-5 w-full rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-white hover:bg-orange-hover">
          Upgrade to Dealer Pro
        </button>
        <Link
          href="/mobile/dashboard"
          className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-foreground hover:border-orange/40"
        >
          Maybe later
        </Link>
      </div>
    </PhoneShell>
  )
}
