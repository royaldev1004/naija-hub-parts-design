'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { PhoneShell } from '@/components/mobile/phone-shell'

export default function SplashScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 2200
    const id = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(id)
    }, 40)
    const nav = setTimeout(() => router.push('/mobile/welcome'), duration + 200)
    return () => {
      clearInterval(id)
      clearTimeout(nav)
    }
  }, [router])

  return (
    <PhoneShell dark statusBar={false}>
      <div className="flex h-full flex-col items-center justify-between bg-dark px-8 py-16 text-center">
        <div />
        <div className="flex flex-col items-center">
          <Logo variant="dark" size={112} />
          <h1 className="mt-6 font-heading text-2xl font-bold text-white">Naija Parts Hub</h1>
          <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-white/60">
            Find automotive parts from verified Nigerian dealers
          </p>
          <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-orange transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-white/40">Operated by Lytod Motors Ltd</p>
      </div>
    </PhoneShell>
  )
}
