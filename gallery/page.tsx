import { raw } from 'hono/html'
import type { PropsWithChildren } from 'hono/jsx'
import { Button } from '../src'

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
            <header class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 class="font-display text-4xl font-bold">Matinee</h1>
                <p class="mt-2 text-muted">Tokens and components, all in one place.</p>
              </div>
              <nav class="flex gap-1 rounded-control border border-line bg-sunken p-1 text-sm">
                <a
                  href="?theme=dark"
                  class={`rounded-chip px-3 py-1.5 no-underline ${props.theme === 'dark' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
                >
                  Dark
                </a>
                <a
                  href="?theme=light"
                  class={`rounded-chip px-3 py-1.5 no-underline ${props.theme === 'light' ? 'bg-raised font-semibold text-ink' : 'text-muted'}`}
                >
                  Light
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
          </main>
        </body>
      </html>
    </>
  )
}
