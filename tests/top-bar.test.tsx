import { describe, expect, it } from 'vitest'
import { TopBar } from '../src/components/top-bar'

const render = (node: unknown) => String(node)

const brand = { name: 'Matinee', href: '/' }

const links = [
  { label: 'Home', href: '/', current: true },
  { label: 'Browse', href: '/browse' },
]

const user = {
  name: 'swift-raven-5065',
  menu: [
    { label: 'Your profile', href: '/u/swift-raven-5065' },
    { label: 'Sign out', href: '/sign-out', post: true },
  ],
}

describe('TopBar', () => {
  it('shows the brand as a link', () => {
    const html = render(<TopBar brand={brand} />)

    expect(html).toContain('<header')
    expect(html).toContain('href="/"')
    expect(html).toContain('Matinee')
  })

  it('renders the main links inside a labelled nav', () => {
    const html = render(<TopBar brand={brand} links={links} />)

    expect(html).toContain('<nav')
    expect(html).toContain('aria-label="Main"')
    expect(html).toContain('Browse')
    expect(html).toContain('href="/browse"')
  })

  it('marks the current page', () => {
    const html = render(<TopBar brand={brand} links={links} />)

    expect(html.match(/aria-current="page"/g)).toHaveLength(1)
  })

  it('has no nav without links', () => {
    expect(render(<TopBar brand={brand} />)).not.toContain('<nav')
  })

  it('shows the action button', () => {
    const html = render(<TopBar brand={brand} action={{ label: 'New', href: '/new' }} />)

    expect(html).toContain('New')
    expect(html).toContain('href="/new"')
  })

  it('opens the account menu with details and summary, no script needed', () => {
    const html = render(<TopBar brand={brand} user={user} />)

    expect(html).toContain('<details')
    expect(html).toContain('<summary')
    expect(html).toContain('aria-label="Account menu"')
    expect(html).not.toContain('<script')
  })

  it('lists the menu items and the username', () => {
    const html = render(<TopBar brand={brand} user={user} />)

    expect(html).toContain('Your profile')
    expect(html).toContain('href="/u/swift-raven-5065"')
    expect(html).toContain('swift-raven-5065')
  })

  it('sends sign out as a POST form', () => {
    const html = render(<TopBar brand={brand} user={user} />)

    expect(html).toContain('<form')
    expect(html).toContain('method="post"')
    expect(html).toContain('action="/sign-out"')
  })

  it('shows initials when there is no avatar image', () => {
    expect(render(<TopBar brand={brand} user={user} />)).toContain('>SR<')
  })

  it('shows the avatar image when there is one', () => {
    const html = render(<TopBar brand={brand} user={{ ...user, avatarSrc: '/a.jpg' }} />)

    expect(html).toContain('src="/a.jpg"')
    expect(html).not.toContain('>SR<')
  })

  it('can start with the menu open', () => {
    expect(render(<TopBar brand={brand} user={{ ...user, open: true }} />)).toContain('open')
  })

  it('has no account menu when signed out', () => {
    expect(render(<TopBar brand={brand} />)).not.toContain('<details')
  })

  it('escapes the user name', () => {
    const html = render(<TopBar brand={brand} user={{ ...user, name: '<script>alert(1)</script>' }} />)

    expect(html).not.toContain('<script>')
  })

  it('is as wide as the narrow page by default and can match a wider one', () => {
    expect(render(<TopBar brand={brand} />)).toContain('max-w-5xl')
    expect(render(<TopBar brand={brand} width="wide" />)).toContain('max-w-6xl')
    expect(render(<TopBar brand={brand} width="wide" />)).not.toContain('max-w-5xl')
  })

  it('takes markup as the brand name', () => {
    const html = render(<TopBar brand={{ name: <>mfdb<span class="text-accent">.</span></>, href: '/' }} />)

    expect(html).toContain('mfdb<span class="text-accent">.</span>')
  })

  it('shows the action on every screen when signed out, and only from sm up when signed in', () => {
    const action = { label: 'Sign up', href: '/sign-up' }

    expect(render(<TopBar brand={brand} action={action} />)).not.toContain('hidden sm:block')
    expect(render(<TopBar brand={brand} action={action} user={user} />)).toContain('hidden sm:block')
  })

  it('shows a secondary link only when signed out', () => {
    const secondary = { label: 'Sign in', href: '/sign-in' }

    expect(render(<TopBar brand={brand} secondary={secondary} />)).toContain('href="/sign-in"')
    expect(render(<TopBar brand={brand} secondary={secondary} />)).toContain('Sign in')
    expect(render(<TopBar brand={brand} secondary={secondary} user={user} />)).not.toContain('Sign in')
  })
})
