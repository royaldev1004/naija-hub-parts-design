import { Suspense } from 'react'
import { BrowseClient } from './browse-client'

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; state?: string; category?: string }>
}) {
  const params = await searchParams
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12 text-sm text-muted-foreground">Loading parts…</div>}>
      <BrowseClient initialQuery={params.q ?? ''} initialState={params.state ?? ''} />
    </Suspense>
  )
}
