import { changeByKey } from './utils'
import {
  NAME_KEY as TAB_NAME_KEY,
  HEX_COLOR_KEY as TAB_HEX_COLOR_KEY
} from '~/models/Tab'

import {
  NAME_KEY as ITEM_NAME_KEY,
  IMAGE_KEY as ITEM_IMAGE_KEY,
  UNAVAILABLE_KEY as ITEM_UNAVAILABLE_KEY,
  HIDDEN_KEY as ITEM_HIDDEN_KEY
} from '~/models/TabItem'

export const setTab = (state, tabModel) => {
  state.models.tab = tabModel
  state.tab = {
    name: tabModel.get(TAB_NAME_KEY),
    hexColor: tabModel.get(TAB_HEX_COLOR_KEY),
    items: []
  }
  state.loading = false
}

export const setItems = (state, itemsModels) => {
  state.models.items = itemsModels
  state.tab.items = itemsModels.map((el) => ({
    name: el.get(ITEM_NAME_KEY),
    image: el.get(ITEM_IMAGE_KEY),
    unavailable: el.get(ITEM_UNAVAILABLE_KEY),
    hidden: el.get(ITEM_HIDDEN_KEY)
  }))
  state.itemsLoading = false
}

export const setName = (state, name) => {
  pushHistory(state, { key: TAB_NAME_KEY, from: state.tab.name, to: name })
  state.tab.name = name
}

export const setHexColor = (state, hexColor) => {
  pushHistory(state, { key: TAB_HEX_COLOR_KEY, from: state.tab.hexColor, to: hexColor })
  state.tab.hexColor = hexColor
}

export const openNewItemDialog = (state) => {
  state.newItemDialogOpened = true
}

export const closeNewItemDialog = (state) => {
  state.newItemDialogOpened = false
}

export const pushHistory = (state, { key, from, to }) => {
  state.history.data.splice(state.index, state.history.length - state.index, {
    key,
    from,
    to
  })
  state.history.index++
}

export const undo = (state) => {
  if (state.history.index === 0) return
  const history = state.history.data[state.history.index - 1]

  state.history.index--
  changeByKey(state, history.key, history.from)
}

export const redo = (state) => {
  if (state.history.index === state.history.data.length) return
  const history = state.history.data[state.history.index]

  state.history.index++
  changeByKey(state, history.key, history.to)
}

export const clearState = (state) => {
  Object.assign(state, import('./state'))
}

export const setError = (state, err) => {
  state.error = err
  state.loading = false
}
