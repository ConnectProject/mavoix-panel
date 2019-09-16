import { changeByKey, itemIndex } from './utils'
import randomString from 'mavoix-core/utils//randomString'
import {
  NAME_KEY,
  HEX_COLOR_KEY
} from '~/models/Tab'

/**
 * Set the tab used by the Tab Editor
 * @param {State} state namespaced state.
 * @param {TabModel} tabModel the parse model of the tab.
 */
export const setTab = (state, tabModel) => {
  state.tabModel = tabModel
  state.tab = {
    name: tabModel.get(NAME_KEY),
    hexColor: tabModel.get(HEX_COLOR_KEY),
    items: []
  }
  state.loading = false
}

/**
 * Set the name of the tab
 * @param {State} state namespaced state.
 * @param {String} name new value.
 */
export const setName = (state, name) => {
  pushHistory(state, { key: NAME_KEY, from: state.tab.name, to: name })
  state.tab.name = name
}

/**
 * Set the color of the tab
 * @param {State} state namespaced state.
 * @param {String} hexColor new value.
 */
export const setHexColor = (state, hexColor) => {
  pushHistory(state, { key: HEX_COLOR_KEY, from: state.tab.hexColor, to: hexColor })
  state.tab.hexColor = hexColor
}

/**
 * Add an item to the tab
 * @param {State} state namespaced state
 * @param {Item} item the item to add
 */
export const addItem = (state, item) => {
  state.tab.items.push(item)
}

export const createItem = (state, { name, asset }) => {
  state.tab.items.push({
    name,
    asset,
    visible: true,
    available: true,
    id: randomString(10)
  })
}

export const updateItem = (state, { id, data: { name, asset, visible, available } }) => {
  const i = itemIndex(state, { id })

  if (name) {
    state.tab.items[i].name = name
  }
  if (asset) {
    state.tab.items[i].asset = asset
  }
  if (visible != null) {
    state.tab.items[i].visible = visible
  }
  if (available != null) {
    state.tab.items[i].available = available
  }
}

export const removeItem = (state, id) => {
  const i = itemIndex(state, { id })

  state.tab.items.splice(i, 1)
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
