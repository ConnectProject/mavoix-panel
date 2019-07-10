export function tab (state) {
  return state.tab
}

export function isUndoable (state) {
  return !state.index > 0
}

export function isRedoable (state) {
  return state.index === state.history.length
}

export function tabModel (state) {
  return state.tabModel
}

export function loading (state) {
  return state.loading
}
