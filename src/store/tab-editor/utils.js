import Parse from 'parse'
import TabModel, { NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import { NAME_KEY as ITEM_NAME_KEY, ASSET_KEY as ITEM_ASSET_KEY } from '~/models/TabItem'

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
  name: tabModel.get(NAME_KEY),
  hexColor: tabModel.get(HEX_COLOR_KEY)
})

export const tabToModel = (tab) => {
  return new Parse.Query(TabModel)
    .equalTo(NAME_KEY, tab.name)
    .first()
}

export const itemModelToItem = (itemModel) => ({
  name: itemModel.get(ITEM_NAME_KEY),
  asset: itemModel.get(ITEM_ASSET_KEY)
})
