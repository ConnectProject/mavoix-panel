export const setDevices = (state, usersModel) => {
  state.devices = usersModel.map((model) => {
    return {
      name: model.getUsername(),
      password: ''
    }
  })
  state.loading = false
}

export const addAndOpenDevice = (state, { model, password }) => {
  state.devices.push({
    name: model.getUsername(),
    password: password
  })
  closeNameDialog(state)
  openDialog(state, state.devices.length - 1)
}

export const updateActivePassword = (state, password) => {
  state.devices[state.dialog.index].password = password

  console.log(state.devices)
}

export const removeActive = (state) => {
  state.devices.splice(state.dialog.index, 1)
  closeDialog(state)
}

export const openDialog = (state, index) => {
  state.dialog.index = index
  state.dialog.opened = true
}

export const closeDialog = (state) => {
  state.dialog.opened = false
}

export const openNameDialog = (state) => {
  state.nameDialog.name = ''
  state.nameDialog.opened = true
}

export const closeNameDialog = (state) => {
  state.nameDialog.opened = false
}

export const setNameDialog = (state, name) => {
  state.nameDialog.name = name
}

export const setError = (state, err) => {
  console.error(err)
  state.error = err
  state.loading = false
}
