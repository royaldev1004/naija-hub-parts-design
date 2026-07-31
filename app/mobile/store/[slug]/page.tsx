import { notFound } from 'next/navigation'
import { getStore, productsByStore } from '@/lib/data'
import { StoreView } from './store-view'

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = getStore(slug)
  if (!store) notFound()
  return <StoreView store={store} products={productsByStore(slug)} />
}
