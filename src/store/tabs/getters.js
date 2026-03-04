/* eslint-disable no-shadow */
/* eslint-disable valid-jsdoc */
/**
 * Return the list of all tabs
 * @param {State} state vuex state
 */
export const tabs = ({ tabs }) => tabs

/**
 * Return true if dialog is open
 * @param {State} state vuex state
 */
export const dialogOpened = ({ dialogOpen }) => dialogOpen

/**
 * Return true if edit tab dialog is open
 * @param {State} state vuex state
 */
export const editDialogOpened = ({ editDialogOpen }) => editDialogOpen

/**
 * Return the tab being edited (Parse model) when editing from bar
 * @param {State} state vuex state
 */
export const editTab = ({ editTab }) => editTab
