'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { BackButton } from '@/components/mobile/back-button'
import { setSignedIn } from '@/lib/prototype-auth'
import { cn } from '@/lib/utils'

export default function OtpScreen() {
  const router = useRouter()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const setDigit = (i: number, v: string) => {
    const val = v.replace(/\D/g, '').slice(-1)
    setState('idle')
    setDigits((prev) => {
      const next = [...prev]
      next[i] = val
      return next
    })
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const code = digits.join('')

  const verify = () => {
    if (code.length < 6) {
      setState('error')
      return
    }
    setState('loading')
    setTimeout(() => {
      setSignedIn(true)
      router.push('/mobile/dashboard')
    }, 1100)
  }

  return (
    <PhoneShell>
      <div className="flex h-full flex-col px-6 pb-8 pt-4">
        <BackButton fallback="/mobile/login" />

        <div className="mt-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Enter Verification Code</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We sent a six-digit code to <span className="font-semibold text-foreground">+234 903 672 6262</span>.
          </p>
        </div>

        <div className="mt-8 flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              value={d}
              inputMode="numeric"
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
              }}
              className={cn(
                'size-12 rounded-xl border text-center font-heading text-xl font-bold text-foreground outline-none transition-colors',
                state === 'error'
                  ? 'border-error bg-error/5'
                  : d
                    ? 'border-orange bg-orange/5'
                    : 'border-border bg-card focus:border-orange',
              )}
            />
          ))}
        </div>

        {state === 'error' && (
          <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-error">
            <AlertCircle className="size-4" />
            Invalid code. Please check and try again.
          </p>
        )}

        <div className="mt-8 space-y-3">
          <button
            onClick={verify}
            disabled={state === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover disabled:opacity-70"
          >
            {state === 'loading' && <Loader2 className="size-4 animate-spin" />}
            {state === 'loading' ? 'Verifying...' : 'Verify and Continue'}
          </button>
          <button className="w-full py-2 text-center text-sm font-semibold text-orange">Resend Code</button>
          <button
            onClick={() => router.push('/mobile/login')}
            className="w-full py-1 text-center text-sm font-semibold text-muted-foreground"
          >
            Change Phone Number
          </button>
        </div>

        <p className="mt-auto text-center text-xs text-muted-foreground">Code expires in 04:59</p>
      </div>
    </PhoneShell>
  )
}
