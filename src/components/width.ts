// Shared by TopBar, Footer and Banner, so they can line up with the width of the page.

export type ContentWidth = 'narrow' | 'wide'

// narrow is the default. Use wide when the page itself is wider.
export const widths: Record<ContentWidth, string> = {
  narrow: 'max-w-5xl',
  wide: 'max-w-6xl',
}
