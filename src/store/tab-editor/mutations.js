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
/**
 * push items from model
 * @param {State} state namespaced state
 * @param {[TabItemModel]} itemsModels
 */
export const pushItems = (state, items) => {
  items.forEach((item) => {
    state.items.push({
      name: item.name,
      asset: item,
      key: undefined,
      available: true,
      hidden: false,
      order: state.items.length
    })
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

/**
 * Toggle availability for an item
 * @param {State} _
 * @param {Item} item to toggle availability
 */
export const toggleItemAvailable = (_, item) => {
  item.available = !item.available
}

/**
 * Toggle visibility for an item
 * @param {State} _
 * @param {Item} item to toggle visibility
 */
export const toggleItemHidden = (_, item) => {
  item.hidden = !item.hidden
}

/**
 * Open the item dialog
 * @param {State} state
 * @param {{ String, Number, { AssetModel, String }}} {
 *  mode: see state.js
 *  index: index of the edited item
 *  data: {
 *   asset: Asset of the item,
 *   name: Name of the item
 *  }
 * }
 */
export const openItemDialog = (state, { mode = 'new', index, data }) => {
  state.itemDialog.opened = true
  state.itemDialog.mode = mode
  if (mode === 'edit') {
    state.itemDialog.data = data
    state.itemDialog.index = index
  }
}

export const openItemChoice = (state, { mode = 'new', index, data }) => {
  state.itemChoice.opened = true
  state.itemChoice.mode = mode
  if (mode === 'edit') {
    state.itemChoice.data = data
    state.itemChoice.index = index
  }
}

export const closeItemChoice = (state, { mode = 'new', index, data }) => {
  state.itemChoice.opened = false
}

/**
 * Remove the item loaded in the dialog for the list of items
 * @param {State} state
 */
export const removeItemDialog = (state) => {
  const index = itemIndex(state, state.itemDialog.data)

  state.deletedItems.push(state.items[index])
  state.items.splice(index, 1)
}

/**
 * Define a new asset for the edited item
 * @param {State} state
 * @param {Asset} asset new asset
 */
export const setItemDialogAsset = (state, asset) => {
  state.itemDialog.data.asset = asset
}

/**
 * Define a new name for the edited item
 * @param {State} state
 * @param {String} name new name
 */
export const setItemDialogName = (state, name) => {
  state.itemDialog.data.name = name
}

/**
 * Close the item dialog and reset its properties
 * @param {State} state
 */
export const closeItemDialog = (state) => {
  state.itemDialog.opened = false
  state.itemDialog.data.name = ''
  state.itemDialog.data.asset = null
}

/**
 * Do an action and push it to undo stack
 * @param {State} state
 * @param {Action} action to do
 */
export const undoStackPushDo = (state, action) => {
  action.do(state)
  state.undoStack.push(action)
  state.redoStack = []
}

/**
 * Undo
 * @param {State} state
 */
export const undo = (state) => {
  const action = state.undoStack.pop()
  action.reverse(state)
  state.redoStack.push(action)
}

/**
 * Redo
 * @param {State} state
 */
export const redo = (state) => {
  const action = state.redoStack.pop()
  action.do(state)
  state.undoStack.push(action)
}

/**
 * Reset state
 * @param {State} state
 */
export const clearState = (state) => {
  Object.assign(state, getDefaultState())
}

/**
 * Used to throw an error
 * @param {State} state
 * @param {Error} error is the error to set
 */
export const setError = (state, err) => {
  state.error = err
  console.error(`Tab editor error: ${err}`)
  state.loading = false
}
