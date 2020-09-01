/**
 * Return the array of all users
 * @param {State} state
 */
export const user = ({ user }) => user
export const isConnected = ({ isConnected }) => isConnected
export const error = ({ error }) => error

/**
 * Return the opened device
 * @param {State} state
 */
export const active = ({ users, dialog }) => users[dialog.index]

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
