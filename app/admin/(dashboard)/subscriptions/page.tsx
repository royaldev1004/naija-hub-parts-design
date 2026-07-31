import { Download } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/brand/badges'
import { formatNaira } from '@/lib/data'
import { adminSubscriptions } from '@/lib/admin-data'

export default function AdminSubscriptionsPage() {
  const active = adminSubscriptions.filter((s) => s.status === 'active').length
  const revenue = adminSubscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0)

  return (
    <div>
      <AdminPageHeader
        title="Subscriptions"
        subtitle="Manage dealer plans and Paystack payments"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover">
            <Download className="size-4" />
            Export CSV
          </button>
        }
      />

      <div className="space-y-6 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SummaryCard label="Active Subscriptions" value={String(active)} />
          <SummaryCard label="Recognized Revenue" value={formatNaira(revenue)} />
          <SummaryCard label="Expired" value={String(adminSubscriptions.filter((s) => s.status === 'expired').length)} />
          <SummaryCard label="Pending" value={String(adminSubscriptions.filter((s) => s.status === 'pending').length)} />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border bg-warm text-left text-xs font-semibold text-muted-foreground">
                <th className="px-4 py-3">Store</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Paystack Reference</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Expiration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminSubscriptions.map((s) => (
                <tr key={s.reference} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3 font-semibold text-foreground">{s.store}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.plan}</td>
                  <td className="px-4 py-3 text-foreground">{formatNaira(s.amount)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.reference}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.start}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.expiry}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status === 'expired' ? 'archived' : s.status === 'pending' ? 'pending' : 'active'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
                        View
                      </button>
                      <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
                        Extend
                      </button>
                      <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-error hover:bg-muted">
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-heading text-xl font-bold text-foreground">{value}</p>
    </div>
  )
}
