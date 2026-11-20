export type PosterSize = 'sm' | 'md' | 'lg' | 'fill'

export type PosterProps = {
  title: string
  src?: string
  size?: PosterSize
  class?: string
}

// Posters are always 2:3. "fill" takes the width of whatever holds it, which suits grids.
const sizes: Record<PosterSize, string> = {
  sm: 'w-12',
  md: 'w-24',
  lg: 'w-40',
  fill: 'w-full',
}

const frame = 'aspect-[2/3] shrink-0 overflow-hidden rounded-tile border border-line bg-raised'

export function Poster(props: PosterProps) {
  const { title, src, size = 'md' } = props

  const classes = [frame, sizes[size], props.class ?? ''].filter(Boolean).join(' ')

  // No poster found: show a quiet placeholder with the film's title instead of a broken image.
  if (!src) {
    return (
      <div role="img" aria-label={`No poster available for ${title}`} class={`${classes} flex items-center justify-center p-2`}>
        <span class="line-clamp-4 text-center text-xs font-medium text-muted">{title}</span>
      </div>
    )
  }

  return (
    <div class={classes}>
      <img
        src={src}
        alt={`Poster of ${title}`}
        width="200"
        height="300"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
    </div>
  )
}
