export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarProps = {
  name: string
  src?: string
  size?: AvatarSize
  // Use when the name is already written next to the avatar, so a screen reader does not say it twice.
  decorative?: boolean
  class?: string
}

const sizes: Record<AvatarSize, { box: string; text: string; px: string }> = {
  sm: { box: 'size-8', text: 'text-xs', px: '32' },
  md: { box: 'size-10', text: 'text-sm', px: '40' },
  lg: { box: 'size-16', text: 'text-xl', px: '64' },
}

// "swift-raven-5065" becomes "SR", "Maple Fox" becomes "MF".
export function initials(name: string) {
  const letters = name
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return letters || '?'
}

// A round picture, or the person's initials on gold when they have no picture.
export function Avatar(props: AvatarProps) {
  const { name, src, size = 'md', decorative } = props
  const style = sizes[size]

  if (src) {
    return (
      <img
        src={src}
        alt={decorative ? '' : name}
        width={style.px}
        height={style.px}
        loading="lazy"
        decoding="async"
        class={[style.box, 'shrink-0 rounded-full border border-line object-cover', props.class ?? ''].filter(Boolean).join(' ')}
      />
    )
  }

  const classes = [
    style.box,
    style.text,
    'flex shrink-0 items-center justify-center rounded-full bg-accent font-sans font-semibold text-accent-ink',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if (decorative) {
    return (
      <span aria-hidden="true" class={classes}>
        {initials(name)}
      </span>
    )
  }

  return (
    <span role="img" aria-label={name} class={classes}>
      {initials(name)}
    </span>
  )
}
