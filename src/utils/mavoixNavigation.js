export const LAST_TAB_SLUG_KEY = 'mavoix.lastTabSlug'
export const HIDE_WELCOME_KEY = 'mavoix.hideWelcomeDialog'
export const LAST_TAB_COLOR_KEY = 'mavoix.lastTabColor'

/**
 * Remember the background colour of the tab being shown, to paint it before the next load is done.
 * index.template.html reads the same key to colour the page before the app starts.
 * @param {string} hexColor tab colour
 * @returns {void}
 */
export const setLastTabColor = function (hexColor) {
  if (hexColor) {
    window.localStorage.setItem(LAST_TAB_COLOR_KEY, hexColor)
  }
}

/**
 * @returns {string} colour of the last tab shown, empty when unknown
 */
export const getLastTabColor = function () {
  return window.localStorage.getItem(LAST_TAB_COLOR_KEY) || ''
}

/**
 * @param {string} slug tab slug
 * @returns {void}
 */
export const setLastTabSlug = function (slug) {
  if (slug) {
    window.localStorage.setItem(LAST_TAB_SLUG_KEY, slug)
  }
}

/**
 * @returns {string|null} last saved tab slug or null
 */
export const getLastTabSlug = function () {
  return window.localStorage.getItem(LAST_TAB_SLUG_KEY)
}

/**
 * @returns {boolean} true if user chose to hide welcome dialog
 */
export const shouldHideWelcome = function () {
  return window.localStorage.getItem(HIDE_WELCOME_KEY) === '1'
}

/**
 * @returns {void}
 */
export const setHideWelcome = function () {
  window.localStorage.setItem(HIDE_WELCOME_KEY, '1')
}

/**
 * @param {Array} tabs Parse Tab models
 * @returns {string|null} slug to open
 */
export const getLandingTabSlug = function (tabs) {
  if (!tabs || !tabs.length) {
    return null
  }
  const last = getLastTabSlug()
  const match = last && tabs.find((t) => t.get('slug') === last)

  return match ? match.get('slug') : tabs[0].get('slug')
}

/**
 * @param {*} router Vue Router instance
 * @param {*} store Vuex store
 * @returns {void}
 */
export const navigateAfterTabDeleted = function (router, store) {
  const tabs = store.getters['tabs/tabs']
  if (tabs.length > 0) {
    const slug = getLandingTabSlug(tabs)
    router.replace({ name: 'tab', params: { slug } })
  } else {
    router.replace({ name: 'home' })
  }
}
