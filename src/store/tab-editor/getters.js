export function tab (state) {
  return state.tab
}

export function isDialogOpened (state) {
  return state.newItemDialogOpened
}

export function isUndoable (state) {
  return !state.history.index > 0
}

export function isRedoable (state) {
  return state.history.index === state.history.data.length
}

export function tabModel (state) {
  return state.models.tab
}

export function loading (state) {
  return state.loading
}
