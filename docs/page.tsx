import { raw } from 'hono/html'
import { bannerScript, Disclosure, SegmentedControl } from '../src'
import { copyScript } from './code-block'
import { Section } from './section'
import { groups, type SectionEntry } from './sections'
import { sidebarScript } from './sidebar-script'
import { themeScript } from './theme-script'

const fonts =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Inter:wght@400;500;600&display=swap'

function Brand() {
  return (
    <div>
      <p class="font-display text-3xl font-bold">Matinee</p>
      <p class="mt-1 text-sm text-muted">
        A mobile-first design system with Tailwind v4 tokens and JSX components. Built with Hono.
      </p>
    </div>
  )
}

function ThemeSwitch() {
  return (
    <SegmentedControl
      label="Theme"
      class="w-fit shrink-0"
      options={[
        { label: 'Light', href: '?theme=light', selected: true },
        { label: 'Dark', href: '?theme=dark' },
      ]}
    />
  )
}

const linkClasses =
  'rounded-control px-3 py-1.5 text-sm text-muted no-underline hover:bg-raised hover:text-ink aria-[current=location]:bg-raised aria-[current=location]:font-medium aria-[current=location]:text-ink'

function SectionLink(props: { section: SectionEntry; class?: string }) {
  return (
    <a href={`#${props.section.id}`} class={`${linkClasses} ${props.class ?? ''}`}>
      {props.section.title}
    </a>
  )
}

// The sections of a group, in the order they first appear, split by category.
function categoriesOf(sections: SectionEntry[]) {
  const categories = new Map<string, SectionEntry[]>()

  for (const section of sections) {
    const name = section.category ?? ''

    categories.set(name, [...(categories.get(name) ?? []), section])
  }

  return [...categories]
}

function SectionLinks() {
  return (
    <nav aria-label="Sections" class="flex flex-col gap-6">
      {groups.map((group) => (
        <div class="flex flex-col gap-1">
          <p class="px-3 pb-1 font-sans text-xs font-bold tracking-[0.08em] text-ink uppercase">{group.title}</p>
          {categoriesOf(group.sections).map(([category, sections]) =>
            category ? (
              <Disclosure title={category} meta={sections.length} class="[&>summary]:font-medium [&>summary]:text-ink-soft">
                <div class="-mx-3 flex flex-col gap-1">
                  {sections.map((section) => (
                    <SectionLink section={section} class="pl-6" />
                  ))}
                </div>
              </Disclosure>
            ) : (
              sections.map((section) => <SectionLink section={section} />)
            ),
          )}
        </div>
      ))}
    </nav>
  )
}

function SiteFooter(props: { class?: string }) {
  const link = 'underline hover:text-ink'

  return (
    <footer class={`flex flex-col gap-2 text-xs text-muted ${props.class ?? ''}`}>
      <p>
        © 2026 Ayon Khan.{' '}
        <a href="https://github.com/ayonkhan/matinee/blob/main/LICENSE" class={link}>
          MIT License
        </a>
        .
      </p>
      <p>
        <a href="https://github.com/ayonkhan/matinee" class={link}>
          View on GitHub
        </a>
      </p>
      <p>Fonts: Bricolage Grotesque and Inter, SIL Open Font License.</p>
    </footer>
  )
}

export function Page() {
  return (
    <>
      {raw('<!DOCTYPE html>')}
      <html lang="en" data-theme="light">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Matinee docs</title>
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link rel="stylesheet" href={fonts} />
          <link rel="stylesheet" href="/docs/styles.css" />
          <script>{raw(themeScript)}</script>
        </head>
        <body class="min-h-screen bg-page font-sans text-ink">
          <div class="mx-auto flex min-h-screen max-w-7xl">
            <aside class="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-8 overflow-y-auto border-r border-line p-6 lg:flex">
              <Brand />
              <ThemeSwitch />
              <SectionLinks />
              <SiteFooter class="mt-auto border-t border-line pt-4" />
            </aside>

            <div class="min-w-0 flex-1">
              <header class="sticky top-0 z-30 flex flex-col gap-3 border-b border-line bg-page px-4 py-3 lg:hidden">
                <div class="flex items-center justify-between gap-4">
                  <p class="font-display text-xl font-bold">Matinee</p>
                  <ThemeSwitch />
                </div>
                <details class="group">
                  <summary class="flex cursor-pointer list-none items-center justify-between rounded-control border border-line bg-card px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    Sections
                    <span aria-hidden="true">▾</span>
                  </summary>
                  <div class="mt-3 max-h-[60vh] overflow-y-auto">
                    <SectionLinks />
                  </div>
                </details>
              </header>

              <main class="mx-auto max-w-3xl px-4 py-10 lg:px-10 lg:py-12">
                <article class="flex flex-col gap-12">
                  <h1 class="sr-only">Matinee docs</h1>
                  {groups.flatMap((group) =>
                    group.sections.map((section) => (
                      <Section id={section.id} title={section.title}>
                        <section.Component />
                      </Section>
                    )),
                  )}
                </article>
              </main>

              <SiteFooter class="border-t border-line px-4 py-6 lg:hidden" />
            </div>
          </div>
          <script>{raw(copyScript)}</script>
          <script>{raw(bannerScript)}</script>
          <script>{raw(sidebarScript)}</script>
        </body>
      </html>
    </>
  )
}
