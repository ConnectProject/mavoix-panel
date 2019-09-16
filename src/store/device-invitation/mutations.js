export const setCode = (state, code) => {
  state.code = code
  state.loading = false
}

export const openDialog = (state) => {
  state.dialogOpened = true
}

export const closeDialog = (state) => {
  state.dialogOpened = false
}

export const setError = (state, err) => {
  state.error = err
}
