/**
 * Return the array of all devices
 * @param {State} state
 */
export const devices = ({ devices }) => devices

/**
 * Return the opened device
 * @param {State} state
 */
export const active = ({ devices, dialog }) => devices[dialog.index]

/**
 * Return the name dialog object (see in state.js)
 * @param {State} state
 */
export const nameDialog = ({ nameDialog }) => nameDialog

/**
 * Return true if dialog is opened
 * @param {State} state
 */
export const dialog = ({ dialog }) => dialog
