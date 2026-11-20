import type { PropsWithChildren } from 'hono/jsx'

export type NoticeTone = 'neutral' | 'accent' | 'danger'

export type NoticeProps = PropsWithChildren<{
  title?: string
  tone?: NoticeTone
  class?: string
}>

const tones: Record<NoticeTone, { box: string; title: string }> = {
  neutral: { box: 'border-line bg-sunken', title: 'text-ink' },
  accent: { box: 'border-accent-text/40 bg-accent/15', title: 'text-accent-text' },
  danger: { box: 'border-danger-line bg-danger/10', title: 'text-danger-text' },
}

export function Notice(props: NoticeProps) {
  const { title, tone = 'neutral', children } = props
  const style = tones[tone]

  const classes = [
    'flex flex-col gap-1 rounded-tile border px-4 py-3 font-sans text-sm text-ink',
    style.box,
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  // Errors interrupt a screen reader, everything else waits for a pause.
  const role = tone === 'danger' ? 'alert' : 'status'

  return (
    <div role={role} class={classes}>
      {title ? <p class={`font-semibold ${style.title}`}>{title}</p> : null}
      <div>{children}</div>
    </div>
  )
}
