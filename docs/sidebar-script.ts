// Runs in the browser. It marks the section you are reading in the sidebar and opens its folding group.
// Groups it opened close again when you move on. Groups you opened yourself stay open.
export const sidebarScript = `
(function () {
  var links = document.querySelectorAll('nav[aria-label="Sections"] a[href^="#"]')
  var groups = document.querySelectorAll('nav[aria-label="Sections"] details')
  var sections = document.querySelectorAll('main section[id]')
  var byId = {}
  var mine = []
  var currentId = ''
  var timer = 0

  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1)
    byId[id] = byId[id] || []
    byId[id].push(link)
  })

  // A click on a title is you opening or closing a group yourself.
  groups.forEach(function (group) {
    group.querySelector('summary').addEventListener('click', function () {
      var index = mine.indexOf(group)

      if (!group.open && index < 0) mine.push(group)
      if (group.open && index >= 0) mine.splice(index, 1)
    })
  })

  function show(id) {
    var wanted = []

    links.forEach(function (link) { link.removeAttribute('aria-current') })

    ;(byId[id] || []).forEach(function (link) {
      link.setAttribute('aria-current', 'location')

      var group = link.closest('details')
      if (group && link.closest('nav').contains(group)) wanted.push(group)
    })

    groups.forEach(function (group) {
      if (wanted.indexOf(group) >= 0) group.open = true
      else if (mine.indexOf(group) < 0) group.open = false
    })
  }

  function update() {
    var line = window.innerHeight * 0.15
    var id = ''

    sections.forEach(function (section) {
      var box = section.getBoundingClientRect()
      if (box.top <= line && box.bottom > line) id = section.id
    })

    if (id && id !== currentId) {
      currentId = id
      show(id)
    }
  }

  // Wait until scrolling stops, so a smooth scroll does not open every group it passes.
  window.addEventListener('scroll', function () {
    clearTimeout(timer)
    timer = setTimeout(update, 120)
  }, { passive: true })

  function follow() {
    currentId = location.hash.slice(1)
    show(currentId)
  }

  window.addEventListener('hashchange', follow)
  window.addEventListener('load', function () {
    if (location.hash) follow()
    else update()
  })
})()
`
