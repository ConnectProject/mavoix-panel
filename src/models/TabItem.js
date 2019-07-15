import Parse from 'parse'

export const PARENT_KEY = 'parent'
export const NAME_KEY = 'name'
export const IMAGE_KEY = 'image'
export const UNAVAILABLE_KEY = 'unavalable'
export const HIDDEN_KEY = 'hidden'

export default class TabItemModel extends Parse.Object {
  constructor () {
    super('TabItem')
  }

  static New (parent, name, image, unavalable, hidden) {
    const newTabItem = new TabItemModel()

    newTabItem
      .set(PARENT_KEY, parent)
      .set(NAME_KEY, name)
      .set(IMAGE_KEY, image)
      .set(UNAVAILABLE_KEY, unavalable)
      .set(HIDDEN_KEY, hidden)
    return newTabItem
  }

  static Create (parent, name, image) {
    return TabItemModel.New(parent, name, image, false, false)
  }
}
