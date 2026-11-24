export type StarsSize = 'sm' | 'md' | 'lg'

export type StarsProps = {
  value: number
  max?: number
  size?: StarsSize
  showValue?: boolean
  label?: string
  class?: string
}

const sizes: Record<StarsSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

// The same sizes in pixels, so a star keeps its size even where the styles do not load.
const pixels: Record<StarsSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

export const starPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function Star(props: { size: string; pixels: number }) {
  return (
    <svg viewBox="0 0 24 24" width={props.pixels} height={props.pixels} aria-hidden="true" class={`${props.size} shrink-0 fill-current`}>
      <path d={starPath} />
    </svg>
  )
}

// Stars go up in halves, so 3.7 shows as 3.5 and 3.8 shows as 4.
export function roundToHalf(value: number, max: number) {
  const clamped = Math.min(Math.max(value, 0), max)
  return Math.round(clamped * 2) / 2
}

export function Stars(props: StarsProps) {
  const { max = 5, size = 'md', showValue } = props
  const value = roundToHalf(props.value, max)
  const label = props.label ?? `Rated ${value} out of ${max}`

  const stars = Array.from({ length: max }, (_, i) => Math.min(Math.max(value - i, 0), 1) * 100)

  return (
    <span role="img" aria-label={label} class={['inline-flex items-center gap-2', props.class ?? ''].filter(Boolean).join(' ')}>
      <span class="inline-flex gap-0.5">
        {stars.map((percent) => (
          <span class="relative inline-block" data-fill={percent}>
            <span class="text-line-strong">
              <Star size={sizes[size]} pixels={pixels[size]} />
            </span>
            <span class="absolute inset-y-0 left-0 overflow-hidden text-accent" style={`width:${percent}%`}>
              <Star size={sizes[size]} pixels={pixels[size]} />
            </span>
          </span>
        ))}
      </span>
      {showValue ? <span class="text-sm font-medium text-ink">{value}</span> : null}
    </span>
  )
}
