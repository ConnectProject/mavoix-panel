import { ActionHexColor, ActionLanguage, ActionName, ActionNewItem, ActionSpeed, ActionUpdateItem } from './stackActions'
import { itemIndex, itemModelToItem, modelToTab } from './utils'
import { getDefaultState } from './state'

/**
 * Set the tab used by the Tab Editor
 * @param {State} state namespaced state.
 * @param {TabModel} tabModel the parse model of the tab.
 * @returns {void}
 */
export const setTab = (state, tabModel) => {
  state.tab = modelToTab(tabModel)
  state.speed = state.speeds[state.speedsCodes.indexOf(state.tab.speed)]
  state.language = state.languages[state.languagesCodes.indexOf(state.tab.language)]
  state.loading = false
}

/**
 * Set the name of the tab
 * @param {State} state namespaced state.
 * @param {String} name new value.
 * @return {void}
 */
export const setName = (state, name) => {
  undoStackPushDo(state, new ActionName(state.tab.name, name))
}

/**
 * Set the color of the tab
 * @param {State} state namespaced state.
 * @param {String} hexColor new value.
 * @return {void}
 */
export const setHexColor = (state, hexColor) => {
  undoStackPushDo(state, new ActionHexColor(state.tab.hexColor, hexColor))
}

export const setLanguage = (state, indexLanguage) => {
  console.log(indexLanguage)
  state.language = state.languages[indexLanguage]
  const lang = state.languagesCodes[indexLanguage]
  console.log(lang)
  undoStackPushDo(state, new ActionLanguage(state.tab.language, lang))
  console.log(state.tab.language)
}

export const setSpeed = (state, indexSpeed) => {
  state.speed = state.speeds[indexSpeed]
  const speed = state.speedsCodes[indexSpeed]
  console.log(state.speed)
  undoStackPushDo(state, new ActionSpeed(state.tab.speed, speed))
  console.log(state.tab.speed)
}

/**
 * Set items from model
 * @param {State} state namespaced state
 * @param {TabItemModel[]} itemsModels items to set
 * @return {void}
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
 * @param {TabItemModel[]} items items to push
 * @return {void}
 */
export const pushItems = (state, items) => {
  items.forEach((item) => {
    state.items.push({
      name: item.name,
      asset: item,
      key: null,
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
 * @return {void}
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
 * @return {void}
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
 * @param {State} _  vuex state
 * @param {Item} item to toggle availability
 * @return {void}
 */
export const toggleItemAvailable = (_, item) => {
  item.available = !item.available
}

/**
 * Toggle visibility for an item
 * @param {State} _  vuex state
 * @param {Item} item to toggle visibility
 * @return {void}
 */
export const toggleItemHidden = (_, item) => {
  item.hidden = !item.hidden
}

/**
 * Open the item dialog
 * @param {State} state vuex state
 * @param {Object} param parameter
 * @param {String} param.mode see state.js
 * @param {Number} param.index index of the edited item
 * @param {AssetModel} param.data.asset Asset of the item
 * @param {String} param.data.name Name of the item
 * @returns {void}
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

export const openLanguageChoice = (state) => {
  state.itemLanguage.opened = true
}

export const closeItemChoice = (state, { mode = 'new', index, data }) => {
  state.itemChoice.opened = false
}

/**
 * Remove the item loaded in the dialog for the list of items
 * @param {State} state vuex state
 * @return {void}
 */
export const removeItemDialog = (state) => {
  const index = itemIndex(state, state.itemDialog.data)

  state.deletedItems.push(state.items[index])
  state.items.splice(index, 1)
}

/**
 * Define a new asset for the edited item
 * @param {State} state vuex state
 * @param {Asset} asset new asset
 * @return {void}
 */
export const setItemDialogAsset = (state, asset) => {
  state.itemDialog.data.asset = asset
}

/**
 * Define a new name for the edited item
 * @param {State} state vuex state
 * @param {String} name new name
 * @return {void}
 */
export const setItemDialogName = (state, name) => {
  state.itemDialog.data.name = name
}

/**
 * Close the item dialog and reset its properties
 * @param {State} state vuex state
 * @return {void}
 */
export const closeItemDialog = (state) => {
  state.itemDialog.opened = false
  state.itemDialog.data.name = ''
  state.itemDialog.data.asset = null
}

/**
 * Do an action and push it to undo stack
 * @param {State} state vuex state
 * @param {Action} action to do
 * @returns {void}
 */
export const undoStackPushDo = (state, action) => {
  action.do(state)
  state.undoStack.push(action)
  state.redoStack = []
}

/**
 * Undo
 * @param {State} state vuex state
 * @return {void}
 */
export const undo = (state) => {
  const action = state.undoStack.pop()
  action.reverse(state)
  state.redoStack.push(action)
}

/**
 * Redo
 * @param {State} state vuex state
 * @return {void}
 */
export const redo = (state) => {
  const action = state.redoStack.pop()
  action.do(state)
  state.undoStack.push(action)
}

/**
 * Reset state
 * @param {State} state vuex state
 * @return {void}
 */
export const clearState = (state) => {
  Object.assign(state, getDefaultState())
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @return {void}
 */
export const setError = (state, err) => {
  state.error = err
  console.error(err)
  state.loading = false
}
