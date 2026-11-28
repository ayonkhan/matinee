import { dock, floatingBar, focusRing, type Placement } from './dock'

export type ActionBarProps = {
  label?: string
  formId?: string
  cancelHref?: string
  cancelLabel?: string
  disabled?: boolean
  placement?: Placement
  // A short line on the left of the bar, such as "Unsaved changes".
  message?: string
  // Also show the bar on screens wider than a phone. By default a fixed bar floats on phones only.
  desktop?: boolean
  // Keep the bar out of sight until something in the form named by formId differs from how it started.
  // It needs actionBarScript on the page. Without JavaScript the bar simply stays visible, so the form can still be saved.
  revealOnChange?: boolean
  class?: string
}

// Hides the bars that ask for it, and shows each one while its form differs from how it started.
// Put the text back as it was and the bar goes away again.
// A bar is hidden by the script, not by the markup, so a visitor without JavaScript can still save.
// Add it to the page once, in a script tag, however many bars there are.
export const actionBarScript = `
document.querySelectorAll('[data-reveal-form]').forEach(function (bar) {
  var form = document.getElementById(bar.getAttribute('data-reveal-form'));
  if (!form) return;

  function snapshot() {
    return new URLSearchParams(new FormData(form)).toString();
  }

  var start = snapshot();
  bar.hidden = true;

  function update() {
    bar.hidden = snapshot() === start;
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('reset', function () {
    setTimeout(update, 0);
  });
});
`

// Takes the place of the BottomNav on pages with a form.
export function ActionBar(props: ActionBarProps) {
  const {
    label = 'Save',
    formId,
    cancelHref,
    cancelLabel = 'Cancel',
    disabled,
    placement = 'fixed',
    message,
    desktop,
    revealOnChange,
  } = props

  // Revealing needs a form to watch.
  const revealFor = revealOnChange && formId ? formId : undefined

  // The [hidden] rule has to beat the bar's own display class, or the bar would never disappear.
  const extra = [props.class ?? '', revealFor ? '[&[hidden]]:hidden' : ''].filter(Boolean).join(' ')

  return (
    <div class={dock(placement, extra, desktop)} data-reveal-form={revealFor}>
      <div class={`${floatingBar} ${message ? 'w-full max-w-xl justify-between gap-4 py-2 pl-6 pr-2' : 'gap-2 p-2'}`}>
        {message ? <span class="type-label text-ink">{message}</span> : null}

        <div class="flex items-center gap-2">
          {cancelHref ? (
            <a
              href={cancelHref}
              class={`flex min-h-11 items-center rounded-full px-5 font-sans text-base font-medium text-ink no-underline hover:bg-raised ${focusRing}`}
            >
              {cancelLabel}
            </a>
          ) : null}
          <button
            type="submit"
            form={formId}
            disabled={disabled}
            class={`min-h-11 rounded-full bg-accent px-8 font-sans text-base font-semibold text-accent-ink ${focusRing} ${
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:brightness-110'
            }`}
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  )
}
