'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, MapPin, Phone, Mail, FileText, Check, Ban, HelpCircle } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/brand/badges'
import { cn } from '@/lib/utils'
import { businesses, type Business } from '@/lib/admin-data'

const filters = ['pending', 'approved', 'rejected', 'suspended'] as const
type Filter = (typeof filters)[number] | 'all'

export function VerificationClient() {
  const [filter, setFilter] = useState<Filter>('pending')
  const [selected, setSelected] = useState<Business | null>(null)

  const rows = businesses.filter((b) => (filter === 'all' ? true : b.status === filter))

  return (
    <div>
      <AdminPageHeader
        title="Business Verification"
        subtitle="Review and approve dealer applications"
      />

      <div className="p-5 sm:p-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', ...filters] as Filter[]).map((f) => {
            const count = f === 'all' ? businesses.length : businesses.filter((b) => b.status === f).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors',
                  filter === f
                    ? 'border-orange bg-orange text-white'
                    : 'border-border bg-card text-foreground hover:border-orange/40',
                )}
              >
                {f}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-[10px]',
                    filter === f ? 'bg-white/20' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border bg-warm text-left text-xs font-semibold text-muted-foreground">
                <th className="px-4 py-3">Business Name</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">CAC Number</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3 font-semibold text-foreground">{b.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.owner}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.cac}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.submitted}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelected(b)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No businesses in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && <DetailDrawer business={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function DetailDrawer({ business, onClose }: { business: Business; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Business Details</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-8 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{business.name}</h3>
              <p className="text-sm text-muted-foreground">{business.category}</p>
            </div>
            <StatusBadge status={business.status} />
          </div>

          {/* Storefront photo */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
            <Image src="/store-front.png" alt="Storefront photo" fill className="object-cover" />
          </div>

          <Section title="Business Information">
            <Row label="Owner / Contact" value={business.owner} />
            <Row label="CAC Registration" value={business.cac} mono />
            <Row label="Description" value={business.description} />
          </Section>

          <Section title="Contact Information">
            <IconRow icon={Phone} value={business.phone} />
            <IconRow icon={Mail} value={business.email} />
            <IconRow icon={MapPin} value={business.address} />
          </Section>

          <Section title="Registration">
            <IconRow icon={FileText} value={`Submitted ${business.submitted}`} />
          </Section>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 space-y-2 border-t border-border bg-card p-4">
          <div className="flex gap-2">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-success py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-95">
              <Check className="size-4" />
              Approve
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-error py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-95">
              <Ban className="size-4" />
              Reject
            </button>
          </div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
            <HelpCircle className="size-4" />
            Request More Information
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
      <div className="space-y-2 rounded-xl border border-border bg-warm p-4">{children}</div>
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('mt-0.5 text-sm text-foreground', mono && 'font-mono')}>{value}</p>
    </div>
  )
}

function IconRow({ icon: Icon, value }: { icon: React.ComponentType<{ className?: string }>; value: string }) {
  return (
    <p className="flex items-start gap-2 text-sm text-foreground">
      <Icon className="mt-0.5 size-4 shrink-0 text-orange" />
      {value}
    </p>
  )
}
