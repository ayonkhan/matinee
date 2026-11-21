import type { PropsWithChildren } from 'hono/jsx'
import { SegmentedControl } from '../../src'

function Icon(props: PropsWithChildren) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
      {props.children}
    </svg>
  )
}

const listIcon = (
  <Icon>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </Icon>
)

const gridIcon = (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Icon>
)

export function SegmentedControlSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-6">
        <SegmentedControl
          label="Theme"
          options={[
            { label: 'Light', href: '#', selected: true },
            { label: 'Dark', href: '#' },
          ]}
        />
        <SegmentedControl
          label="View"
          options={[
            { label: 'List', href: '#', icon: listIcon, selected: true },
            { label: 'Grid', href: '#', icon: gridIcon },
          ]}
        />
      </div>
      <SegmentedControl
        label="Type"
        options={[
          { label: 'All', href: '#' },
          { label: 'Movies', href: '#', selected: true },
          { label: 'TV', href: '#' },
        ]}
      />
      <div class="flex max-w-sm flex-col gap-1">
        <SegmentedControl
          label="Show"
          fullWidth
          options={[
            { label: 'Seen', href: '#', selected: true },
            { label: 'Watchlist', href: '#' },
          ]}
        />
        <p class="type-hint">Each option is a link, so it works without JavaScript.</p>
      </div>
    </>
  )
}
