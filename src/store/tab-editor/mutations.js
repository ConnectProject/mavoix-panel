import { changeByKey } from './utils'
import {
  NAME_KEY,
  HEX_COLOR_KEY
} from '~/models/Tab'

export const setTab = (state, tabModel) => {
  state.tabModel = tabModel
  state.tab = {
    name: tabModel.get(NAME_KEY),
    hexColor: tabModel.get(HEX_COLOR_KEY),
    items: []
  }
  state.loading = false
}

export const addItem = (state, item) => {
  console.log(item)
  state.tab.items.push(item)
}

export const setName = (state, name) => {
  pushHistory(state, { key: NAME_KEY, from: state.tab.name, to: name })
  state.tab.name = name
}

export const setHexColor = (state, hexColor) => {
  pushHistory(state, { key: HEX_COLOR_KEY, from: state.tab.hexColor, to: hexColor })
  state.tab.hexColor = hexColor
}

export const openNewItemDialog = (state) => {
  state.newItemDialogOpened = true
}

export const setNewItemAsset = (state, assetModel) => {
  state.newItemData.assetModel = assetModel
}

export const setNewItemName = (state, name) => {
  state.newItemData.name = name
}

export const closeNewItemDialog = (state) => {
  state.newItemDialogOpened = false
  state.newItemData = {}
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
  Object.assign(state, {})
}

export const setError = (state, err) => {
  state.error = err
  console.error(err)
  state.loading = false
}
