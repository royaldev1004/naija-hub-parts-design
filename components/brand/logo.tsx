import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  variant?: 'dark' | 'light'
  size?: number
  withWordmark?: boolean
  className?: string
}

/**
 * NHP brand logo.
 * - variant="dark": orange-gear-on-black icon (use on splash, app icon, dark headers, favicon)
 * - variant="light": black-gear-on-white icon (use on registration, white headers, light backgrounds)
 */
export function Logo({ variant = 'dark', size = 40, withWordmark = false, className }: LogoProps) {
  const src = variant === 'dark' ? '/nhp-logo-dark.jpeg' : '/nhp-logo-light.jpeg'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={src || '/placeholder.svg'}
        alt="Naija Hub Parts logo"
        width={size}
        height={size}
        className="rounded-xl object-cover"
        priority
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-heading font-bold tracking-tight',
              variant === 'dark' ? 'text-white' : 'text-foreground',
            )}
            style={{ fontSize: size * 0.42 }}
          >
            Naija Hub Parts
          </span>
          <span
            className="text-muted-foreground mt-0.5"
            style={{ fontSize: Math.max(9, size * 0.22) }}
          >
            by Lytod Motors Ltd
          </span>
        </span>
      )}
    </span>
  )
}
