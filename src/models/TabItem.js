import Parse from 'parse'

import randomstring from 'randomstring'

export const NAME_KEY = 'name'
export const ASSET_KEY = 'asset'
export const TAB_KEY = 'tab'
export const KEY_KEY = 'key'
export const AVAILABLE_KEY = 'available'
export const HIDDEN_KEY = 'hidden'

export default class TabItemModel extends Parse.Object {
  constructor () {
    super('TabItem')
  }

  static New (name, asset, tab, available, hidden, key) {
    const newTabItem = new TabItemModel()

    newTabItem
      .set(NAME_KEY, name)
      .set(ASSET_KEY, asset)
      .set(TAB_KEY, tab)
      .set(KEY_KEY, key)
      .set(AVAILABLE_KEY, available)
      .set(HIDDEN_KEY, hidden)
    return newTabItem
  }

  static Create (name, asset, tab, hidden, available) {
    return TabItemModel.New(name, asset, tab, available, hidden, randomstring.generate(8))
  }
}
