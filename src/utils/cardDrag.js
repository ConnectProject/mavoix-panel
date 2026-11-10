import Vue from 'vue'

/*
 * Moving a card to another tab by dragging it onto a tab header.
 *
 * Phase 1 ("sorting"): vuedraggable (force-fallback, so plain pointer events) reorders the grid as usual.
 * Phase 2 ("carrying"): once the pointer rests on another tab header, Sortable's drag is ended, the app
 * navigates to that tab and a floating copy of the card follows the pointer until it is released.
 * The release is the drop: over a tab header or over the page, the card is moved to that tab.
 */

const HOVER_DELAY_MS = 500
const TAB_SELECTOR = '[data-tab-slug]'
const PAGE_SELECTOR = '.q-page-container'

// Shared with the layout, which draws the floating card and highlights the hovered tab
export const cardDrag = Vue.observable({
  active: false,
  carrying: false,
  hoverSlug: null
})

let session = null
let hoverTimer = null
let aborting = false
let ghostEl = null

// Copy of the whole card (picture, name...) that follows the pointer once the card is carried
const makeGhost = (element) => {
  const rect = element.getBoundingClientRect()
  const copy = element.cloneNode(true)
  copy.classList.remove('ghost', 'sortable-ghost', 'sortable-chosen', 'sortable-drag', 'sortable-fallback')
  Object.assign(copy.style, {
    position: 'fixed',
    margin: '0',
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '.92',
    transform: 'translate(-50%, -50%) rotate(3deg)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, .35)'
  })

  return copy
}

const moveGhost = (x, y) => {
  if (!ghostEl) return
  ghostEl.style.left = `${x}px`
  ghostEl.style.top = `${y}px`
}

const removeGhost = () => {
  if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl)
  ghostEl = null
}

const MOVE_EVENTS = ['pointermove', 'mousemove', 'touchmove']
const UP_EVENTS = ['pointerup', 'mouseup', 'touchend', 'touchcancel']

const pointOf = (evt) => {
  const source = (evt.touches && evt.touches[0]) || (evt.changedTouches && evt.changedTouches[0]) || evt

  return { x: source.clientX, y: source.clientY }
}

const tabSlugAt = (x, y) => {
  const el = document.elementFromPoint(x, y)
  const tabEl = el && el.closest(TAB_SELECTOR)

  return tabEl ? tabEl.getAttribute('data-tab-slug') : null
}

const overPage = (x, y) => {
  const el = document.elementFromPoint(x, y)

  return Boolean(el && el.closest(PAGE_SELECTOR))
}

const clearTimer = () => {
  clearTimeout(hoverTimer)
  hoverTimer = null
}

// Ends Sortable's own drag by sending it the "release" events it listens to
const endSortableDrag = () => {
  aborting = true
  if (window.PointerEvent) document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  document.dispatchEvent(new Event('touchend', { bubbles: true }))
  aborting = false
}

const switchToTab = (slug) => {
  if (!session.carrying) {
    endSortableDrag()
    session.carrying = true
    cardDrag.carrying = true
    document.body.appendChild(ghostEl)
    moveGhost(session.x, session.y)
  }
  session.viewSlug = slug
  session.onSwitch(slug)
}

const scheduleSwitch = (slug) => {
  clearTimer()
  if (slug && slug !== session.viewSlug) {
    hoverTimer = setTimeout(() => session && switchToTab(slug), HOVER_DELAY_MS)
  }
}

const onMove = (evt) => {
  if (!session || aborting) return
  const { x, y } = pointOf(evt)
  session.x = x
  session.y = y
  moveGhost(x, y)
  const slug = tabSlugAt(x, y)
  if (slug !== cardDrag.hoverSlug) {
    cardDrag.hoverSlug = slug
    scheduleSwitch(slug)
  }
}

const stop = () => {
  clearTimer()
  MOVE_EVENTS.forEach((name) => document.removeEventListener(name, onMove, true))
  // eslint-disable-next-line no-use-before-define
  UP_EVENTS.forEach((name) => document.removeEventListener(name, onUp, true))
  session = null
  cardDrag.active = false
  cardDrag.carrying = false
  cardDrag.hoverSlug = null
  removeGhost()
}

const onUp = function (evt) {
  if (!session || aborting) return
  const { x, y } = pointOf(evt)
  const targetSlug = tabSlugAt(x, y) || (overPage(x, y) ? session.viewSlug : null)
  const { sourceSlug, onDrop } = session
  stop()
  if (targetSlug && targetSlug !== sourceSlug) onDrop(targetSlug)
}

/**
 * Start following a card that is being dragged.
 * @param {Object} opts - parameters
 * @param {string} opts.element the dragged card's element, copied and drawn under the pointer once carried
 * @param {string} opts.sourceSlug slug of the tab the card comes from
 * @param {Function} opts.onSwitch called with a slug when the app must show that tab
 * @param {Function} opts.onDrop called with the slug of the tab the card was dropped on
 * @returns {void}
 */
export const startCardDrag = ({ element, sourceSlug, onSwitch, onDrop }) => {
  if (session) stop()
  ghostEl = makeGhost(element)
  session = { x: 0, y: 0, sourceSlug, viewSlug: sourceSlug, carrying: false, onSwitch, onDrop }
  cardDrag.active = true
  MOVE_EVENTS.forEach((name) => document.addEventListener(name, onMove, true))
  UP_EVENTS.forEach((name) => document.addEventListener(name, onUp, true))
}

/**
 * Called when Sortable's own drag ended: nothing more to follow unless the card is being carried.
 * @returns {void}
 */
export const sortableDragEnded = () => {
  if (session && !session.carrying && !aborting) stop()
}
