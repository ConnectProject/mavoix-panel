export const setTabs = (state, tabs) => {
  state.tabs = tabs
  state.loading = false
}

export const setError = (state, err) => {
  state.error = err
  state.loading = false
}

export const addTab = (state, tab) => {
  state.tabs.push(tab)
}

export const removeTabById = (state, id) => {
  state.tabs = state.tabs.filter(el => el.id !== id)
}

export const openDialog = (state) => {
  state.dialogOpen = true
}

export const closeDialog = (state) => {
  state.dialogOpen = false
}
