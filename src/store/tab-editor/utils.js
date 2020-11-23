import Parse from 'parse'
import TabModel, { NAME_KEY, HEX_COLOR_KEY, SLUG_KEY, SPEED_KEY, LANGUAGE_KEY } from '~/models/Tab'
import {
  NAME_KEY as ITEM_NAME_KEY,
  ASSET_KEY as ITEM_ASSET_KEY,
  KEY_KEY as ITEM_KEY_KEY,
  AVAILABLE_KEY as ITEM_AVAILABLE_KEY,
  HIDDEN_KEY as ITEM_HIDDEN_KEY,
  ORDER_KEY as ITEM_ORDER_KEY
} from '~/models/TabItem'

/**
 * Set something in the tab from its key
 * @param {State} state
 * @param {String} key to change
 * @param {*} newValue to set
 */
export const changeByKey = (state, key, newValue) => {
  switch (key) {
    case NAME_KEY:
      state.tab.name = newValue
      break
    case HEX_COLOR_KEY:
      state.tab.hexColor = newValue
      break
    default:
      break
  }
}

/**
 * Find an item's index in the list of items
 * @param {State} state
 * @param {Item} pItem to find
 */
export const itemIndex = (state, pItem) => state.items.findIndex((item) => item.name === pItem.name)

/**
 * Transform a model into an object
 * @param {TabModel} tabModel the model to transform
 */
export const modelToTab = (tabModel) => ({
  slug: tabModel.get(SLUG_KEY),
  name: tabModel.get(NAME_KEY),
  hexColor: tabModel.get(HEX_COLOR_KEY),
  speed: tabModel.get(SPEED_KEY),
  language: tabModel.get(LANGUAGE_KEY),
  user: localStorage.id
})

/**
 * Retrive a tab's model from its object
 * @param {Tab} tab the obect to retrive
 */
export const tabToModel = (tab) => {
  return new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, tab.slug)
    .equalTo('user', localStorage.id)
    .first()
}

/**
 * Transform an tab's item model into a tab's item object
 * @param {ItemModel} itemModel
 */
export const itemModelToItem = (itemModel) => {
  var asset = itemModel.get(ITEM_ASSET_KEY)
  const parseFile = asset.file
  // update asset url if asset is a Parse file
  if (parseFile) {
    asset.url = `${Parse.serverURL}/files/${Parse.applicationId}/${parseFile._name}`
  }
  return {
    name: itemModel.get(ITEM_NAME_KEY),
    asset: asset,
    key: itemModel.get(ITEM_KEY_KEY),
    available: itemModel.get(ITEM_AVAILABLE_KEY),
    hidden: itemModel.get(ITEM_HIDDEN_KEY),
    order: itemModel.get(ITEM_ORDER_KEY)
  }
}
