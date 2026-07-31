const CHART_COLORS = ['#ff6a00', '#0b0b0b', '#6b7280', '#168a45', '#d88a00', '#c9362b']

export function BarChart({
  data,
  valueKey,
  labelKey,
  formatValue = (v: number) => String(v),
}: {
  data: Record<string, string | number>[]
  valueKey: string
  labelKey: string
  formatValue?: (v: number) => string
}) {
  const max = Math.max(...data.map((d) => Number(d[valueKey])))
  return (
    <div className="flex h-52 items-end gap-3">
      {data.map((d) => {
        const value = Number(d[valueKey])
        const pct = max ? (value / max) * 100 : 0
        return (
          <div key={String(d[labelKey])} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-foreground">{formatValue(value)}</span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-orange transition-all"
                style={{ height: `${pct}%`, minHeight: 4 }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground">{String(d[labelKey])}</span>
          </div>
        )
      })}
    </div>
  )
}

export function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <div className="relative size-40">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          {data.map((d, i) => {
            const fraction = total ? d.value / total : 0
            const dash = fraction * circumference
            const seg = (
              <circle
                key={d.name}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={CHART_COLORS[i % CHART_COLORS.length]}
                strokeWidth="20"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += dash
            return seg
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">dealers</span>
        </div>
      </div>
      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="size-3 rounded-sm"
              style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            <span className="text-foreground">{d.name}</span>
            <span className="ml-auto pl-4 font-semibold text-muted-foreground">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
