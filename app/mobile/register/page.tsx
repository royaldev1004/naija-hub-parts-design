'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, MapPin, Check } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { setSignedIn } from '@/lib/prototype-auth'
import { cn } from '@/lib/utils'

const steps = ['Business', 'Contact', 'Location', 'Agreement']

function Field({
  label,
  placeholder,
  textarea,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  textarea?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange placeholder:text-muted-foreground"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange placeholder:text-muted-foreground"
        />
      )}
    </div>
  )
}

export default function RegisterScreen() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [confirmPhysical, setConfirmPhysical] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [form, setForm] = useState({
    shop: 'Ladipo Auto Spares',
    owner: 'Tinuoye Adeyemi',
    cac: 'RC-1846352',
    desc: 'Genuine and quality-grade car parts for Toyota, Honda and Nissan models.',
    phone: '903 672 6262',
    whatsapp: '903 672 6262',
    email: 'sales@ladipoautospares.ng',
    city: 'Mushin',
    address: '50 Ladipo Market Road',
    landmark: 'Opposite Ladipo Main Gate',
  })
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1)
    else {
      setSignedIn(true)
      router.push('/mobile/pending')
    }
  }
  const canSubmit = step < 3 || (confirmPhysical && agreeTerms)

  return (
    <PhoneShell>
      <div className="flex h-full flex-col">
        <header className="px-6 pb-2 pt-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => (step === 0 ? router.back() : setStep((s) => s - 1))}
              aria-label="Back"
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-5" />
            </button>
            <Logo variant="light" size={32} />
          </div>
          <h1 className="mt-4 font-heading text-xl font-bold text-foreground">Register Your Store</h1>
          {/* Progress */}
          <div className="mt-4 flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={cn('h-1.5 rounded-full', i <= step ? 'bg-orange' : 'bg-border')}
                />
                <span
                  className={cn(
                    'text-[10px] font-semibold',
                    i === step ? 'text-orange' : 'text-muted-foreground',
                  )}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {step === 0 && (
            <>
              <Field label="Business or Shop Name" placeholder="e.g. Ladipo Auto Spares" value={form.shop} onChange={set('shop')} />
              <Field label="Owner or Contact Name" placeholder="Full name" value={form.owner} onChange={set('owner')} />
              <Field label="CAC Registration Number" placeholder="RC-000000" value={form.cac} onChange={set('cac')} />
              <Field label="Business Description" placeholder="What does your store sell?" textarea value={form.desc} onChange={set('desc')} />
              <div>
                <label className="text-sm font-semibold text-foreground">Automotive Category</label>
                <select className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange">
                  <option>Car Parts</option>
                  <option>Motorcycle Parts</option>
                  <option>Truck &amp; Trailer</option>
                  <option>Tractor &amp; Farm</option>
                  <option>Heavy Equipment</option>
                  <option>Electrical Parts</option>
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Phone Number" placeholder="+234 ..." value={form.phone} onChange={set('phone')} />
              <Field label="WhatsApp Number" placeholder="+234 ..." value={form.whatsapp} onChange={set('whatsapp')} />
              <Field label="Email Address" placeholder="you@business.ng" value={form.email} onChange={set('email')} />
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-sm font-semibold text-foreground">State</label>
                <select className="mt-1.5 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange">
                  <option>Lagos</option>
                  <option>Kano</option>
                  <option>Anambra</option>
                  <option>Kaduna</option>
                  <option>Rivers</option>
                </select>
              </div>
              <Field label="City" placeholder="City" value={form.city} onChange={set('city')} />
              <Field label="Full Shop Address" placeholder="Street address" value={form.address} onChange={set('address')} />
              <Field label="Landmark" placeholder="Nearest landmark" value={form.landmark} onChange={set('landmark')} />
              <div>
                <label className="text-sm font-semibold text-foreground">Map location</label>
                <button className="mt-1.5 flex w-full items-center gap-2 rounded-xl border border-dashed border-border bg-warm px-3 py-4 text-sm font-semibold text-foreground">
                  <MapPin className="size-4 text-orange" />
                  Select store location on map
                </button>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">Storefront photo</label>
                <button className="mt-1.5 flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-warm px-3 py-6 text-sm font-semibold text-muted-foreground">
                  <Upload className="size-5 text-orange" />
                  Upload storefront photo
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-warm p-4">
                <p className="text-sm font-semibold text-foreground">Review before submitting</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {form.shop} · {form.city} · CAC {form.cac}
                </p>
              </div>
              <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                <input
                  type="checkbox"
                  checked={confirmPhysical}
                  onChange={(e) => setConfirmPhysical(e.target.checked)}
                  className="mt-0.5 size-4 accent-orange"
                />
                <span className="text-sm leading-relaxed text-foreground">
                  I confirm that this business has a physical store location in Nigeria.
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 size-4 accent-orange"
                />
                <span className="text-sm leading-relaxed text-foreground">
                  I agree to the Terms and Privacy Policy.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="border-t border-border px-6 pb-8 pt-3">
          <button
            onClick={next}
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover disabled:opacity-50"
          >
            {step === 3 ? (
              <>
                <Check className="size-4" />
                Submit for Verification
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </PhoneShell>
  )
}
