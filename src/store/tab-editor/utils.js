import { NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'

export function changeByKey (state, key, newValue) {
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
