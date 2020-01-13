/**
 * Set tabs
 * @param {State} state
 * @param {[TabModel]} tabs tabs to set
 */
export const setTabs = (state, tabs) => {
  state.tabs = tabs
  state.loading = false
}

/**
 * Add a tab
 * @param {State} state
 * @param {TabModel} tab tab to add
 */
export const addTab = (state, tab) => {
  state.tabs.push(tab)
}

/**
 * Remove a tab from its id
 * @param {State} state
 * @param {String} id tab's id to remove
 */
export const removeTabById = (state, id) => {
  state.tabs = state.tabs.filter(el => el.id !== id)
}

/**
 * Open the new tabs dialog
 * @param {State} state
 */
export const openDialog = (state) => {
  state.dialogOpen = true
}

/**
 * Close the new tabs dialog
 * @param {State} state
 */
export const closeDialog = (state) => {
  state.dialogOpen = false
}

/**
 * Used to throw an error
 * @param {State} state
 * @param {Error} error is the error to set
 */
export const setError = (state, err) => {
  state.error = err
  state.loading = false
}