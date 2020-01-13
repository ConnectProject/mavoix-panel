/**
 * Return the tab
 * @param {State} state
 */
export const tab = ({ tab }) => tab

/**
 * Return the array of items
 * @param {State} state
 */
export const items = ({ items }) => items

/**
 * Return the array of deleted items
 * @param {State} state
 */
export const deletedItems = ({ deletedItems }) => deletedItems

/**
 * Return the item's dialog data (see state.js)
 * @param {State} state
 */
export const itemDialog = ({ itemDialog: { data } }) => data

/**
 * Return true if item's dialog is open
 * @param {State} state
 */
export const itemDialogOpened = ({ itemDialog: { opened } }) => opened

/**
 * Return the item dialog's mode (see state.js)
 * @param {State} state
 */
export const itemDialogMode = ({ itemDialog: { mode } }) => mode

/**
 * Return true if an undo is possible
 * @param {State} state
 */
export const isUndoable = ({ undoStack }) => undoStack.length === 0

/**
 * Return true if a redo is possible
 * @param {State} state
 */
export const isRedoable = ({ redoStack }) => redoStack.length === 0

/**
 * Return the tab as TabModel
 * @param {State} state
 */
export const tabModel = ({ tabModel }) => tabModel

/**
 * Return true if loading tab or/and items
 * @param {State} state
 */
export const loading = ({ loading }) => loading
