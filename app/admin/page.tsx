import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'
import { Logo } from '@/components/brand/logo'

export const metadata = {
  title: 'Admin Sign In — Naija Parts Hub',
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-dark px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Logo variant="dark" size={56} />
          <h1 className="mt-5 font-heading text-2xl font-bold text-white">Admin Console</h1>
          <p className="mt-1 text-sm text-white/60">Sign in to manage the Naija Parts Hub marketplace.</p>
        </div>

        <form className="mt-8 rounded-2xl border border-white/10 bg-soft-black p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/80">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-dark px-3 py-2.5">
              <Mail className="size-4 text-white/40" />
              <input
                type="email"
                defaultValue="ops@lytodmotors.com"
                placeholder="you@lytodmotors.com"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-white/80">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-dark px-3 py-2.5">
              <Lock className="size-4 text-white/40" />
              <input
                type="password"
                defaultValue="password"
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
          </label>

          <div className="mt-3 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/70">
              <input type="checkbox" className="size-4 accent-orange" defaultChecked />
              Remember me
            </label>
            <button type="button" className="font-semibold text-orange hover:text-orange-hover">
              Forgot password?
            </button>
          </div>

          <Link
            href="/admin/overview"
            className="mt-6 block rounded-xl bg-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            Sign In
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Operated by Lytod Motors Ltd · Authorized personnel only
        </p>
      </div>
    </main>
  )
}
