import { NAME_KEY, HEX_COLOR_KEY } from 'mavoix-core/models/Tab'

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

export const itemIndex = (state, pItem) => state.tab.items.findIndex((item) => item.id === pItem.id)
