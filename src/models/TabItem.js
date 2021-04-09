import Parse from 'parse'

import randomString from '~/utils/randomString'

export const NAME_KEY = 'name'
export const ASSET_KEY = 'asset'
export const TAB_KEY = 'tab'
export const KEY_KEY = 'key'
export const AVAILABLE_KEY = 'available'
export const HIDDEN_KEY = 'hidden'
export const ORDER_KEY = 'order'

/*
** Represents an item of any tab
*/
export default class TabItemModel extends Parse.Object {
  constructor () {
    super('TabItem')
  }

  static New (name, asset, tab, available, hidden, key, order) {
    const newTabItem = new TabItemModel()

    newTabItem
      .set(NAME_KEY, name) // Item's name
      .set(ASSET_KEY, asset) // Item's asset (AssetModel)
      .set(TAB_KEY, tab) // Item's tab (TabModel)
      .set(KEY_KEY, key) // Item's id
      .set(AVAILABLE_KEY, available) // Is item available
      .set(HIDDEN_KEY, hidden) // Should item be printed
      .set(ORDER_KEY, order) // Priority order of the item

    return newTabItem
  }

  static Create (name, asset, tab, hidden, available, order) {
    return TabItemModel.New(name, asset, tab, available, hidden, randomString(8), order)
  }
}
