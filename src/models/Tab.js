import Parse from 'parse'

import slugify from '~/utils/slugify'

export const NAME_KEY = 'name'
export const HEX_COLOR_KEY = 'hexColor'
export const SLUG_KEY = 'slug'
export const SPEED_KEY = 'speed'
export const LANGUAGE_KEY = 'language'
export const USER_KEY = 'user'
export const ICON_KEY = 'icon'
export const IMAGE_SIZE_KEY = 'imageSize'

/*
** Represents a tab.
*/
export default class TabModel extends Parse.Object {
  constructor () {
    super('Tab')
  }

  static New (name, hexColor, speed, language, user, icon = null, imageSize = 'medium') {
    const newTab = new TabModel()

    newTab
      .set(NAME_KEY, name) // Tab's name
      .set(SPEED_KEY, speed) // Tab's info
      .set(LANGUAGE_KEY, language) // Tab's info
      .set(USER_KEY, user) // Tab's user id
      .set(HEX_COLOR_KEY, hexColor) // Tab's color
      .set(SLUG_KEY, slugify(name)) // Tab's slug (http://exemple.com/tabs/{slug})
      .set(ICON_KEY, icon) // Tab's icon
      .set(IMAGE_SIZE_KEY, imageSize) // small | medium | large (kid app + panel grid)

    return newTab
  }

  /**
   * @param {string} name tab title
   * @param {string} user Parse user id owning the tab
   * @param {string} hexColor background color
   * @param {string|null} icon material icon id
   * @param {Object} [opts] optional speed, language, imageSize from global settings
   * @returns {TabModel} unsaved instance
   */
  static Create (name, user, hexColor, icon = null, opts = {}) {
    const speed = typeof opts.speed === 'number' ? opts.speed : 1.0
    const language = (opts.language || 'fr_FR').replace(/-/g, '_')
    const imageSize = opts.imageSize === 'small' || opts.imageSize === 'large' ? opts.imageSize : 'medium'

    return TabModel.New(name, hexColor, speed, language, user, icon, imageSize)
  }

  static Update (tab, name, hexColor, icon = null) {
    tab.set(NAME_KEY, name)
    tab.set(SLUG_KEY, slugify(name))
    tab.set(HEX_COLOR_KEY, hexColor)
    tab.set(ICON_KEY, icon)

    return tab.save()
  }
}
