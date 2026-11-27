import type { PropsWithChildren } from 'hono/jsx'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link'

export type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  fullWidth?: boolean
  class?: string
}>

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-control font-sans text-base no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// The solid and outlined buttons share a roomy box. A link-style button is just text, so it has none.
const box = 'px-5 py-3 font-semibold'

const variants: Record<ButtonVariant, string> = {
  primary: `${box} bg-accent text-accent-ink`,
  secondary: `${box} border border-line font-medium text-ink`,
  danger: `${box} bg-danger text-white`,
  link: 'px-1 font-medium text-accent-text',
}

// Hover feedback is only for buttons that can be clicked.
const hovers: Record<ButtonVariant, string> = {
  primary: 'hover:brightness-110',
  secondary: 'hover:bg-raised',
  danger: 'hover:brightness-110',
  link: 'hover:underline',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', href, type = 'button', disabled, fullWidth, children } = props

  const classes = [
    base,
    variants[variant],
    disabled ? 'cursor-not-allowed opacity-60' : `cursor-pointer ${hovers[variant]}`,
    fullWidth ? 'w-full' : '',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  // A link looks like a button, so something that goes to another page stays a real link.
  if (href && !disabled) {
    return (
      <a href={href} class={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} class={classes}>
      {children}
    </button>
  )
}
