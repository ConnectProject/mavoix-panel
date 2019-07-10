export function setTab (state, tab) {
  state.tab = tab
  state.loading = false
}

export function clearState (state) {
  Object.assign(state, import('./state'))
}

export function setError (state, err) {
  state.error = err
  state.loading = false
}
