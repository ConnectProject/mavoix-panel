export function setDevices (state, devices) {
  state.devices = devices
  state.loading = false
}

export function setError (state, err) {
  state.error = err
  state.loading = false
}

export function addDevice (state, device) {
  state.devices.push(device)
}

export function openDialog (state) {
  state.dialogOpen = true
}

export function closeDialog (state) {
  state.dialogOpen = false
}
