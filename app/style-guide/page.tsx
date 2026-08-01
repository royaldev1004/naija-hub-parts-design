import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { VerifiedBadge, ConditionBadge, StatusBadge } from '@/components/brand/badges'
import { WhatsAppButton, CallButton } from '@/components/brand/contact-buttons'
import { FilterChip, EmptyState } from '@/components/brand/ui-bits'
import { ProductCard } from '@/components/brand/product-card'
import { StoreCard } from '@/components/brand/store-card'
import { products, stores } from '@/lib/data'

const colors = [
  { name: 'Primary Orange', hex: '#FF6A00', var: '--orange' },
  { name: 'Orange Hover', hex: '#E95F00', var: '--orange-hover' },
  { name: 'Dark Background', hex: '#0B0B0B', var: '--dark' },
  { name: 'Soft Black', hex: '#171717', var: '--soft-black' },
  { name: 'Warm Background', hex: '#F7F7F4', var: '--warm' },
  { name: 'Light Gray', hex: '#F1F2F4', var: '--muted' },
  { name: 'Border Gray', hex: '#D9DCE1', var: '--border' },
  { name: 'Secondary Text', hex: '#6B7280', var: '--muted-foreground' },
  { name: 'Success Green', hex: '#168A45', var: '--success' },
  { name: 'Warning Amber', hex: '#D88A00', var: '--warning' },
  { name: 'Error Red', hex: '#C9362B', var: '--error' },
  { name: 'WhatsApp Green', hex: '#25D366', var: '--whatsapp' },
]

const typeScale = [
  { label: 'Page title', cls: 'font-heading text-3xl font-bold', spec: '28–32px · Bold' },
  { label: 'Section title', cls: 'font-heading text-2xl font-semibold', spec: '20–24px · Semibold' },
  { label: 'Card title', cls: 'font-heading text-lg font-semibold', spec: '16–18px · Semibold' },
  { label: 'Body', cls: 'text-base', spec: '14–16px · Regular' },
  { label: 'Supporting text', cls: 'text-sm text-muted-foreground', spec: '12–14px · Regular' },
]

const spacing = [
  { token: '1', px: '4px' },
  { token: '2', px: '8px' },
  { token: '3', px: '12px' },
  { token: '4', px: '16px' },
  { token: '6', px: '24px' },
  { token: '8', px: '32px' },
]

export default function StyleGuidePage() {
  return (
    <main className="min-h-dvh bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo variant="light" size={36} withWordmark />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange-hover"
          >
            <ArrowLeft className="size-4" />
            Back to hub
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-14 px-5 py-10 sm:px-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Design System</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The developer-ready style guide for Naija Parts Hub — colors, typography, spacing, buttons, cards,
            badges and component behaviour. Built on an 8-point spacing system with Inter &amp; Manrope.
          </p>
        </div>

        {/* Logos */}
        <Section title="Logo usage">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-dark p-8">
              <Logo variant="dark" size={64} />
              <p className="text-xs text-white/60">Dark variant · splash, app icon, dark headers, favicon</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8">
              <Logo variant="light" size={64} />
              <p className="text-xs text-muted-foreground">Light variant · white backgrounds, registration</p>
            </div>
          </div>
        </Section>

        {/* Colors */}
        <Section title="Color system">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="h-20" style={{ backgroundColor: c.hex }} />
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="mt-0.5 font-mono text-xs uppercase text-muted-foreground">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            {typeScale.map((t) => (
              <div key={t.label} className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between">
                <span className={`${t.cls} text-foreground`}>{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.spec}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Spacing (8-point system)">
          <div className="flex flex-wrap items-end gap-6 rounded-2xl border border-border bg-card p-6">
            {spacing.map((s) => (
              <div key={s.token} className="flex flex-col items-center gap-2">
                <div className="bg-orange" style={{ width: s.px, height: s.px }} />
                <span className="font-mono text-xs text-foreground">p-{s.token}</span>
                <span className="text-[11px] text-muted-foreground">{s.px}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons & states">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
            <button className="rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-white">Primary</button>
            <button className="rounded-xl bg-orange-hover px-4 py-2.5 text-sm font-semibold text-white">Primary · Hover</button>
            <button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground">Secondary</button>
            <button className="rounded-xl border border-orange px-4 py-2.5 text-sm font-semibold text-orange">Outline</button>
            <button disabled className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground">Disabled</button>
            <button className="rounded-xl bg-error px-4 py-2.5 text-sm font-semibold text-white">Destructive</button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
            <WhatsAppButton />
            <CallButton />
            <WhatsAppButton size="icon" />
            <CallButton size="icon" />
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
            <VerifiedBadge />
            <ConditionBadge condition="New" />
            <ConditionBadge condition="Used" />
            <StatusBadge status="active" />
            <StatusBadge status="pending" />
            <StatusBadge status="approved" />
            <StatusBadge status="rejected" />
            <StatusBadge status="suspended" />
            <StatusBadge status="draft" />
            <StatusBadge status="reported" />
            <StatusBadge status="removed" />
          </div>
        </Section>

        {/* Form inputs */}
        <Section title="Form inputs">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Default input</span>
              <input
                placeholder="Enter part name"
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-orange"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Error state</span>
              <input
                defaultValue="Invalid value"
                className="w-full rounded-xl border border-error bg-card px-3 py-2.5 text-sm text-foreground outline-none"
              />
              <span className="mt-1 block text-xs text-error">This field is required.</span>
            </label>
          </div>
        </Section>

        {/* Filter chips */}
        <Section title="Filter chips">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-6">
            <FilterChip label="Category" active />
            <FilterChip label="Location" />
            <FilterChip label="Condition" />
            <FilterChip label="Verified Sellers" />
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard product={products[0]} href="#" />
            <div className="space-y-3">
              <ProductCard product={products[1]} href="#" layout="list" />
              <StoreCard store={stores[0]} href="#" />
            </div>
          </div>
        </Section>

        {/* Empty state */}
        <Section title="Empty state">
          <div className="rounded-2xl border border-border bg-card">
            <EmptyState
              title="No matching parts found"
              message="Try another part name, vehicle model, category, or location."
              actionLabel="Clear Filters"
            />
          </div>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}
