import Parse from 'parse'

import randomHex from '~/utils/randomHex'
import slugify from '~/utils/slugify'

export const NAME_KEY = 'name'
export const HEX_COLOR_KEY = 'hexColor'
export const SLUG_KEY = 'slug'
export const SPEED_KEY = 'speed'
export const LANGUAGE_KEY = 'language'
export const USER_KEY = 'user'

/*
** Represents a tab.
*/
export default class TabModel extends Parse.Object {
  constructor () {
    super('Tab')
  }

  static New (name, hexColor, speed, language, user) {
    const newTab = new TabModel()

    newTab
      .set(NAME_KEY, name) // Tab's name
      .set(SPEED_KEY, speed) // Tab's info
      .set(LANGUAGE_KEY, language) // Tab's info
      .set(USER_KEY, user) // Tab's user id
      .set(HEX_COLOR_KEY, hexColor) // Tab's color
      .set(SLUG_KEY, slugify(name)) // Tab's slug (http://exemple.com/tabs/{slug})
    return newTab
  }

  static Create (name, user) {
    return TabModel.New(name, randomHex(), 1.0, 'fr_FR', user)
  }
}
