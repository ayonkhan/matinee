import type { PropsWithChildren } from 'hono/jsx'
import { BottomNav } from '../../src'
import { CodeBlock } from '../code-block'

function Icon(props: PropsWithChildren) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6">
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
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
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

export function BottomNavSection() {
  return (
    <>
      <div class="max-w-sm rounded-card border border-line bg-page py-6">
        <BottomNav items={navItems} placement="inline" />
      </div>
      <p class="type-hint">
        On a phone it floats at the bottom of the screen. From wider screens up it is hidden, and the top bar takes over. Leave room at the bottom of the page so content is not hidden behind it.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<BottomNav
  items={[
    { label: 'Home', href: '/', current: true },
    { label: 'Browse', href: '/browse' },
    { label: 'New', href: '/new', primary: true },
  ]}
/>`}
      />
    </>
  )
}
