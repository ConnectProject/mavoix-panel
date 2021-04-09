/* eslint-disable valid-jsdoc */
/* eslint-disable no-shadow */
/**
 * Return the array of all devices
 * @param {State} state vuex state
 */
export const devices = ({ devices }) => devices

/**
 * Return the opened device
 * @param {State} state vuex state
 */
export const active = ({ devices, dialog }) => devices[dialog.index]

/**
 * Return the name dialog object (see in state.js)
 * @param {State} state vuex state
 */
export const nameDialog = ({ nameDialog }) => nameDialog

/**
 * Return true if dialog is opened
 * @param {State} state vuex state
 */
export const dialog = ({ dialog }) => dialog
