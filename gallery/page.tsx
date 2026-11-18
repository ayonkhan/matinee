import { raw } from 'hono/html'
import type { PropsWithChildren } from 'hono/jsx'

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

export function Page() {
  return (
    <>
      {raw('<!DOCTYPE html>')}
      <html lang="en">
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
            <header>
              <h1 class="font-display text-4xl font-bold">Matinee</h1>
              <p class="mt-2 text-muted">Tokens and components, all in one place.</p>
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
          </main>
        </body>
      </html>
    </>
  )
}
