export function setTabs (state, tabs) {
  state.tabs = tabs
  state.loading = false
}

export function setError (state, err) {
  state.error = err
  state.loading = false
}

export function addTab (state, tab) {
  state.tabs.push(tab)
}

export function removeTabById (state, id) {
  console.log(id)
  state.tabs = state.tabs.filter(el => el.id !== id)
}

export function openDialog (state) {
  state.dialogOpen = true
}

export function closeDialog (state) {
  state.dialogOpen = false
}
