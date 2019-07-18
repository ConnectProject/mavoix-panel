export const setDevices = (state, devices) => {
  state.devices = devices
  state.loading = false
}

export const setError = (state, err) => {
  state.error = err
  state.loading = false
}

export const addDevice = (state, device) => {
  state.devices.push(device)
}

export const openDialog = (state) => {
  state.dialogOpen = true
}

export const closeDialog = (state) => {
  state.dialogOpen = false
}
