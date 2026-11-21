// Full class names are written out so Tailwind can find them.
const colours = [
  { name: 'page', swatch: 'bg-page' },
  { name: 'card', swatch: 'bg-card' },
  { name: 'raised', swatch: 'bg-raised' },
  { name: 'sunken', swatch: 'bg-sunken' },
  { name: 'line', swatch: 'bg-line' },
  { name: 'line-strong', swatch: 'bg-line-strong' },
  { name: 'ink', swatch: 'bg-ink' },
  { name: 'ink-soft', swatch: 'bg-ink-soft' },
  { name: 'muted', swatch: 'bg-muted' },
  { name: 'accent', swatch: 'bg-accent' },
  { name: 'accent-text', swatch: 'bg-accent-text' },
  { name: 'danger', swatch: 'bg-danger' },
]

export function ColoursSection() {
  return (
    <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
      {colours.map((colour) => (
        <div>
          <div class={`h-16 rounded-tile border border-line ${colour.swatch}`} />
          <div class="mt-2 text-sm">{colour.name}</div>
        </div>
      ))}
    </div>
  )
}
