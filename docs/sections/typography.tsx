// Full class names are written out so Tailwind can find them.
const typeStyles = [
  { name: 'type-display', cls: 'type-display', sample: 'Your films, rated' },
  { name: 'type-heading', cls: 'type-heading', sample: 'Recently added' },
  { name: 'type-body', cls: 'type-body', sample: 'Quiet and devastating. The last shot stays with you.' },
  { name: 'type-label', cls: 'type-label', sample: 'Rating' },
  { name: 'type-hint', cls: 'type-hint', sample: 'Up to 200 characters.' },
  { name: 'type-overline', cls: 'type-overline', sample: 'Live preview' },
  { name: 'type-code', cls: 'type-code', sample: '<Button variant="primary">Save</Button>' },
]

export function TypographySection() {
  return (
    <div class="flex flex-col divide-y divide-line rounded-card border border-line bg-card px-6">
      {typeStyles.map((style) => (
        <div class="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
          <div class="type-hint">{style.name}</div>
          <div class={style.cls}>{style.sample}</div>
        </div>
      ))}
    </div>
  )
}
