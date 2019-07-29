import { changeByKey, itemIndex } from './utils'
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
  state.tab.items.push(item)
}

export const updateItem = (state, item) => {
  const i = itemIndex(state, item)

  state.tab.items[i].name = item.name
  state.tab.items[i].asset = item.asset
}

export const setName = (state, name) => {
  pushHistory(state, { key: NAME_KEY, from: state.tab.name, to: name })
  state.tab.name = name
}

export const setHexColor = (state, hexColor) => {
  pushHistory(state, { key: HEX_COLOR_KEY, from: state.tab.hexColor, to: hexColor })
  state.tab.hexColor = hexColor
}

export const toggleAssetVisibility = (state, asset) => {
  const i = itemIndex(state, asset)

  state.tab.items[i].visible = !asset.visible
}

export const toggleAssetAvailability = (state, asset) => {
  const i = itemIndex(state, asset)

  state.tab.items[i].available = !asset.available
}

export const openItemDialog = (state, { mode = 'new', data }) => {
  state.itemDialogOpened = true
  state.itemDialogMode = mode
  if (mode === 'edit') {
    state.itemDialogData = data
  }
}

export const setItemDialogAsset = (state, asset) => {
  state.itemDialogData.asset = asset
}

export const setItemDialogName = (state, name) => {
  state.itemDialogData.name = name
}

export const closeItemDialog = (state) => {
  state.itemDialogOpened = false
  state.itemDialogData = {}
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
