export type SectionNavLink = {
  label: string
  href: string
}

export type SectionNavProps = {
  // The heading above the links, and the name a screen reader gives the list.
  title?: string
  // Links to parts of this page.
  links: SectionNavLink[]
  // Links to other pages, shown under a line. For example, the Terms page linking to the Privacy page.
  more?: SectionNavLink[]
  class?: string
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// Links are taller on a touch screen and a little tighter from the lg breakpoint up.
const linkClasses = `inline-flex min-h-11 items-center font-sans text-sm text-muted no-underline hover:text-ink lg:min-h-9 ${focus}`

// A list of links that jump to the parts of a long page. Give each part an id that matches its link.
// Size and placement are up to the page, for example class="lg:w-52 lg:shrink-0".
export function SectionNav(props: SectionNavProps) {
  const { title = 'On this page', links, more = [] } = props

  return (
    <nav aria-label={title} class={['flex flex-col', props.class ?? ''].filter(Boolean).join(' ')}>
      <p class="type-overline mb-1">{title}</p>

      {links.map((link) => (
        <a href={link.href} class={linkClasses}>
          {link.label}
        </a>
      ))}

      {more.length > 0 ? (
        <div class="mt-3 flex flex-col border-t border-line pt-3">
          {more.map((link) => (
            <a href={link.href} class={linkClasses}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </nav>
  )
}
