'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Camera, ImagePlus, Check } from 'lucide-react'
import { PhoneShell } from '@/components/mobile/phone-shell'
import { categories, NAIRA } from '@/lib/data'

const conditions = ['New', 'Used'] as const

export default function AddListingPage() {
  const [condition, setCondition] = useState<(typeof conditions)[number]>('New')
  const [category, setCategory] = useState(categories[0].label)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <PhoneShell nav>
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-orange/10 text-orange">
            <Check className="size-8" />
          </span>
          <h1 className="mt-5 font-heading text-xl font-bold text-foreground">Listing submitted</h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Your part is now live on the NHP marketplace. Buyers can reach you by call or WhatsApp.
          </p>
          <div className="mt-6 flex w-full flex-col gap-2">
            <Link
              href="/mobile/listings"
              className="rounded-xl bg-orange px-4 py-3 text-center text-sm font-semibold text-white hover:bg-orange-hover"
            >
              View my listings
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-orange/40"
            >
              Add another part
            </button>
          </div>
        </div>
      </PhoneShell>
    )
  }

  return (
    <PhoneShell nav>
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Link href="/mobile/home" aria-label="Back" className="text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-base font-semibold text-foreground">Add New Listing</h1>
      </header>

      <form
        className="space-y-5 p-4"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
      >
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">Photos</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-warm text-muted-foreground hover:border-orange/40 hover:text-orange"
            >
              <Camera className="size-6" />
              <span className="text-[10px] font-semibold">Camera</span>
            </button>
            <button
              type="button"
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-warm text-muted-foreground hover:border-orange/40 hover:text-orange"
            >
              <ImagePlus className="size-6" />
              <span className="text-[10px] font-semibold">Gallery</span>
            </button>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              Up to 6
            </div>
          </div>
        </div>

        <Field label="Part name">
          <input
            required
            placeholder="e.g. Toyota Corolla Front Brake Pad"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
          />
        </Field>

        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
          >
            {categories.map((c) => (
              <option key={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">Condition</p>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={
                  'rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ' +
                  (condition === c
                    ? 'border-orange bg-orange text-white'
                    : 'border-border bg-card text-foreground hover:border-orange/40')
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Field label="Price">
          <div className="flex items-center rounded-xl border border-border bg-card px-3 focus-within:border-orange">
            <span className="text-sm font-semibold text-muted-foreground">{NAIRA}</span>
            <input
              required
              inputMode="numeric"
              placeholder="0"
              className="w-full bg-transparent px-2 py-2.5 text-sm text-foreground outline-none"
            />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Vehicle make">
            <input
              placeholder="Toyota"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
            />
          </Field>
          <Field label="Model / year">
            <input
              placeholder="Corolla 2017"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
            />
          </Field>
        </div>

        <Field label="Part number (optional)">
          <input
            placeholder="TCBP-2017-F"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
          />
        </Field>

        <Field label="Description">
          <textarea
            rows={4}
            placeholder="Describe the part, its fitment and condition."
            className="w-full resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-orange"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-white hover:bg-orange-hover"
        >
          Publish listing
        </button>
      </form>
    </PhoneShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  )
}
