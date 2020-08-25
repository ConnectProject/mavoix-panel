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
 * Return the array of selected items
 * @param {State} state
 */
export const selectedItems = ({ selectedItems }) => selectedItems

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
export const itemChoice = ({ itemChoice: { data } }) => data
/**
 * Return true if item's dialog is open
 * @param {State} state
 */
export const itemDialogOpened = ({ itemDialog: { opened } }) => opened
export const itemChoiceOpened = ({ itemChoice: { opened } }) => opened
export const itemLanguageOpened = ({ itemLanguage: { opened } }) => opened
export const languages = ({ languages }) => languages
export const speeds = ({ speeds }) => speeds
export const language = ({ language }) => language
export const languageCode = ({ tab: { language } }) => language.substring(0, 2)
export const speed = ({ speed }) => speed
export const languagesCodes = ({ languagesCodes }) => languagesCodes
export const speedsCodes = ({ speedsCodes }) => speedsCodes
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
