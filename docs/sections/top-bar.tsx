import { TopBar } from '../../src'
import { CodeBlock } from '../code-block'

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

export function TopBarSection() {
  return (
    <>
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
      <p class="type-hint">
        Signed out, the button shows on every screen, and a quieter link such as Sign in sits beside it. The brand name
        can be markup, like a coloured dot.
      </p>
      <div class="overflow-hidden rounded-card border border-line">
        <TopBar
          brand={{ name: 'Matinee', href: '#' }}
          secondary={{ label: 'Sign in', href: '#' }}
          action={{ label: 'Sign up', href: '#' }}
        />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<TopBar
  brand={{ name: 'Matinee', href: '/' }}
  links={[{ label: 'Home', href: '/', current: true }]}
  action={{ label: 'New', href: '/new' }}
  user={{ name: 'swift-raven-5065', menu: [{ label: 'Settings', href: '/settings' }] }}
/>`}
      />
      <CodeBlock
        title="Signed out"
        code={`<TopBar
  brand={{ name: <>mfdb<span class="text-accent">.</span></>, href: '/' }}
  secondary={{ label: 'Sign in', href: '/sign-in' }}
  action={{ label: 'Sign up', href: '/sign-up' }}
/>`}
      />
      <CodeBlock
        title="For a wider page"
        code={`<TopBar brand={{ name: 'Matinee', href: '/' }} width="wide" />`}
      />
    </>
  )
}
