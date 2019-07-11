import Parse from 'parse'

export const PARENT_KEY = 'parent'

export default class TabItemModel extends Parse.Object {
  constructor () {
    super('TabItem')
  }

  static New (parent) {
    const newTabItem = new TabItemModel()

    newTabItem.set(PARENT_KEY, parent)
    return newTabItem
  }

  static Create (parent) {
    return TabItemModel.New(parent)
  }
}
