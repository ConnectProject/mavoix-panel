import { modelToTab, itemModelToItem, itemIndex } from './utils'
import { getDefaultState } from './state'
import { ActionName, ActionHexColor, ActionNewItem, ActionUpdateItem } from './stackActions'

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
  undoStackPushDo(state, new ActionName(state.tab.name, name))
}

/**
 * Set the color of the tab
 * @param {State} state namespaced state.
 * @param {String} hexColor new value.
 */
export const setHexColor = (state, hexColor) => {
  undoStackPushDo(state, new ActionHexColor(state.tab.hexColor, hexColor))
}

/**
 * Set items from model
 * @param {State} state namespaced state
 * @param {[TabItemModel]} itemsModels
 */
export const setItems = (state, itemsModels) => {
  state.items = []

  itemsModels.forEach((itemModel) => {
    state.items.push(itemModelToItem(itemModel))
  })
}

export const setItemsRaw = (state, items) => {
  state.items = items

  state.items.forEach((item, index) => {
    item.order = index
  })
}

/**
 * Add the itemDialog's item to the tab
 * @param {State} state namespaced state
 * @param {Item} item parse model to add
 */
export const addItem = (state) => {
  const { name, asset } = state.itemDialog.data

  undoStackPushDo(state, new ActionNewItem(null, {
    name,
    asset,
    key: null,
    available: true,
    hidden: false,
    order: state.items.length
  }))
}

/**
 * Update the item opened in the itemDialog
 * @param {State} state namespaced state
 */
export const updateItem = (state) => {
  const { index, data: { name, asset } } = state.itemDialog

  const from = state.items[index]
  const to = Object.assign({}, from, {
    name,
    asset
  })

  undoStackPushDo(state, new ActionUpdateItem(from, to))
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

export const undoStackPushDo = (state, action) => {
  action.do(state)
  state.undoStack.push(action)
  state.redoStack = []
}

export const undo = (state) => {
  const action = state.undoStack.pop()
  action.reverse(state)
  state.redoStack.push(action)
}

export const redo = (state) => {
  const action = state.redoStack.pop()
  action.do(state)
  state.undoStack.push(action)
}

export const clearState = (state) => {
  Object.assign(state, getDefaultState())
}

export const setError = (state, err) => {
  state.error = err
  console.error(`Tab editor error: ${err}`)
  state.loading = false
}
