'use client'

/**
 * Lightweight client-side "signed in" flag for the clickable prototype.
 * This is NOT real authentication — it only makes the guest → dealer-login
 * (phone + OTP) flow behave correctly in the design mockup.
 */
const SIGNED_IN_KEY = 'nhp_signed_in'

export function setSignedIn(value: boolean) {
  if (typeof window === 'undefined') return
  if (value) {
    window.sessionStorage.setItem(SIGNED_IN_KEY, '1')
  } else {
    window.sessionStorage.removeItem(SIGNED_IN_KEY)
  }
  // Notify listeners (e.g. bottom nav) in the same tab.
  window.dispatchEvent(new Event('nhp-auth-change'))
}

export function isSignedIn(): boolean {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(SIGNED_IN_KEY) === '1'
}
