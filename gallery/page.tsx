import { raw } from 'hono/html'
import type { PropsWithChildren } from 'hono/jsx'
import { ActionBar, Badge, BottomNav, Button, Card, Field, Notice, Poster, Stars, TopBar } from '../src'

const fonts =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Inter:wght@400;500;600&display=swap'

// Full class names are written out so Tailwind can find them.
const colours = [
  { name: 'page', swatch: 'bg-page' },
  { name: 'card', swatch: 'bg-card' },
  { name: 'raised', swatch: 'bg-raised' },
  { name: 'sunken', swatch: 'bg-sunken' },
  { name: 'line', swatch: 'bg-line' },
  { name: 'ink', swatch: 'bg-ink' },
  { name: 'muted', swatch: 'bg-muted' },
  { name: 'accent', swatch: 'bg-accent' },
  { name: 'danger', swatch: 'bg-danger' },
]

// Full class names are written out so Tailwind can find them.
const typeStyles = [
  { name: 'type-display', cls: 'type-display', sample: 'Your films, rated' },
  { name: 'type-heading', cls: 'type-heading', sample: 'Recently added' },
  { name: 'type-body', cls: 'type-body', sample: 'Quiet and devastating. The last shot stays with you.' },
  { name: 'type-label', cls: 'type-label', sample: 'Rating' },
  { name: 'type-hint', cls: 'type-hint', sample: 'Up to 200 characters.' },
  { name: 'type-overline', cls: 'type-overline', sample: 'Live preview' },
  { name: 'type-code', cls: 'type-code', sample: '<Button variant="primary">Save</Button>' },
]

// Sample artwork drawn here, so the public gallery never shows a real studio poster.
function sampleArt(from: string, to: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="200" height="300" fill="url(#g)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const artGold = sampleArt('#f0b44c', '#7a3d0c')
const artBlue = sampleArt('#4c8ff0', '#1b1e4a')
const artRose = sampleArt('#f06c8a', '#3a1230')

const barLinks = [
  { label: 'Home', href: '#', current: true },
  { label: 'Browse', href: '#' },
  { label: 'Saved', href: '#' },
  { label: 'People', href: '#' },
]

const barUser = {
  name: 'swift-raven-5065',
  menu: [
    { label: 'Your profile', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Sign out', href: '#', post: true },
  ],
}

function Icon(props: PropsWithChildren) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6">
      {props.children}
    </svg>
  )
}

const navItems = [
  {
    label: 'Home',
    href: '#',
    current: true,
    icon: (
      <Icon>
        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
      </Icon>
    ),
  },
  {
    label: 'Browse',
    href: '#',
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
      </Icon>
    ),
  },
  {
    label: 'New',
    href: '#',
    primary: true,
    icon: (
      <Icon>
        <path d="M12 5v14M5 12h14" />
      </Icon>
    ),
  },
  {
    label: 'Saved',
    href: '#',
    icon: (
      <Icon>
        <path d="M6 3h12v18l-6-4-6 4z" />
      </Icon>
    ),
  },
  {
    label: 'You',
    href: '#',
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </Icon>
    ),
  },
]

function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <section class="flex flex-col gap-4">
      <h2 class="font-display text-2xl font-bold">{props.title}</h2>
      {props.children}
    </section>
  )
}

export function Page(props: { theme: 'dark' | 'light' }) {
  return (
    <>
      {raw('<!DOCTYPE html>')}
      <html lang="en" data-theme={props.theme}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Matinee gallery</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link rel="stylesheet" href={fonts} />
          <link rel="stylesheet" href="/gallery/styles.css" />
        </head>
        <body class="min-h-screen bg-page font-sans text-ink">
          <main class="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-12">
            <header class="flex items-start justify-between gap-4">
              <div>
                <h1 class="font-display text-4xl font-bold">Matinee</h1>
                <p class="mt-2 text-muted">Tokens and components, all in one place.</p>
              </div>
              <nav class="flex shrink-0 gap-1 rounded-control border border-line bg-sunken p-1 text-sm">
                <a
                  href="?theme=light"
                  class={`rounded-badge px-3 py-1.5 no-underline ${props.theme === 'light' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
                >
                  Light
                </a>
                <a
                  href="?theme=dark"
                  class={`rounded-badge px-3 py-1.5 no-underline ${props.theme === 'dark' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
                >
                  Dark
                </a>
              </nav>
            </header>

            <Section title="Colours">
              <div class="grid grid-cols-3 gap-4 sm:grid-cols-5">
                {colours.map((colour) => (
                  <div>
                    <div class={`h-16 rounded-tile border border-line ${colour.swatch}`} />
                    <div class="mt-2 text-sm">{colour.name}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Typography">
              <div class="flex flex-col divide-y divide-line rounded-card border border-line bg-card px-6">
                {typeStyles.map((style) => (
                  <div class="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <div class="type-hint">{style.name}</div>
                    <div class={style.cls}>{style.sample}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Button">
              <div class="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button disabled>Disabled</Button>
                <Button href="#">As a link</Button>
              </div>
              <div class="max-w-sm">
                <Button fullWidth>Full width</Button>
              </div>
            </Section>

            <Section title="Field">
              <div class="grid gap-6 sm:grid-cols-2">
                <Field id="username" label="Username" placeholder="swift-raven-5065" hint="Shown on your public profile." />
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  required
                  value="name@example.com"
                  hint="Used to sign in. Never shown on your profile."
                />
                <Field
                  id="site"
                  label="Website"
                  type="url"
                  value="example"
                  error="Enter a full address, starting with https://"
                />
                <Field id="username-locked" label="Username, locked" readonly value="swift-raven-5065" />
                <Field id="off" label="Disabled" disabled value="Not available" />
              </div>
              <Field
                id="bio"
                label="Bio"
                multiline
                rows={3}
                value="Night owl. I watch too many films and rate them harshly."
                hint="Shown on your profile. Up to 200 characters."
              />
            </Section>

            <Section title="Card">
              <div class="grid gap-6 sm:grid-cols-3">
                <Card title="Default">
                  <p class="type-body">The standard surface for a block of content.</p>
                </Card>
                <Card title="Floating" floating>
                  <p class="type-body">A shadow lifts it above the page. Use it for menus and popovers.</p>
                </Card>
                <Card title="Large padding" padding="lg">
                  <p class="type-body">More room for forms and settings sections.</p>
                </Card>
              </div>
              <Card padding="none" class="max-w-sm overflow-hidden">
                <div class="h-24 bg-raised" />
                <div class="p-4">
                  <p class="type-body">No padding, so an image or banner can reach the edges.</p>
                </div>
              </Card>
            </Section>

            <Section title="Poster">
              <div class="flex flex-wrap items-end gap-6">
                <Poster title="Small" src={artGold} size="sm" />
                <Poster title="Medium" src={artBlue} size="md" />
                <Poster title="Large" src={artRose} size="lg" />
                <Poster title="A film with no poster found" size="lg" />
              </div>
              <div class="grid max-w-md grid-cols-4 gap-3">
                <Poster title="One" src={artGold} size="fill" />
                <Poster title="Two" src={artBlue} size="fill" />
                <Poster title="Three" size="fill" />
                <Poster title="Four" src={artRose} size="fill" />
              </div>
            </Section>

            <Section title="Stars">
              <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Stars value={0} showValue />
                <Stars value={2.5} showValue />
                <Stars value={3.5} showValue />
                <Stars value={5} showValue />
              </div>
              <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Stars value={4} size="sm" />
                <Stars value={4} size="md" />
                <Stars value={4} size="lg" />
              </div>
              <div class="flex flex-col gap-1">
                <Stars value={3.5} label="Rated 7 out of 10" />
                <p class="type-hint">A 7 out of 10 rating, shown as 3.5 of 5 stars.</p>
              </div>
            </Section>

            <Section title="Badge">
              <div class="flex flex-wrap items-center gap-2">
                <Badge>Drama</Badge>
                <Badge>1999</Badge>
                <Badge tone="accent">Movie</Badge>
                <Badge tone="accent">TV</Badge>
                <Badge tone="danger">Removed</Badge>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <Badge href="#" selected>All</Badge>
                  <Badge href="#">Movies</Badge>
                  <Badge href="#">TV</Badge>
                  <Badge href="#">Watchlist</Badge>
                </div>
                <p class="type-hint">Badges that link can act as filters. The selected one is solid.</p>
              </div>
            </Section>

            <Section title="Notice">
              <div class="flex max-w-xl flex-col gap-3">
                <Notice>Your film list is private until you share it.</Notice>
                <Notice tone="accent" title="Saved">
                  Your changes are live.
                </Notice>
                <Notice tone="danger" title="Could not save">
                  Check the highlighted fields and try again.
                </Notice>
              </div>
            </Section>

            <Section title="TopBar">
              <div class="overflow-hidden rounded-card border border-line">
                <TopBar
                  brand={{ name: 'Matinee', href: '#' }}
                  links={barLinks}
                  action={{ label: 'New', href: '#' }}
                  user={barUser}
                />
              </div>
              <p class="type-hint">The account menu opens from the avatar. It is open below.</p>
              <div class="h-72 overflow-hidden rounded-card border border-line">
                <TopBar
                  brand={{ name: 'Matinee', href: '#' }}
                  links={barLinks}
                  action={{ label: 'New', href: '#' }}
                  user={{ ...barUser, open: true }}
                />
              </div>
            </Section>

            <Section title="BottomNav">
              <div class="max-w-sm rounded-card border border-line bg-page py-6">
                <BottomNav items={navItems} placement="inline" />
              </div>
              <p class="type-hint">
                On a phone it floats at the bottom of the screen. From wider screens up it is hidden, and the top bar takes over. Leave room at the bottom of the page so content is not hidden behind it.
              </p>
            </Section>

            <Section title="ActionBar">
              <div class="max-w-sm rounded-card border border-line bg-page py-6">
                <ActionBar placement="inline" cancelHref="#" />
              </div>
              <p class="type-hint">It takes the place of the bottom navigation on pages with a form.</p>
            </Section>
          </main>
        </body>
      </html>
    </>
  )
}
