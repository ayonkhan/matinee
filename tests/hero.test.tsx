import { describe, expect, it } from 'vitest'
import { Hero } from '../src/components/hero'

const render = (node: unknown) => String(node)

describe('Hero', () => {
  it('shows the headline as the heading of the page', () => {
    expect(render(<Hero title="Everything in one place" />)).toMatch(/<h1[^>]*>Everything in one place<\/h1>/)
  })

  it('shows the text under the headline when there is some', () => {
    expect(render(<Hero title="x">Write your notes.</Hero>)).toContain('Write your notes.')
    expect(render(<Hero title="x" />)).not.toContain('<p')
  })

  it('shows the main action and the second one as links', () => {
    const html = render(
      <Hero title="x" action={{ label: 'Sign up', href: '/sign-up' }} secondaryAction={{ label: 'Sign in', href: '/sign-in' }} />,
    )

    expect(html).toContain('href="/sign-up"')
    expect(html).toContain('Sign up')
    expect(html).toContain('href="/sign-in"')
    expect(html).toContain('Sign in')
    // The main action is solid and the second one is outlined.
    expect(html.indexOf('bg-accent')).toBeLessThan(html.indexOf('Sign up'))
    expect(html).toContain('border border-line')
  })

  it('shows no buttons when there are no actions', () => {
    expect(render(<Hero title="x" />)).not.toContain('<a ')
  })

  it('shows the note under the buttons', () => {
    expect(render(<Hero title="x" note="Free to try." />)).toContain('Free to try.')
    expect(render(<Hero title="x" />)).not.toContain('type-hint')
  })

  it('puts the background behind the text and hides it from screen readers', () => {
    const html = render(<Hero title="x" background={<div id="wall"></div>} />)

    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('id="wall"')
    expect(html).toContain('-z-10')
    expect(html.indexOf('id="wall"')).toBeLessThan(html.indexOf('<h1'))
  })

  it('has no background markup without one', () => {
    const html = render(<Hero title="x" />)

    expect(html).not.toContain('aria-hidden')
    expect(html).not.toContain('radial-gradient')
  })

  it('can be as wide as a wide page', () => {
    expect(render(<Hero title="x" />)).toContain('max-w-5xl px-4')
    expect(render(<Hero title="x" width="wide" />)).toContain('max-w-6xl')
  })

  it('leaves the space around it to the page', () => {
    expect(render(<Hero title="x" class="mt-8" />)).toContain('mt-8')
  })

  it('escapes the headline, the text and the note', () => {
    const html = render(
      <Hero title={'<script>alert(1)</script>'} note={'<i>n</i>'}>
        {'<b>t</b>'}
      </Hero>,
    )

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<i>n</i>')
    expect(html).not.toContain('<b>t</b>')
  })
})
