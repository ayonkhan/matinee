import { Hero } from '../../src'
import { CodeBlock } from '../code-block'

export function HeroSection() {
  return (
    <>
      <div class="overflow-hidden rounded-card border border-line">
        <Hero
          title="Everything in one place"
          action={{ label: 'Sign up', href: '#' }}
          secondaryAction={{ label: 'Sign in', href: '#' }}
          note="Free to try. No card needed."
          background={
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-accent)_0%,transparent_65%)] opacity-25"></div>
          }
        >
          Write your notes, plan your week and share your lists with friends.
        </Hero>
      </div>
      <p class="type-hint">
        For the top of a landing page. The title is the heading of the page. The background fills the hero behind the
        text, and a soft fade keeps the text easy to read. To let it reach both edges of a page that sits in a narrower
        column, pass a class such as "left-1/2 w-screen -translate-x-1/2". It has no space around it, so the
        page decides, for example with class="mt-8".
      </p>
      <CodeBlock
        title="Basic use"
        code={`<Hero
  title="Everything in one place"
  action={{ label: 'Sign up', href: '/sign-up' }}
  secondaryAction={{ label: 'Sign in', href: '/sign-in' }}
>
  Write your notes, plan your week and share your lists with friends.
</Hero>`}
      />
      <CodeBlock
        title="With a note and a background"
        code={`<Hero
  title="Everything in one place"
  action={{ label: 'Sign up', href: '/sign-up' }}
  note="Free to try. No card needed."
  background={<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-accent)_0%,transparent_65%)] opacity-25"></div>}
>
  Write your notes, plan your week and share your lists with friends.
</Hero>`}
      />
      <CodeBlock
        title="For a wider page"
        code={`<Hero title="Everything in one place" width="wide" />`}
      />
    </>
  )
}
