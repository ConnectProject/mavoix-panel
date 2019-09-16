import Parse from 'parse'

import randomHex from 'mavoix-core/utils/randomHex'
import slugify from 'mavoix-core/utils/slugify'

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
}
