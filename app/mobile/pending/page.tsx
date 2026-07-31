'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Check, Loader2, Clock } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { cn } from '@/lib/utils'

const timeline = [
  { label: 'Registration Submitted', state: 'done' as const },
  { label: 'Business Review', state: 'active' as const },
  { label: 'Store Activation', state: 'pending' as const },
]

export default function PendingScreen() {
  const router = useRouter()
  return (
    <PhoneShell>
      <div className="flex h-full flex-col px-6 pb-8 pt-10 text-center">
        <div className="flex flex-1 flex-col items-center">
          <span className="inline-flex size-24 items-center justify-center rounded-3xl bg-orange/10 text-orange">
            <ShieldCheck className="size-11" />
          </span>
          <h1 className="mt-6 text-balance font-heading text-2xl font-bold text-foreground">
            Your Store Is Under Review
          </h1>
          <p className="mt-3 max-w-[300px] text-pretty text-sm leading-relaxed text-muted-foreground">
            We are reviewing your business details. You will be notified when your store is approved.
          </p>

          <div className="mt-8 w-full space-y-1 text-left">
            {timeline.map((t, i) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'inline-flex size-8 items-center justify-center rounded-full',
                      t.state === 'done' && 'bg-success text-white',
                      t.state === 'active' && 'bg-orange text-white',
                      t.state === 'pending' && 'bg-muted text-muted-foreground',
                    )}
                  >
                    {t.state === 'done' ? (
                      <Check className="size-4" />
                    ) : t.state === 'active' ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Clock className="size-4" />
                    )}
                  </span>
                  {i < timeline.length - 1 && <span className="h-8 w-0.5 bg-border" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-semibold text-foreground">{t.label}</p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {t.state === 'active' ? 'In progress' : t.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/mobile/dashboard')}
            className="w-full rounded-xl bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            View Submitted Details
          </button>
          <button className="w-full rounded-xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground hover:bg-muted">
            Contact Support
          </button>
          <Link href="/mobile/welcome" className="block w-full py-2 text-sm font-semibold text-muted-foreground">
            Sign Out
          </Link>
        </div>
      </div>
    </PhoneShell>
  )
}
