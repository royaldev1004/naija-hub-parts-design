import { AdminPageHeader } from '@/components/admin/page-header'
import { BarChart, DonutChart } from '@/components/admin/charts'
import { cn } from '@/lib/utils'
import {
  overviewStats,
  newStoresByMonth,
  listingsByCategory,
  subscriptionBreakdown,
  recentActivity,
} from '@/lib/admin-data'

const toneStyles: Record<string, string> = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export default function AdminOverviewPage() {
  return (
    <div>
      <AdminPageHeader title="Overview" subtitle="Marketplace health at a glance" />

      <div className="space-y-6 p-5 sm:p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {overviewStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className={cn('mt-1 text-xs font-medium', toneStyles[s.tone])}>{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-semibold text-foreground">New stores by month</h2>
            <p className="text-xs text-muted-foreground">Approved dealer stores, last 6 months</p>
            <div className="mt-5">
              <BarChart data={newStoresByMonth} valueKey="stores" labelKey="month" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-semibold text-foreground">Subscription breakdown</h2>
            <p className="text-xs text-muted-foreground">Distribution of active dealer plans</p>
            <div className="mt-5">
              <DonutChart data={subscriptionBreakdown} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-semibold text-foreground">Listings by category</h2>
            <p className="text-xs text-muted-foreground">Active listings across the marketplace</p>
            <div className="mt-5">
              <BarChart
                data={listingsByCategory}
                valueKey="count"
                labelKey="category"
                formatValue={(v) => v.toLocaleString('en-NG')}
              />
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-base font-semibold text-foreground">Recent activity</h2>
            <ul className="mt-4 space-y-4">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-orange" />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.time} · {a.tag}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
