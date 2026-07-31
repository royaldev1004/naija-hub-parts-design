'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Phone } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PhoneShell } from '@/components/mobile/phone-shell'

export default function DealerLoginScreen() {
  const router = useRouter()
  return (
    <PhoneShell>
      <div className="flex h-full flex-col px-6 pb-8 pt-4">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="mt-6">
          <Logo variant="light" size={44} />
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">Dealer Sign In</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Use your Nigerian phone number to manage your store.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground">Phone number</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3">
              <span className="flex items-center gap-1.5 border-r border-border pr-3 text-sm font-semibold text-foreground">
                <Phone className="size-4 text-orange" />
                +234
              </span>
              <input
                inputMode="tel"
                placeholder="903 672 6262"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            onClick={() => router.push('/mobile/otp')}
            className="w-full rounded-xl bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            Send OTP
          </button>

          <Link
            href="/mobile/register"
            className="block w-full py-2 text-center text-sm font-semibold text-orange"
          >
            Register a New Store
          </Link>
        </div>

        <p className="mt-auto text-center text-xs leading-relaxed text-muted-foreground">
          By continuing, you agree to the Terms and Privacy Policy.
        </p>
      </div>
    </PhoneShell>
  )
}
