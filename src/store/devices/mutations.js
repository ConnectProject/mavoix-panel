// all the devices module is no longer used

/**
 * Set devices
 * @param {State} state vuex state
 * @param {DeviceUserModel[]} deviceModels devices to load
 * @returns {void}
 */
export const setDevices = (state, deviceModels) => {
  state.devices = deviceModels.map((model) => ({
    deviceName: model.get('deviceName'),
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
 * @returns {void}
 * }
 */
export const addAndOpenDevice = (state, { model, password }) => {
  state.devices.push({
    deviceName: model.get('deviceName'),
    name: model.getUsername(),
    password: password
  })
  closeNameDialog(state)
  openDialog(state, state.devices.length - 1)
}

/**
 * Set the password of the opened device
 * @param {State} state vuex state
 * @param {String} password new password
 * @returns {void}
 */
export const updateActivePassword = (state, password) => {
  state.devices[state.dialog.index].password = password

  console.log(state.devices)
}

/**
 * Remove the opened device
 * @param {State} state vuex state
 * @returns {void}
 */
export const removeActive = (state) => {
  state.devices.splice(state.dialog.index, 1)
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
 * @param {State} state vuex state
 * @returns {void}
 */
export const openNameDialog = (state) => {
  state.nameDialog.name = ''
  state.nameDialog.opened = true
}

/**
 * Close name dialog
 * @param {State} state vuex state
 * @returns {void}
 */
export const closeNameDialog = (state) => {
  state.nameDialog.opened = false
}

/**
 * Set name dialog's name
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
  console.error(err)
  state.error = err
  state.loading = false
}
