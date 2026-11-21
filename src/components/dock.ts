// Shared by BottomNav and ActionBar, the two bars that sit at the bottom of a phone screen.

export type Placement = 'fixed' | 'inline'

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// The rounded, floating bar itself.
export const floatingBar =
  'pointer-events-auto flex items-center rounded-full border border-line bg-card shadow-float'

// "fixed" floats above the page on phones only. "inline" is for previews and the gallery.
export function dock(placement: Placement, extra?: string) {
  return [
    placement === 'fixed'
      ? 'pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:hidden'
      : 'flex justify-center',
    extra ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}
