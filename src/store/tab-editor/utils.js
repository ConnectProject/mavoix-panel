import Parse from 'parse'
import TabModel, { NAME_KEY, HEX_COLOR_KEY, SLUG_KEY } from '~/models/Tab'
import {
  NAME_KEY as ITEM_NAME_KEY,
  ASSET_KEY as ITEM_ASSET_KEY,
  KEY_KEY as ITEM_KEY_KEY,
  AVAILABLE_KEY as ITEM_AVAILABLE_KEY,
  HIDDEN_KEY as ITEM_HIDDEN_KEY,
  ORDER_KEY as ITEM_ORDER_KEY
} from '~/models/TabItem'

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

export const itemIndex = (state, pItem) => state.items.findIndex((item) => item.name === pItem.name)

export const modelToTab = (tabModel) => ({
  slug: tabModel.get(SLUG_KEY),
  name: tabModel.get(NAME_KEY),
  hexColor: tabModel.get(HEX_COLOR_KEY)
})

export const tabToModel = (tab) => {
  return new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, tab.slug)
    .first()
}

export const itemModelToItem = (itemModel) => ({
  name: itemModel.get(ITEM_NAME_KEY),
  asset: itemModel.get(ITEM_ASSET_KEY),
  key: itemModel.get(ITEM_KEY_KEY),
  available: itemModel.get(ITEM_AVAILABLE_KEY),
  hidden: itemModel.get(ITEM_HIDDEN_KEY),
  order: itemModel.get(ITEM_ORDER_KEY)
})
