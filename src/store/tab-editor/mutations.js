import { NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import { changeByKey, modelToTab, itemModelToItem, itemIndex } from './utils'
import { getDefaultState } from './state'

/**
 * Set the tab used by the Tab Editor
 * @param {State} state namespaced state.
 * @param {TabModel} tabModel the parse model of the tab.
 */
export const setTab = (state, tabModel) => {
  state.tab = modelToTab(tabModel)
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

export const setItems = (state, itemsModels) => {
  state.items = []

  itemsModels.forEach((itemModel) => {
    state.items.push(itemModelToItem(itemModel))
  })
}

/**
 * Add the itemDialog's item to the tab
 * @param {State} state namespaced state
 * @param {Item} item parse model to add
 */
export const addItem = (state) => {
  const { name, asset } = state.itemDialog.data

  state.items.push({
    name,
    asset,
    key: null,
    available: true,
    hidden: false
  })
}

/**
 * Update the item opened in the itemDialog
 * @param {State} state namespaced state
 */
export const updateItem = (state) => {
  const { index, data } = state.itemDialog
  const { name, asset } = data
  const { available, hidden, key } = state.items[index]

  const item = state.items[index]
  item.name = name
  item.asset = asset
  item.available = available
  item.key = key
  item.hidden = hidden
}

export const toggleItemAvailable = (_, item) => {
  item.available = !item.available
}

export const toggleItemHidden = (_, item) => {
  item.hidden = !item.hidden
}

export const openItemDialog = (state, { mode = 'new', index, data }) => {
  state.itemDialog.opened = true
  state.itemDialog.mode = mode
  if (mode === 'edit') {
    state.itemDialog.data = data
    state.itemDialog.index = index
  }
}

export const removeItemDialog = (state) => {
  const index = itemIndex(state, state.itemDialog.data)

  state.deletedItems.push(state.items[index])
  state.items.splice(index, 1)
}

export const setItemDialogAsset = (state, asset) => {
  state.itemDialog.data.asset = asset
}

export const setItemDialogName = (state, name) => {
  state.itemDialog.data.name = name
}

export const closeItemDialog = (state) => {
  state.itemDialog.opened = false
  state.itemDialog.data.name = ''
  state.itemDialog.data.asset = null
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
  Object.assign(state, getDefaultState())
}

export const setError = (state, err) => {
  state.error = err
  console.error(`Tab editor error: ${err}`)
  state.loading = false
}
