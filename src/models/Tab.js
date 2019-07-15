import Parse from 'parse'

import randomHex from '~/utils/randomHex'
import slugify from '~/utils/slugify'

export const NAME_KEY = 'name'
export const HEX_COLOR_KEY = 'hexColor'
export const SLUG_KEY = 'slug'

export default class TabModel extends Parse.Object {
  constructor () {
    super('Tab')
  }

  static New (name, hexColor) {
    const newTab = new TabModel()

    newTab
      .set(NAME_KEY, name)
      .set(HEX_COLOR_KEY, hexColor)
      .set(SLUG_KEY, slugify(name))
    return newTab
  }

  static Create (name) {
    return TabModel.New(name, randomHex())
  }

  getName () {
    this.get(NAME_KEY)
  }

  getHexColor () {
    this.get(HEX_COLOR_KEY)
  }

  getSlug () {
    this.get(SLUG_KEY)
  }
}
