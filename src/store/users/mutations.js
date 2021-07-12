/**
 * Set users
 * @param {State} state vuex state
 * @param {[DeviceUserModel]} deviceModels users to load
 * @returns {void}
 */
export const setDevices = (state, deviceModels) => {
  state.devices = deviceModels.map((model) => ({
    name: model.getUsername(),
    password: ''
  }))
  state.loading = false
}

/**
 * Add a device and open the modal to view it
 * @param {State} state vuex state
 * @param {{ DeviceUserModel, String }} {
 *   model: the device to add and open
 *   password: the password of the new device
 * }
 * @returns {void}
 */
export const addAndOpenDevice = (state, { model }) => {
  state.user.name = model.getUsername()
  state.user.id = model._getId()
  localStorage.id = model._getId()
  state.isConnected = !state.isConnected
  console.log(state.user)
}

/**
 * Set the password of the opened device
 * @param {State} state vuex state
 * @param {String} password new password
 * @returns {void}
 */
export const updateActivePassword = (state, password) => {
  state.users[state.dialog.index].password = password

  console.log(state.users)
}

/**
 * Remove the opened device
 * @param {State} state vuex state
 * @returns {void}
 */
export const removeActive = (state) => {
  state.users.splice(state.dialog.index, 1)
  closeDialog(state)
}

/**
 * Open a device with its index
 * @param {State} state vuex state
 * @param {Number} index position of the device to open
 * @returns {void}
 */
export const openDialog = (state, index) => {
  state.dialog.index = index
  state.dialog.opened = true
}

/**
 * Close the device dialog
 * @param {State} state vuex state
 * @returns {void}
 */
export const closeDialog = (state) => {
  state.dialog.opened = false
}

/**
 * Open name dialog
 * Never called
 * @param {State} state vuex state
 * @returns {void}
 */
export const openNameDialog = (state) => {
  state.nameDialog.name = ''
  state.nameDialog.opened = true
}

/**
 * Close name dialog
 * Never called
 * @param {State} state vuex state
 * @returns {void}
 */
export const closeNameDialog = (state) => {
  state.nameDialog.opened = false
}

/**
 * Set name dialog's name
 * Never called
 * @param {State} state vuex state
 * @param {String} name the new name
 * @returns {void}
 */
export const setNameDialog = (state, name) => {
  state.nameDialog.name = name
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @returns {void}
 */
export const setError = (state, err) => {
  console.error(err.message)
  state.error = err.message
  state.loading = false
}

/**
 * Used to reset a thrown error so that it can be thrown again
 * @param {State} state vuex state
 * @returns {void}
 */
export const resetError = (state) => {
  state.error = null
}
