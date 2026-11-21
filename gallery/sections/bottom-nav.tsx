import type { PropsWithChildren } from 'hono/jsx'
import { BottomNav } from '../../src'

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

export function BottomNavSection() {
  return (
    <>
      <div class="max-w-sm rounded-card border border-line bg-page py-6">
        <BottomNav items={navItems} placement="inline" />
      </div>
      <p class="type-hint">
        On a phone it floats at the bottom of the screen. From wider screens up it is hidden, and the top bar takes over. Leave room at the bottom of the page so content is not hidden behind it.
      </p>
    </>
  )
}
