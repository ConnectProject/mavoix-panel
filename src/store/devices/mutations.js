export const setDevices = (state, usersModel) => {
  state.devices = usersModel.map((model) => {
    return {
      name: model.getUsername()
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
