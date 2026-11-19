import { raw } from 'hono/html'
import type { PropsWithChildren } from 'hono/jsx'
import { Button, Card, Field } from '../src'

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
                  class={`rounded-chip px-3 py-1.5 no-underline ${props.theme === 'light' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
                >
                  Light
                </a>
                <a
                  href="?theme=dark"
                  class={`rounded-chip px-3 py-1.5 no-underline ${props.theme === 'dark' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
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
          </main>
        </body>
      </html>
    </>
  )
}
