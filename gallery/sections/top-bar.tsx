import { TopBar } from '../../src'

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
    </>
  )
}
