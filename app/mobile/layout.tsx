import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-200/70 sm:py-6">
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 hidden items-center gap-1.5 rounded-full bg-dark px-3 py-2 text-xs font-semibold text-white shadow-lg lg:inline-flex"
      >
        <ArrowLeft className="size-4" />
        Prototype Hub
      </Link>
      {children}
    </div>
  )
}
