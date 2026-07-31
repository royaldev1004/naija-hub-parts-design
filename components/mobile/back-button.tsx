'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type BackButtonProps = {
  /** Where to go when there is no in-app history to return to. */
  fallback?: string
  className?: string
  label?: string
  /** Optional custom handler (e.g. multi-step wizards). Overrides default nav. */
  onBack?: () => void
}

/**
 * Reliable back navigation for the prototype.
 *
 * `router.back()` alone is unreliable here because most screens can be opened
 * directly (from the web pages, footer links, the welcome hub, or a fresh tab).
 * In those cases there is no in-app history entry and `router.back()` does
 * nothing. This component falls back to a sensible parent route instead.
 */
export function BackButton({
  fallback = '/mobile/home',
  className,
  label = 'Back',
  onBack,
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // history.length > 1 means we navigated here from within the app session.
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={label}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted',
        className,
      )}
    >
      <ArrowLeft className="size-5" />
    </button>
  )
}
