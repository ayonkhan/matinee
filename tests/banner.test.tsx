import { describe, expect, it } from 'vitest'
import { Banner, bannerScript } from '../src/components/banner'

const render = (node: unknown) => String(node)

describe('Banner', () => {
  it('shows its message', () => {
    expect(render(<Banner id="cookies">We keep you signed in.</Banner>)).toContain('We keep you signed in.')
  })

  it('starts hidden, so a dismissed banner never flashes', () => {
    expect(render(<Banner id="cookies">x</Banner>)).toMatch(/data-banner="cookies"[^>]*\bhidden\b/)
  })

  it('has a button that dismisses it, labelled Got it unless told otherwise', () => {
    expect(render(<Banner id="cookies">x</Banner>)).toMatch(/data-banner-close[^>]*>\s*Got it/)
    expect(render(<Banner id="cookies" action="Close">x</Banner>)).toMatch(/data-banner-close[^>]*>\s*Close/)
  })

  it('is a named region for screen readers', () => {
    const html = render(<Banner id="cookies">x</Banner>)

    expect(html).toContain('role="region"')
    expect(html).toContain('aria-label="Notice"')
    expect(render(<Banner id="cookies" label="Cookie notice">x</Banner>)).toContain('aria-label="Cookie notice"')
  })

  it('sticks to the bottom of the screen by default and stays in the page when inline', () => {
    expect(render(<Banner id="cookies">x</Banner>)).toContain('fixed inset-x-0 bottom-0')
    expect(render(<Banner id="cookies" placement="inline">x</Banner>)).not.toContain('fixed')
  })

  it('sticks to the top when asked', () => {
    const html = render(
      <Banner id="news" edge="top">
        x
      </Banner>,
    )

    expect(html).toContain('fixed inset-x-0 top-0')
    expect(html).not.toContain('bottom-0')
  })

  it('ignores the edge when inline', () => {
    const html = render(
      <Banner id="news" placement="inline" edge="top">
        x
      </Banner>,
    )

    expect(html).not.toContain('fixed')
    expect(html).not.toContain('top-0')
  })

  it('remembers a dismissal unless told not to', () => {
    expect(render(<Banner id="cookies">x</Banner>)).toContain('data-remember="true"')
    expect(render(<Banner id="cookies" remember={false}>x</Banner>)).toContain('data-remember="false"')
  })

  it('adds extra classes', () => {
    expect(render(<Banner id="cookies" class="mt-4">x</Banner>)).toContain('mt-4')
  })

  it('escapes its id and label', () => {
    const html = render(
      <Banner id={'"><script>alert(1)</script>'} label={'<b>hi</b>'}>
        x
      </Banner>,
    )

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>hi</b>')
  })
})

describe('bannerScript', () => {
  it('keeps the choice in localStorage and never writes a cookie', () => {
    expect(bannerScript).toContain('localStorage')
    expect(bannerScript).not.toContain('document.cookie')
  })

  it('shows a banner only when it was not dismissed before', () => {
    expect(bannerScript).toContain('banner.hidden = false')
    expect(bannerScript).toContain("'matinee.banner.'")
  })

  it('is plain code, with no markup in it', () => {
    expect(bannerScript).not.toContain('<')
  })
})
