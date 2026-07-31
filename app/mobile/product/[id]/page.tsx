import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/data'
import { ProductDetailView } from './product-detail-view'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  return <ProductDetailView product={product} />
}
