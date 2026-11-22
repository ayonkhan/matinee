// Runs in the browser, in the head, so the theme is set before the page paints.
// The choice comes from the address (?theme=dark), then your saved choice, then your system setting.
export const themeScript = `
(function () {
  var root = document.documentElement
  var selectedClass = ''
  var plainClass = ''

  function pick() {
    var fromAddress = new URLSearchParams(location.search).get('theme')
    if (fromAddress === 'light' || fromAddress === 'dark') return fromAddress

    try {
      var saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch (error) {}

    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function themeOf(link) {
    return new URL(link.href).searchParams.get('theme')
  }

  // The switch is made of links. Swap their classes so the chosen one looks selected.
  function show(theme) {
    root.setAttribute('data-theme', theme)

    document.querySelectorAll('nav[aria-label="Theme"] a').forEach(function (link) {
      var on = themeOf(link) === theme

      link.className = on ? selectedClass : plainClass
      if (on) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    })
  }

  root.setAttribute('data-theme', pick())

  document.addEventListener('DOMContentLoaded', function () {
    var on = document.querySelector('nav[aria-label="Theme"] a[aria-current]')
    var off = document.querySelector('nav[aria-label="Theme"] a:not([aria-current])')

    if (on && off) {
      selectedClass = on.className
      plainClass = off.className
      show(root.getAttribute('data-theme'))
    }
  })

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('nav[aria-label="Theme"] a')
    if (!link || !selectedClass) return

    var theme = themeOf(link)
    event.preventDefault()

    try {
      localStorage.setItem('theme', theme)
    } catch (error) {}

    show(theme)
  })
})()
`
